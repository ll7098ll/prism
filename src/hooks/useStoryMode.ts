import { useState, useEffect } from 'react';
import { auth, db, doc, getDoc, setDoc } from '../firebase';
import { generateImage, generateStoryContent } from '../lib/gemini';
import { useAppContext } from '../contexts/AppContext';
import { PromptFactory, StoryPromptParams } from '../lib/factories/PromptFactory';

export function useStoryMode(moduleId: string | undefined) {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  
  const [consequence, setConsequence] = useState<any>('');
  const [storyText, setStoryText] = useState('');
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [choices, setChoices] = useState<any[]>([]);
  const [miniGame, setMiniGame] = useState<any>(null);
  const [history, setHistory] = useState<string[]>([]);
  const [tailoredInterest, setTailoredInterest] = useState<string | null>(null);
  const [isEnding, setIsEnding] = useState(false);
  const [endingSummary, setEndingSummary] = useState('');

  // Mini-game states
  const [selectedTerm, setSelectedTerm] = useState<string | null>(null);
  const [selectedDef, setSelectedDef] = useState<string | null>(null);
  const [matchedPairs, setMatchedPairs] = useState<string[]>([]);
  const [gameMessage, setGameMessage] = useState('');

  const { t, currentCountry, MODULES } = useAppContext();
  const tStory = t.story;

  const moduleInfo: any = Object.values(MODULES).flat().find((m: any) => m.id === moduleId);

  useEffect(() => {
    const init = async () => {
      if (!auth.currentUser || !moduleInfo) return;
      const userDoc = await getDoc(doc(db, 'users', auth.currentUser.uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        setProfile(userData);
        await startStory(userData);
      }
      setLoading(false);
    };
    init();
  }, [moduleId]);

  const getTargetCountryString = (countryCode: string) => {
    const countryMap: Record<string, string> = {
      'kr': '한국 (Korean)',
      'us': '미국 (English)',
      'jp': '일본 (Japanese)',
      'cn': '중국 (Chinese)',
      'gb': '영국 (English)',
      'fr': '프랑스 (French)',
      'it': '이탈리아 (Italian)',
      'de': '독일 (German)'
    };
    return countryMap[countryCode] || '한국 (Korean)';
  };

  const startStory = async (userData: any) => {
    setGenerating(true);
    
    const userCountry = userData.country || currentCountry?.id || 'kr';
    const targetCountry = getTargetCountryString(userCountry);

    const achievementsPrompt = moduleInfo?.achievements 
      ? `\n[특수 업적 시스템]\n이 단원에는 다음과 같은 특수 업적이 있습니다:\n${moduleInfo.achievements.map((a:any) => `- ${a.name}: '${a.keyword}' 키워드가 포함된 선택지 선택 시 달성`).join('\n')}\n스토리 전개 중 자연스럽게 위 키워드 중 하나가 포함된 선택지를 제공하여 사용자가 업적을 달성할 수 있도록 유도하세요.`
      : '';

    const params: StoryPromptParams = {
      userProfile: {
        name: userData.name,
        level: userData.level,
        readingLevel: userData.readingLevel,
        interests: userData.interests,
        country: userCountry
      },
      moduleInfo,
      targetCountry,
      achievementsPrompt
    };

    const prompt = PromptFactory.createStoryStartPrompt(params);

    try {
      const response = await generateStoryContent(prompt);
      const data = JSON.parse(response || '{}');
      
      setConsequence(data.consequence || { narrative: tStory.startNarrative || '새로운 모험의 시작입니다.', learningPoint: tStory.startLearningPoint || '이 단원의 핵심 개념을 마주하게 됩니다.' });
      setStoryText(data.text || '');
      setChoices(data.choices || []);
      setTailoredInterest(data.tailoredInterest || null);
      
      if (data.imagePrompt) {
        const img = await generateImage(data.imagePrompt);
        setImageUrl(img);
      }

      setHistory([`${tStory.logStart || '[시작]'}: ${tStory.startNarrative || '모험 시작'}`]);
      
      // Save initial progress
      if (auth.currentUser) {
        const progressId = `${auth.currentUser.uid}_${moduleId}`;
        const pRef = doc(db, 'progress', progressId);
        const pSnap = await getDoc(pRef);
        
        const currentLogs = pSnap.exists() ? pSnap.data().storyLogs || [] : [];
        const currentAchievements = pSnap.exists() ? pSnap.data().achievements || [] : [];
        const currentQuizScores = pSnap.exists() ? pSnap.data().quizScores || [] : [];
        const currentVocabCompleted = pSnap.exists() ? pSnap.data().vocabCompleted || false : false;
        
        await setDoc(pRef, {
          userId: auth.currentUser.uid,
          moduleId: moduleId,
          vocabCompleted: currentVocabCompleted,
          storyProgress: 1,
          quizScores: currentQuizScores,
          achievements: currentAchievements,
          storyLogs: [...currentLogs, {
            date: new Date().toISOString(),
            type: 'start',
            choice: tStory.startNarrative || '모험 시작',
            consequence: typeof data.consequence === 'object' ? (data.consequence.narrative || '') : (data.consequence || tStory.startNarrative || ''),
            learningPoint: typeof data.consequence === 'object' ? (data.consequence.learningPoint || '') : ''
          }],
          updatedAt: new Date().toISOString()
        }, { merge: true });
      }
    } catch (error) {
      console.error('Failed to start story:', error);
    } finally {
      setGenerating(false);
    }
  };

  const handleChoice = async (choice: string) => {
    if (!profile || generating) return;
    setGenerating(true);
    setMiniGame(null);
    setMatchedPairs([]);

    const newHistory = [...history, `선택: ${choice}`];
    setHistory(newHistory);
    const turnCount = newHistory.length;

    const achievementsPrompt = moduleInfo?.achievements 
      ? `\n[특수 업적 시스템]\n이 단원에는 다음과 같은 특수 업적이 있습니다:\n${moduleInfo.achievements.map((a:any) => `- ${a.name}: '${a.keyword}' 키워드가 포함된 선택지 선택 시 달성`).join('\n')}\n스토리 전개 중 자연스럽게 위 키워드 중 하나가 포함된 선택지를 제공하여 사용자가 업적을 달성할 수 있도록 유도하세요.`
      : '';

    const userCountry = profile.country || currentCountry?.id || 'kr';
    const targetCountry = getTargetCountryString(userCountry);

    const previousContext = turnCount >= 5 
      ? `현재 턴 수가 ${turnCount}턴입니다. 이번 응답에서 반드시 스토리를 의미 있는 결말로 마무리하세요. 사용자의 이전 선택들을 반영하여 해피 엔딩, 배드 엔딩, 혹은 교훈적인 엔딩 중 하나를 제공하세요.`
      : `현재 턴 수: ${turnCount}턴. 스토리를 계속 전개하세요.`;

    const params: StoryPromptParams = {
      userProfile: {
        name: profile.name,
        level: profile.level,
        readingLevel: profile.readingLevel,
        interests: profile.interests,
        country: userCountry
      },
      moduleInfo,
      targetCountry,
      achievementsPrompt,
      previousContext,
      choice,
      history: newHistory
    };

    const prompt = PromptFactory.createStoryContinuationPrompt(params);

    try {
      const response = await generateStoryContent(prompt);
      const data = JSON.parse(response || '{}');
      
      setConsequence(data.consequence || '');
      setStoryText(data.text || '');
      setChoices(data.choices || []);
      setMiniGame(data.miniGame || null);
      setTailoredInterest(data.tailoredInterest || null);
      setIsEnding(data.isEnding || false);
      setEndingSummary(data.endingSummary || '');
      
      if (data.imagePrompt) {
        const img = await generateImage(data.imagePrompt);
        setImageUrl(img);
      }

      // Check for achievements
      if (moduleInfo?.achievements && auth.currentUser) {
        const progressId = `${auth.currentUser.uid}_${moduleId}`;
        const pRef = doc(db, 'progress', progressId);
        const pSnap = await getDoc(pRef);
        const currentAchievements = pSnap.exists() ? pSnap.data().achievements || [] : [];
        
        const newAchievements = moduleInfo.achievements
          .filter((a:any) => choice.includes(a.keyword) && !currentAchievements.includes(a.id))
          .map((a:any) => a.id);
          
        if (newAchievements.length > 0) {
          await setDoc(pRef, {
            achievements: [...currentAchievements, ...newAchievements],
            updatedAt: new Date().toISOString()
          }, { merge: true });
        }
      }

      // Save progress
      if (auth.currentUser) {
        const progressId = `${auth.currentUser.uid}_${moduleId}`;
        const pRef = doc(db, 'progress', progressId);
        const pSnap = await getDoc(pRef);
        
        const currentLogs = pSnap.exists() ? pSnap.data().storyLogs || [] : [];
        const currentAchievements = pSnap.exists() ? pSnap.data().achievements || [] : [];
        const currentQuizScores = pSnap.exists() ? pSnap.data().quizScores || [] : [];
        const currentVocabCompleted = pSnap.exists() ? pSnap.data().vocabCompleted || false : false;
        
        await setDoc(pRef, {
          userId: auth.currentUser.uid,
          moduleId: moduleId,
          vocabCompleted: currentVocabCompleted,
          storyProgress: turnCount,
          quizScores: currentQuizScores,
          achievements: currentAchievements,
          storyLogs: [...currentLogs, {
            date: new Date().toISOString(),
            type: 'choice',
            choice: choice,
            consequence: typeof data.consequence === 'object' ? (data.consequence.narrative || '') : (data.consequence || ''),
            learningPoint: typeof data.consequence === 'object' ? (data.consequence.learningPoint || '') : ''
          }],
          updatedAt: new Date().toISOString()
        }, { merge: true });
      }
    } catch (error) {
      console.error('Failed to generate next story part:', error);
    } finally {
      setGenerating(false);
    }
  };

  const handleMatch = (term: string, definition: string) => {
    if (selectedTerm === term) {
      setSelectedTerm(null);
      return;
    }
    if (selectedDef === definition) {
      setSelectedDef(null);
      return;
    }

    if (selectedTerm && definition) {
      const isMatch = miniGame.data.some((item: any) => item.term === selectedTerm && item.definition === definition);
      if (isMatch) {
        setMatchedPairs(prev => [...prev, selectedTerm]);
        setGameMessage(t.eval.correct);
        setTimeout(() => setGameMessage(''), 1500);
        
        if (matchedPairs.length + 1 === miniGame.data.length) {
          setTimeout(() => {
            handleChoice(tStory.miniGameSuccess || '[미니게임 성공] 퍼즐을 완벽하게 풀었습니다!');
          }, 2000);
        }
      } else {
        setGameMessage(t.eval.incorrect);
        setTimeout(() => setGameMessage(''), 1500);
      }
      setSelectedTerm(null);
      setSelectedDef(null);
    } else if (term) {
      setSelectedTerm(term);
    } else if (definition) {
      setSelectedDef(definition);
    }
  };

  return {
    profile, loading, generating, consequence, storyText, imageUrl, choices, miniGame, history, tailoredInterest, isEnding, endingSummary,
    selectedTerm, setSelectedTerm, selectedDef, setSelectedDef, matchedPairs, gameMessage,
    handleChoice, handleMatch, moduleInfo, t, tStory, currentCountry
  };
}
