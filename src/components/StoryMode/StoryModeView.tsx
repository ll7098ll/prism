import React from 'react';
import { ArrowLeft, Loader2, MessageSquare, Info, CheckCircle, XCircle, Star, Sparkles, Compass, ScrollText, PlayCircle, Trophy, Flag, Gamepad2, BookA } from 'lucide-react';
import { getLightTheme } from '../../lib/theme';
import { TypingAnimation } from '../../../components/ui/typing-animation';
import { ShimmerButton } from '../../../components/ui/shimmer-button';
import { BorderBeam } from '../../../components/ui/border-beam';
import { RetroGrid } from '../../../components/ui/retro-grid';

interface StoryModeViewProps {
  moduleId: string;
  navigate: any;
  profile: any;
  loading: boolean;
  generating: boolean;
  consequence: any;
  storyText: string;
  imageUrl: string | null;
  choices: any[];
  miniGame: any;
  history: string[];
  tailoredInterest: string | null;
  isEnding: boolean;
  endingSummary: string;
  selectedTerm: string | null;
  setSelectedTerm: (val: string | null) => void;
  selectedDef: string | null;
  setSelectedDef: (val: string | null) => void;
  matchedPairs: string[];
  gameMessage: string;
  handleChoice: (choice: string) => void;
  handleMatch: (term: string, definition: string) => void;
  moduleInfo: any;
  t: any;
  tStory: any;
  currentCountry: any;
}

export default function StoryModeView(props: StoryModeViewProps) {
  const {
    moduleId, navigate, profile, loading, generating, consequence, storyText, imageUrl, choices, miniGame, history, tailoredInterest, isEnding, endingSummary,
    selectedTerm, setSelectedTerm, selectedDef, setSelectedDef, matchedPairs, gameMessage,
    handleChoice, handleMatch, moduleInfo, t, tStory, currentCountry
  } = props;

  if (!moduleInfo) return <div className="min-h-screen flex items-center justify-center bg-slate-50">{t.common.error}</div>;
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
        <Loader2 className="animate-spin text-blue-500 mb-4" size={40} />
        <p className="text-slate-500 font-medium animate-pulse">{t.common.loading || 'Loading...'}</p>
      </div>
    );
  }

  const theme = profile ? getLightTheme(profile.level) : getLightTheme('elementary');

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-500 bg-slate-50 text-slate-900 ${theme.font}`}>
      <div className="fixed inset-0 z-0 pointer-events-none opacity-40">
        <RetroGrid />
      </div>

      <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-10 border-b border-slate-200/50">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate(`/modules/${moduleId}/dashboard`)}
              className="p-2 -ml-2 rounded-xl hover:bg-slate-100 text-slate-500 transition-colors"
            >
              <ArrowLeft size={24} />
            </button>
            <div>
              <h1 className="font-extrabold text-xl tracking-tight flex items-center gap-2">
                <span className="text-2xl">{currentCountry.flag}</span>
                {moduleInfo.title}
              </h1>
              <p className="text-sm font-medium text-slate-500">{t.dashboard?.story || 'Story Mode'}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className={`px-3 py-1.5 rounded-lg text-sm font-bold flex items-center gap-1.5 ${theme.bg} ${theme.text} ${theme.border} border shadow-sm`}>
              <Star size={16} />
              {profile.level}
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-4xl mx-auto w-full p-4 flex flex-col gap-6 relative z-10">
        {/* Story History Log */}
        {history.length > 0 && (
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-sm border border-slate-200/60 max-h-48 overflow-y-auto custom-scrollbar">
            <h3 className="text-sm font-bold text-slate-400 mb-3 flex items-center gap-2 uppercase tracking-wider">
              <ScrollText size={16} /> {tStory.logTitle || 'Story Log'}
            </h3>
            <div className="space-y-3">
              {history.map((log, idx) => (
                <div key={idx} className="text-sm text-slate-600 font-medium flex gap-3">
                  <span className="text-slate-400 shrink-0">{tStory.turn || 'Turn'} {idx + 1}</span>
                  <span>{log}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Current Scene */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-200/60 overflow-hidden relative">
          {imageUrl ? (
            <div className="w-full h-64 md:h-80 bg-slate-100 relative">
              <img src={imageUrl} alt="Scene" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />
              
              {tailoredInterest && (
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-bold text-indigo-600 flex items-center gap-1.5 shadow-lg border border-white/20 animate-in slide-in-from-top-2">
                  <Sparkles size={14} />
                  {tStory.tailored || 'Tailored Story'} ({tailoredInterest})
                </div>
              )}
            </div>
          ) : (
            <div className="w-full h-32 bg-slate-100 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, slate-400 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
              <Compass size={48} className="text-slate-300 animate-pulse" />
            </div>
          )}
          
          <div className="p-6 md:p-8 relative">
            {consequence && (
              <div className="mb-6 p-5 rounded-2xl bg-slate-50 border border-slate-100 shadow-inner">
                <h4 className="font-bold text-slate-700 mb-2 flex items-center gap-2 text-sm uppercase tracking-wider">
                  <Info size={16} className="text-blue-500" /> {tStory.result || 'Result of previous choice'}
                </h4>
                <p className="text-slate-600 font-medium leading-relaxed">{typeof consequence === 'object' ? consequence.narrative : consequence}</p>
                {typeof consequence === 'object' && consequence.learningPoint && (
                  <div className="mt-3 pt-3 border-t border-slate-200/60 flex items-start gap-2">
                    <BookA size={16} className="text-indigo-500 mt-0.5 shrink-0" />
                    <p className="text-sm font-bold text-indigo-700">{tStory.learningPoint || 'Learning Point'}: {consequence.learningPoint}</p>
                  </div>
                )}
              </div>
            )}

            <div className="prose prose-slate max-w-none">
              <div className="text-lg md:text-xl leading-relaxed text-slate-800 font-medium whitespace-pre-wrap">
                {generating && !storyText ? (
                  <div className="flex items-center gap-3 text-slate-400">
                    <Loader2 className="animate-spin" size={24} />
                    {t.common.loading || 'Generating...'}
                  </div>
                ) : (
                  <TypingAnimation duration={20}>{storyText}</TypingAnimation>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* End of Story Summary */}
        {isEnding && (
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-3xl p-8 shadow-lg border border-indigo-100 animate-in slide-in-from-bottom-4">
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 bg-white rounded-2xl shadow-md flex items-center justify-center text-indigo-600">
                <Trophy size={32} />
              </div>
            </div>
            <h2 className="text-2xl font-extrabold text-center text-indigo-900 mb-4">{tStory.ending || 'Story Completed!'}</h2>
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/50 mb-8">
              <h3 className="font-bold text-indigo-800 mb-2 flex items-center gap-2">
                <ScrollText size={18} /> {tStory.summary || 'Learning Summary & Results'}
              </h3>
              <p className="text-indigo-900/80 leading-relaxed font-medium">{endingSummary}</p>
            </div>
            <button
              onClick={() => navigate(`/modules/${moduleId}/dashboard`)}
              className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold text-lg transition-all shadow-md hover:shadow-xl active:scale-[0.98] flex items-center justify-center gap-2"
            >
              <Flag size={20} />
              {tStory.toDashboard || 'Return to Dashboard'}
            </button>
          </div>
        )}

        {/* Interactive Elements (Choices or Mini-game) */}
        {!isEnding && (
          <div className="mt-auto pb-8">
            {generating ? (
              <div className="flex flex-col items-center justify-center py-12 text-slate-400 gap-4">
                <Loader2 className="animate-spin" size={32} />
                <p className="font-medium animate-pulse">{t.common.loading || 'Generating next scene...'}</p>
              </div>
            ) : miniGame ? (
              <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-slate-200/60 relative overflow-hidden">
                <BorderBeam size={250} duration={12} delay={9} />
                <div className="mb-6">
                  <h3 className="text-2xl font-extrabold text-slate-800 mb-2 flex items-center gap-2">
                    <Gamepad2 className="text-blue-600" /> {miniGame.title}
                  </h3>
                  <p className="text-slate-500 font-medium">{miniGame.description}</p>
                </div>

                {miniGame.type === 'matching' && (
                  <div className="space-y-6 relative z-10">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-3">
                        {miniGame.data.map((item: any, idx: number) => (
                          <button
                            key={`term-${idx}`}
                            onClick={() => handleMatch(item.term, '')}
                            disabled={matchedPairs.includes(item.term)}
                            className={`w-full p-4 rounded-2xl font-bold text-left transition-all ${
                              matchedPairs.includes(item.term) ? 'bg-slate-100 text-slate-400 border-slate-200 opacity-50' :
                              selectedTerm === item.term ? 'bg-blue-600 text-white shadow-md scale-[1.02]' :
                              'bg-white border-2 border-slate-200 text-slate-700 hover:border-blue-400 hover:bg-blue-50'
                            }`}
                          >
                            {item.term}
                          </button>
                        ))}
                      </div>
                      <div className="space-y-3">
                        {/* Shuffle definitions for gameplay */}
                        {[...miniGame.data].sort(() => Math.random() - 0.5).map((item: any, idx: number) => (
                          <button
                            key={`def-${idx}`}
                            onClick={() => handleMatch('', item.definition)}
                            disabled={matchedPairs.includes(item.term)} // Disable if the matching term is already found
                            className={`w-full p-4 rounded-2xl font-medium text-sm text-left transition-all ${
                              matchedPairs.includes(item.term) ? 'bg-slate-100 text-slate-400 border-slate-200 opacity-50' :
                              selectedDef === item.definition ? 'bg-indigo-600 text-white shadow-md scale-[1.02]' :
                              'bg-white border-2 border-slate-200 text-slate-700 hover:border-indigo-400 hover:bg-indigo-50'
                            }`}
                          >
                            {item.definition}
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    {gameMessage && (
                      <div className={`text-center font-bold p-3 rounded-xl text-sm animate-in fade-in zoom-in duration-300 ${gameMessage === tStory.miniGameSuccess ? 'bg-green-100 text-green-700 border border-green-200' : 'bg-red-100 text-red-700 border border-red-200'}`}>
                        {gameMessage}
                      </div>
                    )}
                  </div>
                )}

                {miniGame.type === 'voting' && (
                  <div className="space-y-6 relative z-10">
                    <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 text-center">
                      <h4 className="text-xl font-extrabold text-slate-800 mb-2">{miniGame.data.billName}</h4>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-5 rounded-2xl bg-blue-50 border border-blue-100">
                        <h4 className="font-extrabold text-blue-700 mb-4 flex items-center gap-2 text-base"><CheckCircle size={18} /> {tStory.pros || 'Pros'}</h4>
                        <p className="text-blue-900/80 text-sm font-medium leading-relaxed">{miniGame.data.pros}</p>
                      </div>
                      <div className="p-5 rounded-2xl bg-red-50 border border-red-100">
                        <h4 className="font-extrabold text-red-700 mb-4 flex items-center gap-2 text-base"><XCircle size={18} /> {tStory.cons || 'Cons'}</h4>
                        <p className="text-red-900/80 text-sm font-medium leading-relaxed">{miniGame.data.cons}</p>
                      </div>
                    </div>
                    <div className="flex gap-4 pt-4">
                      <ShimmerButton 
                        onClick={() => handleChoice(`${tStory.votePros || '[Vote Result] Pros:'} ${miniGame.data.billName}`)}
                        className="flex-1 py-4 text-lg font-bold shadow-md"
                        background="#2563eb"
                      >
                        {tStory.pros || 'Pros (Yes)'}
                      </ShimmerButton>
                      <ShimmerButton 
                        onClick={() => handleChoice(`${tStory.voteCons || '[Vote Result] Cons:'} ${miniGame.data.billName}`)}
                        className="flex-1 py-4 text-lg font-bold shadow-md"
                        background="#dc2626"
                      >
                        {tStory.cons || 'Cons (No)'}
                      </ShimmerButton>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-slate-400 mb-4 flex items-center gap-2 uppercase tracking-wider pl-2">
                  <MessageSquare size={16} /> {tStory.actionTitle || 'Your Action'}
                </h3>
                <div className="grid grid-cols-1 gap-3">
                  {choices.map((choice, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleChoice(choice.text)}
                      className={`w-full text-left p-5 rounded-2xl border-2 transition-all duration-200 flex items-center justify-between group ${
                        choice.interest 
                          ? 'bg-indigo-50 border-indigo-200 hover:border-indigo-400 hover:shadow-md hover:shadow-indigo-100' 
                          : 'bg-white border-slate-200 hover:border-slate-400 hover:shadow-md'
                      }`}
                    >
                      <span className={`font-bold text-lg ${choice.interest ? 'text-indigo-900' : 'text-slate-700 group-hover:text-slate-900'}`}>
                        {choice.text}
                      </span>
                      {choice.interest && (
                        <span className="flex items-center gap-1.5 text-xs font-bold text-indigo-600 bg-indigo-100 px-3 py-1.5 rounded-full">
                          <Sparkles size={14} /> {tStory.specialChoice || 'Special Choice'}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
