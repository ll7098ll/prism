import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { auth, db, doc, getDoc, setDoc } from '../firebase';
import { generateStoryContent } from '../lib/gemini';
import { PromptFactory } from '../lib/factories/PromptFactory';
import { ArrowLeft, CheckCircle, Sparkles, Loader2 } from 'lucide-react';
import { getLightTheme } from '../lib/theme';
import { Confetti } from '../../components/ui/confetti';
import { ShimmerButton } from '../../components/ui/shimmer-button';
import { BorderBeam } from '../../components/ui/border-beam';
import { useProfile } from '../hooks/useProfile';
import { useAppContext } from '../contexts/AppContext';

export default function Vocabulary() {
  const { moduleId } = useParams<{ moduleId: string }>();
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [vocabList, setVocabList] = useState<any[]>([]);
  const [generating, setGenerating] = useState(true);

  const { profile, loading: profileLoading } = useProfile(auth.currentUser?.uid);
  const { t, currentCountry, MODULES } = useAppContext();

  const tVocab = t.vocab;
  const moduleInfo: any = Object.values(MODULES).flat().find((m: any) => m.id === moduleId);

  useEffect(() => {
    const fetchVocab = async () => {
      if (!auth.currentUser || !moduleInfo || !profile) return;
      
      const userCountry = profile.country || localStorage.getItem('selectedCountry') || 'kr';
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
      const targetCountry = countryMap[userCountry] || '한국 (Korean)';
      const levelGuidance = PromptFactory.getLevelGuidance(profile.level, profile.readingLevel);

      const prompt = `
        주제: "${moduleInfo.title}" (${moduleInfo.description})
        위 주제와 관련된 핵심 어휘 5개를 생성해주세요.
        - 대상 국가 및 언어: ${targetCountry} (반드시 이 국가의 언어로 어휘와 뜻, 예문을 작성하세요. 단, JSON 키값은 영어로 유지하세요.)
        - 학습 수준: ${profile.level}
        
        [학습자 수준 안내]
        ${levelGuidance}
        
        주의사항: 어휘의 난이도, 뜻의 설명, 예문의 길이와 어휘 수준을 반드시 위 수준(Level)에 적합하게 명확히 조절하세요!
        
        출력 형식은 반드시 아래 JSON 형식을 지켜주세요:
        {
          "vocabulary": [
            {
              "term": "어휘",
              "definition": "어휘의 뜻",
              "example": "어휘가 사용된 예문"
            }
          ]
        }
      `;

      const systemInstruction = `You are an expert educational content creator. You must write the vocabulary content in the language of ${targetCountry}.`;

      try {
        const responseText = await generateStoryContent(prompt, systemInstruction);
        const data = JSON.parse(responseText || '{}');
        if (data.vocabulary && data.vocabulary.length > 0) {
          setVocabList(data.vocabulary);
        } else {
          setVocabList([]);
        }
      } catch (error) {
        console.error('Failed to generate vocabulary:', error);
        setVocabList([]);
      } finally {
        setGenerating(false);
      }
    };

    if (profile && generating) {
      fetchVocab();
    }
  }, [moduleId, moduleInfo, profile, generating]);

  const theme = profile ? getLightTheme(profile.level) : getLightTheme('elementary');

  const handleNext = async () => {
    if (currentIndex < vocabList.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setFlipped(false);
    } else {
      setCompleted(true);
      if (auth.currentUser && moduleId) {
        const progressId = `${auth.currentUser.uid}_${moduleId}`;
        const pRef = doc(db, 'progress', progressId);
        const pSnap = await getDoc(pRef);
        
        const currentAchievements = pSnap.exists() ? pSnap.data().achievements || [] : [];
        const currentQuizScores = pSnap.exists() ? pSnap.data().quizScores || [] : [];
        const currentLogs = pSnap.exists() ? pSnap.data().storyLogs || [] : [];
        const currentStoryProgress = pSnap.exists() ? pSnap.data().storyProgress || 0 : 0;

        await setDoc(pRef, {
          userId: auth.currentUser.uid,
          moduleId: moduleId,
          vocabCompleted: true,
          storyProgress: currentStoryProgress,
          quizScores: currentQuizScores,
          achievements: currentAchievements,
          storyLogs: currentLogs,
          updatedAt: new Date().toISOString()
        }, { merge: true });
      }
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setFlipped(false);
    }
  };

  if (profileLoading || generating) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
        <Loader2 className="animate-spin text-blue-500 mb-4" size={40} />
        <p className="text-slate-500 font-medium">{tVocab.generating}</p>
      </div>
    );
  }

  if (vocabList.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
        <p className="text-slate-500 mb-4">{tVocab.noVocab}</p>
        <button onClick={() => navigate(`/modules/${moduleId}/dashboard`)} className="px-4 py-2 bg-blue-500 text-white rounded-lg">{t.common.back}</button>
      </div>
    );
  }

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-500 relative overflow-hidden ${theme.bg} ${theme.text} ${theme.font}`}>
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, black 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>

      <header className="bg-white/80 backdrop-blur-md shadow-sm p-4 flex items-center gap-4 sticky top-0 z-10 border-b border-slate-200">
        <button onClick={() => navigate(`/modules/${moduleId}/dashboard`)} className="p-2 hover:bg-slate-100 rounded-xl transition-colors active:scale-95">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-extrabold tracking-tight flex items-center gap-2">
          <span className="text-2xl">{currentCountry.flag}</span>
          {tVocab.title}
        </h1>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-4 relative z-10">
        {!completed ? (
          <div className="w-full max-w-md">
            <div className="flex items-center justify-between mb-6">
              <div className="text-sm font-extrabold text-slate-500 tracking-widest uppercase">
                {tVocab.card} {currentIndex + 1} / {vocabList.length}
              </div>
              <div className="flex gap-1">
                {vocabList.map((_, idx) => (
                  <div key={idx} className={`h-2 rounded-full transition-all duration-300 ${idx === currentIndex ? 'w-6 bg-blue-500' : idx < currentIndex ? 'w-2 bg-blue-300' : 'w-2 bg-slate-200'}`} />
                ))}
              </div>
            </div>

            <div 
              className="relative w-full h-80 cursor-pointer perspective-1000 group"
              onClick={() => setFlipped(!flipped)}
            >
              <div className={`w-full h-full transition-transform duration-700 transform-style-3d ${flipped ? 'rotate-y-180' : ''}`}>
                {/* Front */}
                <div className={`absolute w-full h-full backface-hidden bg-white shadow-xl border-2 flex flex-col items-center justify-center p-8 ${theme.rounded} ${theme.border} group-hover:-translate-y-2 transition-transform duration-300`}>
                  <div className="absolute top-4 right-4 opacity-20">
                    <Sparkles size={32} />
                  </div>
                  <h2 className={`text-5xl font-extrabold tracking-tight ${theme.primaryText}`}>{vocabList[currentIndex].term}</h2>
                  <p className="absolute bottom-6 text-sm font-bold text-slate-400 uppercase tracking-widest animate-pulse">{tVocab.tapToFlip}</p>
                </div>
                
                {/* Back */}
                <div className={`absolute w-full h-full backface-hidden text-white shadow-xl flex flex-col items-center justify-center p-8 rotate-y-180 ${theme.rounded} ${theme.primary.split(' ')[0]} border-2 border-transparent relative overflow-hidden`}>
                  <BorderBeam size={150} duration={6} delay={0} className="opacity-50" />
                  <h3 className="text-2xl font-extrabold mb-4 drop-shadow-md">{vocabList[currentIndex].term}</h3>
                  <p className="text-center text-lg leading-relaxed font-medium drop-shadow-sm mb-4">{vocabList[currentIndex].definition}</p>
                  {vocabList[currentIndex].example && (
                    <p className="text-center text-sm italic opacity-80 bg-black/10 p-3 rounded-lg w-full">"{vocabList[currentIndex].example}"</p>
                  )}
                </div>
              </div>
            </div>

            <div className="flex justify-between mt-10 gap-4">
              <button
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className={`flex-1 py-4 font-extrabold bg-white border-2 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 transition-all active:scale-95 shadow-sm ${theme.rounded} ${theme.border} ${theme.text}`}
              >
                {t.common.prev}
              </button>
              <button
                onClick={handleNext}
                className={`flex-1 py-4 font-extrabold transition-all active:scale-95 shadow-md ${theme.rounded} ${theme.primary} hover:-translate-y-1 hover:shadow-lg`}
              >
                {currentIndex === vocabList.length - 1 ? t.common.complete : t.common.next}
              </button>
            </div>
          </div>
        ) : (
          <div className={`text-center bg-white p-10 shadow-2xl max-w-md w-full border-2 relative overflow-hidden ${theme.rounded} ${theme.border}`}>
            <Confetti className="absolute inset-0 z-0" />
            <BorderBeam size={200} duration={8} delay={0} />
            <div className="w-24 h-24 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner relative z-10">
              <CheckCircle size={48} className="drop-shadow-sm" />
            </div>
            <h2 className="text-3xl font-extrabold mb-4 tracking-tight relative z-10">{tVocab.trainingComplete}</h2>
            <p className="text-slate-500 mb-10 font-medium relative z-10">{tVocab.trainingDesc}</p>
            
            <div className="relative z-10">
              <ShimmerButton 
                onClick={() => navigate(`/modules/${moduleId}/story`)}
                className="w-full py-4 font-extrabold text-lg shadow-lg" 
                background="#2563eb"
              >
                {tVocab.toMainQuest}
              </ShimmerButton>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
