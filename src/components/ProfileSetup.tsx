import React, { useState } from 'react';
import { auth, db, doc, setDoc, getDoc } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { X, User, Star, Sparkles } from 'lucide-react';
import { getLightTheme } from '../lib/theme';
import { ShimmerButton } from '../../components/ui/shimmer-button';
import { BorderBeam } from '../../components/ui/border-beam';
import { Particles } from '../../components/ui/particles';
import { useAppContext } from '../contexts/AppContext';
import { SCHOOL_LEVEL_KEYS, SchoolLevel } from '../lib/mockData';

export default function ProfileSetup({ onComplete }: { onComplete: () => void }) {
  const [name, setName] = useState('');
  const [level, setLevel] = useState<SchoolLevel>('elementary');
  const [readingLevel, setReadingLevel] = useState<'basic' | 'standard' | 'advanced'>('standard');
  const [interests, setInterests] = useState<string[]>([]);
  const [interestInput, setInterestInput] = useState('');
  const navigate = useNavigate();

  const { t: fullT, currentCountry, selectedCountry, setSelectedSchoolLevel } = useAppContext();
  const t = fullT.profile;
  const tCommon = fullT.common;

  // Set default level or fetch existing user data
  React.useEffect(() => {
    const fetchUserData = async () => {
      if (auth.currentUser) {
        try {
          const userDoc = await getDoc(doc(db, 'users', auth.currentUser.uid));
          if (userDoc.exists()) {
            const data = userDoc.data();
            if (data.name) setName(data.name);
            if (data.level) setLevel(data.level);
            if (data.readingLevel) setReadingLevel(data.readingLevel);
            if (data.interests) setInterests(data.interests);
          } else {
            setLevel('elementary');
            setReadingLevel('standard');
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          setLevel('elementary');
          setReadingLevel('standard');
        }
      } else {
        setLevel('elementary');
        setReadingLevel('standard');
      }
    };
    fetchUserData();
  }, [t]);

  const handleAddInterest = (e?: React.KeyboardEvent | React.MouseEvent) => {
    if (e && 'key' in e && e.key !== 'Enter') return;
    if (e) e.preventDefault();
    
    const trimmed = interestInput.trim();
    if (!trimmed) return;
    
    if (interests.length >= 3) {
      return;
    }
    
    if (interests.includes(trimmed)) {
      setInterestInput('');
      return;
    }
    
    setInterests([...interests, trimmed]);
    setInterestInput('');
  };

  const removeInterest = (interestToRemove: string) => {
    setInterests(interests.filter(i => i !== interestToRemove));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      const msgs: Record<string, string> = { kr: '이름을 입력해주세요.', us: 'Please enter your name.', jp: '名前を入力してください。', cn: '请输入您的名字。', gb: 'Please enter your name.', fr: 'Veuillez entrer votre nom.', it: 'Per favore, inserisci il tuo nome.', de: 'Bitte geben Sie Ihren Namen ein.' };
      alert(msgs[currentCountry.id] || 'Please enter your name.');
      return;
    }
    if (!auth.currentUser) return;

    try {
      // 학교급을 AppContext에도 반영
      setSelectedSchoolLevel(level);

      await setDoc(doc(db, 'users', auth.currentUser.uid), {
        name,
        level,
        readingLevel,
        interests,
        country: selectedCountry,
        updatedAt: new Date().toISOString()
      }, { merge: true });
      
      onComplete();
      navigate('/subjects');
    } catch (error) {
      console.error('Error saving profile:', error);
      alert(tCommon.error || '프로필 저장 중 오류가 발생했습니다.');
    }
  };

  const theme = getLightTheme(level);

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 transition-colors duration-500 relative overflow-hidden ${theme.bg} ${theme.text} ${theme.font}`}>
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <Particles
          className="absolute inset-0"
          quantity={100}
          ease={80}
          color={theme.primaryText.split('-')[1] ? `#${theme.primaryText.split('-')[1]}` : "#ffffff"}
          refresh
        />
      </div>

      <div className={`max-w-md w-full bg-white/90 backdrop-blur-xl shadow-2xl p-10 border-2 relative z-10 overflow-hidden ${theme.rounded} ${theme.border}`}>
        <BorderBeam size={250} duration={12} delay={0} className="opacity-50" />
        
        <div className="text-center mb-8 relative">
          <div className="w-20 h-20 mx-auto bg-slate-100 rounded-full flex items-center justify-center mb-4 border-4 border-white shadow-lg relative">
            <User size={40} className="text-slate-400" />
            <div className="absolute -bottom-2 -right-2 bg-yellow-400 text-white rounded-full p-1 border-2 border-white shadow-sm">
              <Star size={16} fill="currentColor" />
            </div>
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight flex items-center justify-center gap-2">
            <span className="text-3xl">{currentCountry.flag}</span>
            {t.title}
          </h2>
          <p className="text-slate-500 mt-2 font-medium">{t.subtitle}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-extrabold uppercase tracking-widest text-slate-500">
              <Sparkles size={16} className={theme.primaryText} />
              {t.nameLabel}
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`w-full px-5 py-4 border-2 focus:ring-4 focus:ring-opacity-20 focus:outline-none transition-all font-bold text-lg shadow-inner ${theme.rounded} ${theme.border} focus:border-blue-500 focus:ring-blue-500`}
              placeholder={t.namePlaceholder}
            />
          </div>

          <div className="space-y-3">
            <label className="block text-sm font-extrabold uppercase tracking-widest text-slate-500">{t.levelLabel}</label>
            <div className="grid grid-cols-3 gap-3">
              {SCHOOL_LEVEL_KEYS.map((key, idx) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setLevel(key)}
                  className={`py-3 border-2 font-extrabold transition-all duration-300 text-sm ${theme.rounded} ${level === key ? `${theme.primary} shadow-lg scale-105 z-10 relative` : `bg-white hover:bg-slate-50 ${theme.text} ${theme.border} opacity-70 hover:opacity-100`}`}
                >
                  {t.levels[idx]}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <label className="block text-sm font-extrabold uppercase tracking-widest text-slate-500">
              {currentCountry.id === 'kr' ? '텍스트 난이도 (선택한 학교급 내)' : 'Text Difficulty (Within School Level)'}
            </label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { id: 'basic', label: currentCountry.id === 'kr' ? '기초' : 'Basic' },
                { id: 'standard', label: currentCountry.id === 'kr' ? '표준' : 'Standard' },
                { id: 'advanced', label: currentCountry.id === 'kr' ? '심화' : 'Advanced' }
              ].map((rLevel) => (
                <button
                  key={rLevel.id}
                  type="button"
                  onClick={() => setReadingLevel(rLevel.id as 'basic' | 'standard' | 'advanced')}
                  className={`py-2 border-2 font-bold transition-all duration-300 text-sm rounded-xl ${readingLevel === rLevel.id ? `bg-slate-800 text-white border-slate-700 shadow-md scale-105 z-10 relative` : `bg-white text-slate-500 border-slate-200 hover:bg-slate-50 opacity-70 hover:opacity-100`}`}
                >
                  {rLevel.label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <label className="block text-sm font-extrabold uppercase tracking-widest text-slate-500">{t.interestLabel}</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={interestInput}
                onChange={(e) => setInterestInput(e.target.value)}
                onKeyDown={handleAddInterest}
                className={`flex-1 px-4 py-3 border-2 focus:ring-4 focus:ring-opacity-20 focus:outline-none transition-all font-medium shadow-inner ${theme.rounded} ${theme.border} focus:border-blue-500 focus:ring-blue-500`}
                placeholder={t.interestPlaceholder}
                disabled={interests.length >= 3}
              />
              <button
                type="button"
                onClick={handleAddInterest}
                disabled={interests.length >= 3 || !interestInput.trim()}
                className={`px-6 py-3 font-extrabold disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md active:scale-95 ${theme.rounded} ${theme.primary}`}
              >
                {t.addBtn}
              </button>
            </div>
            <div className="flex flex-wrap gap-2 min-h-[40px] p-3 bg-slate-50 rounded-xl border border-slate-100">
              {interests.map(interest => (
                <div
                  key={interest}
                  className={`flex items-center gap-2 px-3 py-1.5 text-sm font-bold border-2 shadow-sm animate-in zoom-in duration-300 ${theme.rounded} ${theme.badge}`}
                >
                  <span>{interest}</span>
                  <button
                    type="button"
                    onClick={() => removeInterest(interest)}
                    className="p-1 hover:bg-black/10 rounded-full transition-colors"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
              {interests.length === 0 && (
                <p className="text-sm font-medium text-slate-400 flex items-center justify-center w-full">{t.noInterest}</p>
              )}
            </div>
          </div>

          <div className="pt-4">
            <ShimmerButton
              onClick={handleSubmit}
              className="w-full py-4 font-extrabold text-lg shadow-xl"
              background={level === 'elementary' ? '#22c55e' : level === 'middle' ? '#3b82f6' : '#8b5cf6'}
            >
              {t.startBtn}
            </ShimmerButton>
          </div>
        </form>
      </div>
    </div>
  );
}
