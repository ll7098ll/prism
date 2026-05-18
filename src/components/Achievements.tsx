import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db, doc, getDoc, collection, query, where, getDocs } from '../firebase';
import { ArrowLeft, Trophy, Lock, Star, Award, Loader2 } from 'lucide-react';
import { Particles } from '../../components/ui/particles';
import { BorderBeam } from '../../components/ui/border-beam';
import { useAppContext } from '../contexts/AppContext';

export default function Achievements() {
  const navigate = useNavigate();
  const [unlockedAchievements, setUnlockedAchievements] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const { t: fullT, currentCountry, curriculum } = useAppContext();
  const t = fullT;
  const tAchieve = t.achievements;

  useEffect(() => {
    if (!auth.currentUser) return;
    const fetchProgress = async () => {
      try {
        const q = query(collection(db, 'progress'), where('userId', '==', auth.currentUser!.uid));
        const querySnapshot = await getDocs(q);
        let allUnlocked: string[] = [];
        querySnapshot.forEach((docSnap) => {
          const data = docSnap.data();
          if (data.achievements && Array.isArray(data.achievements)) {
            allUnlocked = [...allUnlocked, ...data.achievements];
          }
        });
        setUnlockedAchievements(Array.from(new Set(allUnlocked)));
      } catch (error) {
        console.error('Error fetching progress:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProgress();
  }, []);

  // Gather all achievements from all modules
  const allAchievements: any[] = [];
  Object.values(curriculum.MODULES).forEach((modules: any) => {
    modules.forEach((module: any) => {
      if (module.achievements) {
        module.achievements.forEach((ach: any) => {
          allAchievements.push({
            ...ach,
            moduleTitle: module.title
          });
        });
      }
    });
  });

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
        <Loader2 className="animate-spin text-blue-500 mb-4" size={40} />
        <p className="text-slate-500 font-medium animate-pulse">{t.common.loading || 'Loading...'}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20 relative overflow-hidden">
      <Particles className="absolute inset-0 z-0" quantity={50} ease={80} color="#94a3b8" refresh />
      
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-200 px-6 py-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
            <ArrowLeft size={20} className="text-slate-600" />
          </button>
          <div className="flex items-center gap-2">
            <span className="text-2xl">{currentCountry.flag}</span>
            <Trophy className="text-yellow-500" size={24} />
            <h1 className="text-xl font-extrabold tracking-tight text-slate-800">
              {tAchieve.title}
            </h1>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-8 relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-yellow-100 text-yellow-600 rounded-full mb-4 shadow-lg border-4 border-white">
            <Award size={40} />
          </div>
          <h2 className="text-3xl font-extrabold text-slate-800 mb-2">{tAchieve.title}</h2>
          <p className="text-slate-500">{tAchieve.subtitle}</p>
        </div>

        {allAchievements.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl shadow-sm border border-slate-200">
            <p className="text-slate-500 font-medium">{tAchieve.noAchievements}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allAchievements.map((ach, idx) => {
              const isUnlocked = unlockedAchievements.includes(ach.id);
              return (
                <div 
                  key={`${ach.id}-${idx}`} 
                  className={`relative p-6 rounded-2xl border-2 transition-all duration-300 ${
                    isUnlocked 
                      ? `bg-white border-yellow-200 shadow-md hover:shadow-lg hover:-translate-y-1` 
                      : `bg-slate-50 border-slate-200 opacity-70 grayscale`
                  }`}
                >
                  {isUnlocked && <BorderBeam size={100} duration={10} delay={0} className="opacity-30" />}
                  <div className="flex items-start gap-4 relative z-10">
                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center shrink-0 shadow-inner ${isUnlocked ? ach.bg : 'bg-slate-200'}`}>
                      {isUnlocked ? (
                        <Star className={ach.color} size={28} fill="currentColor" />
                      ) : (
                        <Lock className="text-slate-400" size={28} />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className={`font-extrabold text-lg ${isUnlocked ? 'text-slate-800' : 'text-slate-500'}`}>
                          {ach.name}
                        </h3>
                      </div>
                      <p className="text-sm font-medium text-slate-500 mb-2">{ach.desc}</p>
                      <div className="inline-flex items-center px-2 py-1 rounded-md bg-slate-100 text-xs font-bold text-slate-500">
                        {ach.moduleTitle}
                      </div>
                    </div>
                  </div>
                  <div className="absolute top-4 right-4">
                    {isUnlocked ? (
                      <span className="text-xs font-bold text-yellow-600 bg-yellow-100 px-2 py-1 rounded-full">
                        {tAchieve.unlocked}
                      </span>
                    ) : (
                      <span className="text-xs font-bold text-slate-500 bg-slate-200 px-2 py-1 rounded-full">
                        {tAchieve.locked}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
