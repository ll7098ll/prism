import React from 'react';
import { ArrowLeft, Target, Zap, Info, Trophy, Search, BookOpen, Lightbulb } from 'lucide-react';
import { getLightTheme } from '../../lib/theme';
import { Confetti } from '../../../components/ui/confetti';
import { ShimmerButton } from '../../../components/ui/shimmer-button';
import { BorderBeam } from '../../../components/ui/border-beam';
import { Question, QuestionType } from './EvaluationContainer';

interface EvaluationViewProps {
  moduleId: string;
  profile: any;
  questions: Question[];
  currentQ: number;
  score: number;
  completed: boolean;
  selectedAnswer: number | null;
  textAnswer: string;
  setTextAnswer: (text: string) => void;
  isAnswerSubmitted: boolean;
  handleMultipleChoiceAnswer: (index: number) => void;
  handleTextSubmit: () => void;
  handleExplorationComplete: () => void;
  handleNext: () => void;
  t: any;
  currentCountry: any;
  navigate: any;
}

export default function EvaluationView(props: EvaluationViewProps) {
  const {
    moduleId, profile, questions, currentQ, score, completed,
    selectedAnswer, textAnswer, setTextAnswer, isAnswerSubmitted,
    handleMultipleChoiceAnswer, handleTextSubmit, handleExplorationComplete,
    handleNext, t, currentCountry, navigate
  } = props;

  const tEval = t.eval;
  const theme = profile ? getLightTheme(profile.level) : getLightTheme('elementary');
  const currentQuestion = questions[currentQ];

  const getStageIcon = (type: QuestionType) => {
    switch (type) {
      case 'multipleChoice': return <Target className="text-orange-500" size={18} />;
      case 'shortAnswer': return <BookOpen className="text-blue-500" size={18} />;
      case 'caseStudy': return <Search className="text-purple-500" size={18} />;
      case 'exploration': return <Lightbulb className="text-yellow-500" size={18} />;
    }
  };

  const getStageLabel = (type: QuestionType) => {
    switch (type) {
      case 'multipleChoice': return tEval.multipleChoice;
      case 'shortAnswer': return tEval.shortAnswer;
      case 'caseStudy': return tEval.caseStudy;
      case 'exploration': return tEval.exploration;
    }
  };

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
          <Target className="text-orange-500" size={24} /> {t.dashboard.eval}
        </h1>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-4 relative z-10">
        {!completed ? (
          <div className={`w-full max-w-3xl bg-white p-8 md:p-10 shadow-2xl border-2 relative overflow-hidden ${theme.rounded} ${theme.border}`}>
            <BorderBeam size={250} duration={10} delay={0} className="opacity-30" />
            
            <div className="flex justify-between items-center mb-8 relative z-10">
              <div className="flex items-center gap-2">
                <span className={`text-sm font-extrabold tracking-widest px-3 py-1 rounded-full bg-slate-100 text-slate-600 border border-slate-200 flex items-center gap-2`}>
                  {getStageIcon(currentQuestion.type)}
                  {t.common.stage || 'Stage'} {currentQ + 1} / {questions.length}: {getStageLabel(currentQuestion.type)}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="text-yellow-500" size={18} />
                <span className="text-sm font-extrabold tracking-widest uppercase text-slate-500">{tEval.score || 'Score'}: {score * 100}</span>
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="w-full bg-slate-100 h-2 rounded-full mb-8 overflow-hidden relative z-10">
              <div 
                className="h-full bg-gradient-to-r from-orange-400 to-red-500 transition-all duration-500 ease-out"
                style={{ width: `${((currentQ) / questions.length) * 100}%` }}
              />
            </div>
            
            {/* Question Content */}
            <div className="relative z-10 mb-10">
              {currentQuestion.type === 'caseStudy' && currentQuestion.scenario && (
                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 mb-6">
                  <h3 className="font-bold text-slate-500 mb-2 flex items-center gap-2"><Search size={18}/> {tEval.scenario}</h3>
                  <p className="text-lg leading-relaxed text-slate-800">{currentQuestion.scenario}</p>
                </div>
              )}
              
              {currentQuestion.type === 'exploration' ? (
                <div className="space-y-6">
                  <h2 className="text-3xl font-extrabold leading-relaxed tracking-tight text-slate-800">{currentQuestion.title}</h2>
                  <div className="bg-yellow-50 p-6 rounded-2xl border border-yellow-200">
                    <p className="text-lg leading-relaxed text-slate-800 mb-4">{currentQuestion.description}</p>
                    <div className="bg-white/60 p-4 rounded-xl border border-yellow-100">
                      <h4 className="font-bold text-yellow-800 mb-2 flex items-center gap-2"><Lightbulb size={18}/> {tEval.guide}</h4>
                      <p className="text-yellow-900 font-medium">{currentQuestion.guide}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <h2 className="text-2xl font-extrabold leading-relaxed tracking-tight text-slate-800">{currentQuestion.question}</h2>
              )}
            </div>
            
            {/* Answer Input Area */}
            <div className="space-y-4 mb-10 relative z-10">
              {currentQuestion.type === 'multipleChoice' && currentQuestion.options && (
                currentQuestion.options.map((opt: string, idx: number) => {
                  let btnClass = `w-full text-left px-8 py-5 border-2 transition-all duration-300 font-bold text-lg shadow-sm ${theme.rounded} `;
                  if (selectedAnswer === null) {
                    btnClass += `border-slate-200 bg-white hover:border-orange-400 hover:shadow-md hover:-translate-y-1`;
                  } else if (idx === currentQuestion.answerIndex) {
                    btnClass += "border-green-500 bg-green-50 text-green-700 shadow-[0_0_15px_rgba(34,197,94,0.3)] scale-[1.02] z-10 relative";
                  } else if (idx === selectedAnswer) {
                    btnClass += "border-red-500 bg-red-50 text-red-700 shadow-[0_0_15px_rgba(239,68,68,0.3)]";
                  } else {
                    btnClass += "border-slate-100 bg-slate-50 opacity-40 grayscale";
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleMultipleChoiceAnswer(idx)}
                      disabled={selectedAnswer !== null}
                      className={btnClass}
                    >
                      <span className="inline-block w-8 h-8 rounded-full bg-slate-100 text-slate-500 text-center leading-8 mr-4 text-sm border border-slate-200">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      {opt}
                    </button>
                  );
                })
              )}

              {(currentQuestion.type === 'shortAnswer' || currentQuestion.type === 'caseStudy') && (
                <div className="space-y-4">
                  <textarea
                    value={textAnswer}
                    onChange={(e) => setTextAnswer(e.target.value)}
                    disabled={isAnswerSubmitted}
                    placeholder={tEval.placeholder || 'Answer here'}
                    className={`w-full p-6 border-2 rounded-2xl min-h-[150px] text-lg resize-y focus:outline-none focus:ring-4 focus:ring-orange-500/20 transition-all ${isAnswerSubmitted ? 'bg-slate-50 border-slate-200 text-slate-500' : 'bg-white border-slate-300 focus:border-orange-500'}`}
                  />
                  {!isAnswerSubmitted && (
                    <button
                      onClick={handleTextSubmit}
                      disabled={!textAnswer.trim()}
                      className="w-full py-4 bg-slate-800 text-white font-bold rounded-xl hover:bg-slate-900 transition-colors disabled:opacity-50"
                    >
                      {tEval.submitAnswer || 'Submit'}
                    </button>
                  )}
                </div>
              )}

              {currentQuestion.type === 'exploration' && !isAnswerSubmitted && (
                <button
                  onClick={handleExplorationComplete}
                  className="w-full py-5 bg-yellow-500 text-white font-bold text-lg rounded-2xl hover:bg-yellow-600 transition-colors shadow-md hover:shadow-lg"
                >
                  {tEval.completeExploration || 'Complete'}
                </button>
              )}
            </div>

            {/* Explanation Area */}
            {isAnswerSubmitted && currentQuestion.explanation && (
              <div className={`p-6 mb-8 border-2 animate-in fade-in slide-in-from-bottom-4 duration-500 ${theme.rounded} bg-slate-50 border-slate-200 text-slate-700 relative z-10`}>
                <p className="font-extrabold mb-3 flex items-center gap-2 uppercase tracking-widest text-sm text-slate-500">
                  <Info size={18} />
                  {currentQuestion.type === 'multipleChoice' ? (tEval.explanation || 'Explanation') : (tEval.modelAnswer || 'Model Answer')}
                </p>
                <p className="font-medium leading-relaxed text-lg">{currentQuestion.explanation}</p>
                {currentQuestion.keywords && (
                  <div className="mt-4 pt-4 border-t border-slate-200">
                    <p className="text-sm font-bold text-slate-500 mb-2">{tEval.keywords || 'Keywords'}</p>
                    <div className="flex flex-wrap gap-2">
                      {currentQuestion.keywords.map((kw: string, idx: number) => (
                        <span key={idx} className="px-3 py-1 bg-white border border-slate-200 rounded-full text-sm font-medium text-slate-600">
                          {kw}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className="relative z-10">
              <ShimmerButton
                onClick={handleNext}
                disabled={!isAnswerSubmitted}
                className={`w-full py-4 font-extrabold text-lg shadow-lg ${!isAnswerSubmitted ? 'opacity-50 grayscale cursor-not-allowed' : ''}`}
                background={!isAnswerSubmitted ? '#94a3b8' : '#ea580c'}
              >
                {currentQ === questions.length - 1 ? (tEval.checkResult || 'Check Result') : (tEval.nextStage || 'Next')}
              </ShimmerButton>
            </div>
          </div>
        ) : (
          <div className={`text-center bg-white p-12 shadow-2xl max-w-md w-full border-2 relative overflow-hidden ${theme.rounded} ${theme.border}`}>
            <Confetti className="absolute inset-0 z-0" />
            <BorderBeam size={300} duration={8} delay={0} colorFrom="#ea580c" colorTo="#f59e0b" />
            
            <div className="w-28 h-28 bg-gradient-to-br from-orange-100 to-red-100 text-orange-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner relative z-10 border-4 border-white">
              <Trophy size={56} className="drop-shadow-md" />
            </div>
            
            <h2 className="text-4xl font-extrabold mb-4 tracking-tight relative z-10 text-slate-800">{tEval.allCompleted || 'Completed!'}</h2>
            <p className="text-slate-500 font-medium mb-8 relative z-10">{tEval.completedDesc || 'Great job!'}</p>
            
            <div className="bg-slate-50 rounded-2xl p-6 mb-10 border border-slate-100 relative z-10">
              <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">{tEval.finalScore || 'Final Score'}</p>
              <p className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600 drop-shadow-sm">
                {Math.round((score / questions.length) * 100)}<span className="text-2xl text-orange-400">{tEval.points || 'pts'}</span>
              </p>
            </div>
            
            <div className="relative z-10">
              <ShimmerButton
                onClick={() => navigate(`/modules/${moduleId}/dashboard`)}
                className="w-full py-4 font-extrabold text-lg shadow-xl"
                background="#ea580c"
              >
                {tEval.toDashboard || 'Back to Dashboard'}
              </ShimmerButton>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
