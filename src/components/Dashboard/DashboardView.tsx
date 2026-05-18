import React from 'react';
import { BookA, PlayCircle, Info, CheckCircle, LogOut, Trophy, Compass, Star, GitBranch, Clock, Edit2, X, Scale, Landmark, Building, Gamepad2, ArrowLeft, Coins, Handshake, Rocket, Telescope, Leaf, Droplets, Crown, ScrollText, Flag, Megaphone, Cloud, Users, Apple, Zap, HeartPulse, Microscope, Swords, Shield, Ship, Hammer } from 'lucide-react';
import { SCHOOL_LEVEL_KEYS } from '../../lib/mockData';
import { getLightTheme } from '../../lib/theme';
import { RetroGrid } from '../../../components/ui/retro-grid';
import { Particles } from '../../../components/ui/particles';
import { Meteors } from '../../../components/ui/meteors';
import { ShimmerButton } from '../../../components/ui/shimmer-button';

const IconMap: Record<string, any> = {
  Scale, Landmark, Building, Coins, Handshake, Rocket, Telescope, Leaf, Droplets, Crown, ScrollText, Flag, Megaphone, BookA, PlayCircle, CheckCircle, Compass, Star, Cloud, Users, Apple, Zap, HeartPulse, Microscope, Swords, Shield, Ship, Hammer
};

interface DashboardViewProps {
  moduleId: string;
  profile: any;
  progress: any;
  moduleInfo: any;
  t: any;
  currentCountry: any;
  navigate: any;
  handleLogout: () => void;
  isEditingProfile: boolean;
  setIsEditingProfile: (val: boolean) => void;
  openEditModal: () => void;
  editName: string;
  setEditName: (val: string) => void;
  editLevel: string;
  setEditLevel: (val: string) => void;
  editReadingLevel?: 'basic' | 'standard' | 'advanced';
  setEditReadingLevel?: (val: 'basic' | 'standard' | 'advanced') => void;
  editInterests: string[];
  interestInput: string;
  setInterestInput: (val: string) => void;
  handleAddInterest: (e?: React.KeyboardEvent | React.MouseEvent) => void;
  removeInterest: (interest: string) => void;
  handleSaveProfile: () => void;
}

export default function DashboardView(props: DashboardViewProps) {
  const {
    moduleId, profile, progress, moduleInfo, t, currentCountry, navigate,
    handleLogout, isEditingProfile, setIsEditingProfile, openEditModal,
    editName, setEditName, editLevel, setEditLevel, editReadingLevel, setEditReadingLevel, editInterests,
    interestInput, setInterestInput, handleAddInterest, removeInterest, handleSaveProfile
  } = props;

  const tDash = t.dashboard;
  const theme = getLightTheme(profile.level);

  // Calculate Grade
  const calculateGrade = () => {
    let score = 0;
    if (progress.vocabCompleted) score += 20;
    score += Math.min(progress.storyProgress * 5, 40); // Max 40 points for story
    
    const maxQuiz = progress.quizScores?.length > 0 ? Math.max(...progress.quizScores) : 0;
    score += (maxQuiz * 0.4); // Max 40 points for quiz

    const ranks = {
      diamond: t.ranks?.diamond || 'Diamond',
      platinum: t.ranks?.platinum || 'Platinum',
      gold: t.ranks?.gold || 'Gold',
      silver: t.ranks?.silver || 'Silver',
      bronze: t.ranks?.bronze || 'Bronze'
    };

    if (score >= 90) return { name: ranks.diamond, color: 'text-cyan-500', bg: 'bg-cyan-100', border: 'border-cyan-200' };
    if (score >= 70) return { name: ranks.platinum, color: 'text-emerald-500', bg: 'bg-emerald-100', border: 'border-emerald-200' };
    if (score >= 50) return { name: ranks.gold, color: 'text-yellow-500', bg: 'bg-yellow-100', border: 'border-yellow-200' };
    if (score >= 30) return { name: ranks.silver, color: 'text-slate-500', bg: 'bg-slate-200', border: 'border-slate-300' };
    return { name: ranks.bronze, color: 'text-amber-700', bg: 'bg-amber-100', border: 'border-amber-200' };
  };

  const grade = calculateGrade();
  const maxQuizScore = progress.quizScores?.length > 0 ? Math.max(...progress.quizScores) : 0;

  const storyLogs = progress.storyLogs || [];
  const perfectCount = progress.quizScores?.filter((score: number) => score === 100).length || 0;
  const hasPerfectStreak = perfectCount >= 3;

  const titles = {
    novice: t.titles?.novice || 'Novice Adventurer',
    perfectionist: t.titles?.perfectionist || 'Perfectionist',
    perfectScore: t.titles?.perfectScore || 'Perfect Scorer',
    veteran: 'Veteran Explorer',
    vocabMaster: t.titles?.vocabMaster || 'Vocab Master'
  };

  let mainTitle = titles.novice;
  if (hasPerfectStreak) mainTitle = titles.perfectionist;
  else if (maxQuizScore === 100) mainTitle = titles.perfectScore;
  else if (progress.storyProgress >= 5) mainTitle = titles.veteran;
  else if (progress.vocabCompleted) mainTitle = titles.vocabMaster;

  const moduleBadges = (moduleInfo.achievements || []).map((ach: any) => {
    const unlocked = storyLogs.some((log: any) => log.choice.includes(ach.keyword));
    if (unlocked && mainTitle === titles.novice) mainTitle = ach.name;
    return {
      ...ach,
      icon: IconMap[ach.icon] || Star,
      unlocked
    };
  });

  return (
    <div className={`min-h-screen pb-12 transition-colors duration-500 relative overflow-hidden ${theme.bg} ${theme.text} ${theme.font}`}>
      {/* Game-like Background Effects */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-30">
        <RetroGrid />
        <Particles quantity={50} ease={80} color={theme.text === 'text-slate-900' ? '#000000' : '#ffffff'} refresh />
        {grade.name === (t.ranks?.diamond || 'Diamond') && <Meteors number={10} />}
      </div>

      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-10 border-b border-slate-200/50">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate(`/subjects/${moduleInfo.subjectId}`)}
              className="p-2 -ml-2 rounded-xl hover:bg-slate-100 text-slate-500 transition-colors"
            >
              <ArrowLeft size={24} />
            </button>
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-inner relative overflow-hidden ${grade.bg} ${grade.color}`}>
              <Trophy size={28} className="relative z-10 drop-shadow-sm" />
              <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent"></div>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-2xl mr-1">{currentCountry.flag}</span>
                <h1 className="font-bold text-xl tracking-tight">{profile.name}</h1>
                <span className={`text-xs font-bold px-3 py-1 rounded-full border shadow-sm ${grade.bg} ${grade.color} ${grade.border}`}>
                  Lv. {grade.name}
                </span>
                <span className={`text-xs font-bold px-3 py-1 rounded-full border shadow-sm bg-slate-800 text-white border-slate-700`}>
                  {mainTitle}
                </span>
              </div>
              <p className="text-sm font-medium opacity-70 flex items-center gap-1">
                <Gamepad2 size={14} /> {moduleInfo.title}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => navigate('/about')} className="text-slate-500 hover:text-indigo-600 p-2.5 rounded-xl hover:bg-indigo-50 transition-all active:scale-95 bg-white shadow-sm border border-slate-200" title="About PRISM">
              <Info size={18} />
            </button>
            <button onClick={openEditModal} className="text-slate-500 hover:text-slate-800 p-2.5 rounded-xl hover:bg-slate-100 transition-all active:scale-95 bg-white shadow-sm border border-slate-200" title={t.common?.profileSettings || 'Profile Settings'}>
              <Edit2 size={18} />
            </button>
            <button onClick={handleLogout} className="text-red-500 hover:text-red-600 p-2.5 rounded-xl hover:bg-red-50 transition-all active:scale-95 bg-white shadow-sm border border-slate-200" title={t.common?.logout || 'Logout'}>
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 mt-8 space-y-12 relative z-10">
        
        {/* Learning Menu Section */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 text-blue-600 rounded-xl shadow-inner">
                <Gamepad2 size={24} />
              </div>
              <h2 className="text-2xl font-extrabold tracking-tight">{tDash.title || 'Stage Selection'}</h2>
            </div>
            <button 
              onClick={() => navigate('/achievements')}
              className="text-sm font-bold text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
            >
              <Trophy size={16} />
              {tDash.viewAllAchievements || 'View All Achievements'}
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Menu 1: Vocabulary */}
            <div className="relative group h-full">
              <div
                onClick={() => navigate(`/modules/${moduleId}/vocabulary`)}
                role="button"
                tabIndex={0}
                className={`cursor-pointer w-full h-full flex flex-col items-start p-8 ${theme.rounded} shadow-md hover:shadow-xl transition-all duration-300 bg-white border border-slate-200 text-left hover:-translate-y-1`}
              >
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-5 shadow-inner ${progress.vocabCompleted ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'}`}>
                  <BookA size={28} />
                </div>
                <h3 className="text-xl font-extrabold mb-2 group-hover:text-blue-600 transition-colors">
                  <span className="mr-2">{currentCountry.flag}</span>
                  {t.common.stage || 'Stage'} 1: {tDash.vocab}
                </h3>
                <p className="text-sm text-slate-500 mb-6 font-medium">{tDash.vocabDesc}</p>
                <div className="mt-auto w-full">
                  {progress.vocabCompleted ? (
                    <span className="inline-flex items-center gap-1.5 text-sm font-bold text-green-600 bg-green-50 px-3 py-1.5 rounded-lg w-full justify-center border border-green-200">
                      <CheckCircle size={16} /> {tDash.clear || 'Cleared'}
                    </span>
                  ) : (
                    <ShimmerButton className="shadow-md w-full py-2 text-sm font-bold" background="#2563eb">
                      {tDash.enter || 'Enter'}
                    </ShimmerButton>
                  )}
                </div>
              </div>
            </div>

            {/* Menu 2: Story Mode */}
            <div className="relative group h-full">
              <div
                onClick={() => navigate(`/modules/${moduleId}/story`)}
                role="button"
                tabIndex={0}
                className={`cursor-pointer w-full h-full flex flex-col items-start p-8 ${theme.rounded} shadow-md hover:shadow-xl transition-all duration-300 bg-white border border-slate-200 text-left hover:-translate-y-1`}
              >
                <div className="w-14 h-14 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center mb-5 shadow-inner">
                  <PlayCircle size={28} />
                </div>
                <h3 className="text-xl font-extrabold mb-2 group-hover:text-purple-600 transition-colors">
                  <span className="mr-2">{currentCountry.flag}</span>
                  {t.common.stage || 'Stage'} 2: {tDash.story}
                </h3>
                <p className="text-sm text-slate-500 mb-6 font-medium">{tDash.storyDesc}</p>
                <div className="mt-auto w-full">
                  {progress.storyProgress > 0 ? (
                    <ShimmerButton className="shadow-md w-full py-2 text-sm font-bold" background="#9333ea">
                      {tDash.continue || 'Continue'} ({t.common.scene || 'Scene'} {progress.storyProgress})
                    </ShimmerButton>
                  ) : (
                    <ShimmerButton className="shadow-md w-full py-2 text-sm font-bold" background="#9333ea">
                      {tDash.start || 'Start New Game'}
                    </ShimmerButton>
                  )}
                </div>
              </div>
            </div>

            {/* Menu 3: Evaluation */}
            <div className="relative group h-full">
              <div
                onClick={() => navigate(`/modules/${moduleId}/evaluation`)}
                role="button"
                tabIndex={0}
                className={`cursor-pointer w-full h-full flex flex-col items-start p-8 ${theme.rounded} shadow-md hover:shadow-xl transition-all duration-300 bg-white border border-slate-200 text-left hover:-translate-y-1`}
              >
                <div className="w-14 h-14 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center mb-5 shadow-inner">
                  <CheckCircle size={28} />
                </div>
                <h3 className="text-xl font-extrabold mb-2 group-hover:text-orange-600 transition-colors">
                  <span className="mr-2">{currentCountry.flag}</span>
                  {t.common.stage || 'Stage'} 3: {tDash.eval}
                </h3>
                <p className="text-sm text-slate-500 mb-6 font-medium">{tDash.evalDesc}</p>
                <div className="mt-auto w-full">
                  {progress.quizScores?.length > 0 ? (
                    <div className="flex flex-col gap-2">
                      <span className="inline-flex items-center gap-1.5 text-sm font-bold text-orange-600 bg-orange-50 px-3 py-1.5 rounded-lg w-full justify-center border border-orange-200">
                        {tDash.bestScore || 'Best Score: '}{maxQuizScore}{tDash.scoreUnit || ' pts'}
                      </span>
                      <ShimmerButton className="shadow-md w-full py-2 text-sm font-bold" background="#ea580c">
                        {tDash.retry || 'Retry'}
                      </ShimmerButton>
                    </div>
                  ) : (
                    <ShimmerButton className="shadow-md w-full py-2 text-sm font-bold" background="#ea580c">
                      {tDash.challenge || 'Challenge'}
                    </ShimmerButton>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Story Timeline Section */}
        {progress.storyLogs && progress.storyLogs.length > 0 && (
          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-indigo-100 text-indigo-600 rounded-xl shadow-inner">
                <GitBranch size={24} />
              </div>
              <h2 className="text-2xl font-extrabold tracking-tight">{t.story?.logTitle || 'Story Log'}</h2>
            </div>
            <div className={`p-8 ${theme.rounded} shadow-lg bg-white border border-slate-200 relative overflow-hidden`}>
              <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50 rounded-full blur-3xl -mr-20 -mt-20 opacity-50 pointer-events-none"></div>
              
              <p className="text-sm font-medium text-slate-500 mb-8 relative z-10">{t.story?.logDesc || 'Check the choices you made in Story Mode and the results they caused.'}</p>
              
              <div className={`relative border-l-4 border-indigo-100 ml-4 space-y-10 z-10`}>
                {progress.storyLogs.slice(-15).reverse().map((log: any, idx: number) => (
                  <div key={idx} className="relative pl-8 group">
                    <div className={`absolute -left-[14px] top-1 w-6 h-6 rounded-full bg-white border-4 border-indigo-200 group-hover:border-indigo-500 group-hover:scale-125 transition-all duration-300 shadow-sm`}></div>
                    <div className="mb-2 flex items-center gap-2 text-xs font-bold text-indigo-400">
                      <Clock size={14} />
                      {new Date(log.date).toLocaleString()}
                    </div>
                    <h3 className="font-extrabold mb-3 text-lg text-slate-800">
                      <span className="text-indigo-600 mr-2">{log.type === 'start' ? (t.story?.logStart || '[Start]') : (t.story?.logChoice || '[Choice]')}</span>
                      {log.choice}
                    </h3>
                    <div className={`p-5 rounded-2xl border border-slate-100 bg-slate-50 shadow-inner group-hover:bg-indigo-50/50 transition-colors`}>
                      <p className="text-sm leading-relaxed font-medium text-slate-700">
                        {log.consequence}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      {/* Edit Profile Modal */}
      {isEditingProfile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full relative">
            <button 
              onClick={() => setIsEditingProfile(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
            >
              <X size={24} />
            </button>
            <h2 className="text-2xl font-bold mb-6 text-center">{t.profile.title}</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium opacity-80 mb-2">{t.profile.nameLabel}</label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className={`w-full px-4 py-3 border focus:ring-2 focus:outline-none transition-all ${theme.rounded} ${theme.border}`}
                  placeholder={t.profile.namePlaceholder}
                />
              </div>

              <div>
                <label className="block text-sm font-medium opacity-80 mb-2">{t.profile.levelLabel}</label>
                <div className="grid grid-cols-3 gap-3">
                  {SCHOOL_LEVEL_KEYS.map((key, idx) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setEditLevel(key)}
                      className={`py-2 border font-medium transition-all ${theme.rounded} ${editLevel === key ? `${theme.primary} shadow-md` : `bg-white hover:bg-slate-50 ${theme.text} ${theme.border}`}`}
                    >
                      {t.profile.levels[idx]}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium opacity-80 mb-2">
                  {currentCountry?.id === 'kr' ? '텍스트 난이도 (선택한 학교급 내)' : 'Text Difficulty'}
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: 'basic', label: currentCountry?.id === 'kr' ? '기초' : 'Basic' },
                    { id: 'standard', label: currentCountry?.id === 'kr' ? '표준' : 'Standard' },
                    { id: 'advanced', label: currentCountry?.id === 'kr' ? '심화' : 'Advanced' }
                  ].map((rLevel) => (
                    <button
                      key={rLevel.id}
                      type="button"
                      onClick={() => setEditReadingLevel && setEditReadingLevel(rLevel.id as 'basic'|'standard'|'advanced')}
                      className={`py-2 border font-medium transition-all ${theme.rounded} ${editReadingLevel === rLevel.id ? `bg-slate-800 text-white border-slate-700 shadow-md` : `bg-white hover:bg-slate-50 text-slate-600 border-slate-200`}`}
                    >
                      {rLevel.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium opacity-80 mb-2">{t.profile.interestLabel}</label>
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    value={interestInput}
                    onChange={(e) => setInterestInput(e.target.value)}
                    onKeyDown={handleAddInterest}
                    className={`flex-1 px-4 py-2 border focus:ring-2 focus:outline-none transition-all ${theme.rounded} ${theme.border}`}
                    placeholder={t.profile.interestPlaceholder}
                    disabled={editInterests.length >= 3}
                  />
                  <button
                    type="button"
                    onClick={handleAddInterest}
                    disabled={editInterests.length >= 3 || !interestInput.trim()}
                    className={`px-4 py-2 font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors ${theme.rounded} ${theme.primary}`}
                  >
                    {t.profile.addBtn}
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {editInterests.map(interest => (
                    <div
                      key={interest}
                      className={`flex items-center gap-1 px-3 py-1.5 text-sm font-medium border ${theme.rounded} ${theme.badge}`}
                    >
                      <span>{interest}</span>
                      <button
                        type="button"
                        onClick={() => removeInterest(interest)}
                        className="p-0.5 hover:bg-black/10 rounded-full transition-colors"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                  {editInterests.length === 0 && (
                    <p className="text-sm opacity-50">{t.profile.noInterest}</p>
                  )}
                </div>
              </div>

              <button
                onClick={handleSaveProfile}
                className={`w-full ${theme.primary} font-bold py-3 px-4 ${theme.rounded} shadow-lg transition-colors mt-8`}
              >
                {t.common.complete}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
