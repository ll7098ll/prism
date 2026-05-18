import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db, doc, getDoc, setDoc } from '../../firebase';
import { generateStoryContent } from '../../lib/gemini';
import { PromptFactory } from '../../lib/factories/PromptFactory';
import { useProfile } from '../../hooks/useProfile';
import { useAppContext } from '../../contexts/AppContext';
import { Loader2 } from 'lucide-react';
import EvaluationView from './EvaluationView';

export type QuestionType = 'multipleChoice' | 'shortAnswer' | 'caseStudy' | 'exploration';

export interface Question {
  type: QuestionType;
  question?: string;
  options?: string[];
  answerIndex?: number;
  keywords?: string[];
  explanation?: string;
  scenario?: string;
  title?: string;
  description?: string;
  guide?: string;
}

interface Props {
  moduleId: string;
}

export default function EvaluationContainer({ moduleId }: Props) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [textAnswer, setTextAnswer] = useState('');
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);

  const { profile } = useProfile(auth.currentUser?.uid);
  const { t, currentCountry, MODULES } = useAppContext();

  const moduleInfo: any = Object.values(MODULES).flat().find((m: any) => m.id === moduleId);

  useEffect(() => {
    const init = async () => {
      if (!auth.currentUser || !moduleInfo || !profile) return;
      
      const userCountry = profile.country || currentCountry?.id || 'kr';
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
        "${moduleInfo.title}" (${moduleInfo.description}) 주제에 대한 심화 평가 및 탐구 활동을 만들어주세요.
        초중고등학생의 학습 수준(${profile.level})에 맞게 출제하세요.
        - 대상 국가 및 언어: ${targetCountry} (반드시 이 국가의 언어로 모든 텍스트를 작성하고, 이 국가의 역사, 문화, 교육과정, 사회적 맥락을 반영하여 문제를 출제하세요. 단, JSON 키값은 영어로 유지하세요.)
        
        [학습자 수준 안내]
        ${levelGuidance}
        
        주의사항: 평가 문제의 지문 읽기, 보기, 해설의 어휘 난이도와 문장 길이를 반드시 위 수준(Level)에 적합하게 조절하세요!
        
        출력 형식은 반드시 아래 JSON 형식을 지켜주세요:
        {
          "multipleChoice": [
            {
              "question": "객관식 문제 내용 (2문제)",
              "options": ["보기1", "보기2", "보기3", "보기4"],
              "answerIndex": 0,
              "explanation": "정답에 대한 해설"
            }
          ],
          "shortAnswer": {
            "question": "주관식 문제 내용 (단답형 또는 서술형 1문제)",
            "keywords": ["핵심어1", "핵심어2"],
            "explanation": "모범 답안 및 해설"
          },
          "caseStudy": {
            "scenario": "주제와 관련된 구체적인 사례나 상황 설명",
            "question": "사례를 분석하고 해결책이나 의견을 묻는 문제",
            "keywords": ["분석 핵심어1", "분석 핵심어2"],
            "explanation": "사례 분석 모범 답안 및 해설"
          },
          "exploration": {
            "title": "심화 탐구 활동 제목",
            "description": "학생이 직접 정보를 찾아보거나 토론해볼 수 있는 탐구 활동 설명",
            "guide": "탐구를 위한 가이드라인이나 질문"
          }
        }
      `;

      const systemInstruction = `You are an expert educational evaluator. You must write the evaluation content in the language of ${targetCountry}.`;

      try {
        const responseText = await generateStoryContent(prompt, systemInstruction);
        const data = JSON.parse(responseText || '{}');
        
        const formattedQuestions: Question[] = [];
        
        if (data.multipleChoice) {
          data.multipleChoice.forEach((q: any) => {
            formattedQuestions.push({ type: 'multipleChoice', ...q });
          });
        }
        if (data.shortAnswer) {
          formattedQuestions.push({ type: 'shortAnswer', ...data.shortAnswer });
        }
        if (data.caseStudy) {
          formattedQuestions.push({ type: 'caseStudy', ...data.caseStudy });
        }
        if (data.exploration) {
          formattedQuestions.push({ type: 'exploration', ...data.exploration });
        }
        
        setQuestions(formattedQuestions);
      } catch (error) {
        console.error('Error fetching quiz:', error);
      } finally {
        setLoading(false);
      }
    };
    if (profile && loading) {
      init();
    }
  }, [moduleId, profile, loading, moduleInfo, currentCountry]);

  const handleMultipleChoiceAnswer = (index: number) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(index);
    setIsAnswerSubmitted(true);
    
    if (index === questions[currentQ].answerIndex) {
      setScore(score + 1);
    }
  };

  const handleTextSubmit = () => {
    if (!textAnswer.trim()) return;
    setIsAnswerSubmitted(true);
    
    const currentQuestion = questions[currentQ];
    if (currentQuestion.keywords) {
      const matchCount = currentQuestion.keywords.filter((kw: string) => textAnswer.includes(kw)).length;
      if (matchCount > 0) {
        setScore(score + 1);
      }
    }
  };

  const handleExplorationComplete = () => {
    setIsAnswerSubmitted(true);
    setScore(score + 1);
  };

  const handleNext = async () => {
    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1);
      setSelectedAnswer(null);
      setTextAnswer('');
      setIsAnswerSubmitted(false);
    } else {
      setCompleted(true);
      if (auth.currentUser && moduleId) {
        const progressId = `${auth.currentUser.uid}_${moduleId}`;
        const pRef = doc(db, 'progress', progressId);
        const progDoc = await getDoc(pRef);
        
        const currentScores = progDoc.exists() ? progDoc.data().quizScores || [] : [];
        const currentAchievements = progDoc.exists() ? progDoc.data().achievements || [] : [];
        const currentLogs = progDoc.exists() ? progDoc.data().storyLogs || [] : [];
        const currentVocabCompleted = progDoc.exists() ? progDoc.data().vocabCompleted || false : false;
        const currentStoryProgress = progDoc.exists() ? progDoc.data().storyProgress || 0 : 0;
        
        await setDoc(pRef, {
          userId: auth.currentUser.uid,
          moduleId: moduleId,
          vocabCompleted: currentVocabCompleted,
          storyProgress: currentStoryProgress,
          quizScores: [...currentScores, Math.round((score / questions.length) * 100)],
          achievements: currentAchievements,
          storyLogs: currentLogs,
          updatedAt: new Date().toISOString()
        }, { merge: true });
      }
    }
  };

  if (!moduleInfo) return <div className="min-h-screen flex items-center justify-center bg-slate-50">{t.common.error}</div>;
  if (loading || questions.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
        <Loader2 className="animate-spin text-blue-500 mb-4" size={40} />
        <p className="text-slate-500 font-medium animate-pulse">{t.eval.generating || 'Loading...'}</p>
      </div>
    );
  }

  return (
    <EvaluationView
      moduleId={moduleId}
      profile={profile}
      questions={questions}
      currentQ={currentQ}
      score={score}
      completed={completed}
      selectedAnswer={selectedAnswer}
      textAnswer={textAnswer}
      setTextAnswer={setTextAnswer}
      isAnswerSubmitted={isAnswerSubmitted}
      handleMultipleChoiceAnswer={handleMultipleChoiceAnswer}
      handleTextSubmit={handleTextSubmit}
      handleExplorationComplete={handleExplorationComplete}
      handleNext={handleNext}
      t={t}
      currentCountry={currentCountry}
      navigate={navigate}
    />
  );
}
