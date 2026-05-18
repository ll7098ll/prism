import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Globe, Atom, Landmark, LogOut, User, Info } from 'lucide-react';
import { auth, signOut } from '../firebase';
import { RetroGrid } from '../../components/ui/retro-grid';
import { useAppContext } from '../contexts/AppContext';

const iconMap: Record<string, React.ElementType> = {
  Globe,
  Atom,
  Landmark
};

const colorMap: Record<string, { bg: string, text: string, border: string, hover: string }> = {
  blue: { bg: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-200', hover: 'hover:border-blue-400 hover:shadow-blue-100' },
  emerald: { bg: 'bg-emerald-50', text: 'text-emerald-600', border: 'border-emerald-200', hover: 'hover:border-emerald-400 hover:shadow-emerald-100' },
  amber: { bg: 'bg-amber-50', text: 'text-amber-600', border: 'border-amber-200', hover: 'hover:border-amber-400 hover:shadow-amber-100' }
};

export default function SubjectSelection() {
  const navigate = useNavigate();
  const { t, currentCountry, curriculum } = useAppContext();
  const SUBJECTS = curriculum.SUBJECTS;

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 relative overflow-hidden flex flex-col">
      <div className="fixed inset-0 z-0 pointer-events-none opacity-40">
        <RetroGrid />
      </div>

      <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-10 border-b border-slate-200/50">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="font-extrabold text-xl tracking-tight flex items-center gap-2">
            <span className="text-2xl">{currentCountry.flag}</span>
            {t.common.title || 'Interactive Textbook'}
          </h1>
          <div className="flex items-center gap-3">
            <button onClick={() => navigate('/about')} className="text-slate-500 hover:text-indigo-600 p-2 rounded-xl hover:bg-indigo-50 transition-all" title="About PRISM">
              <Info size={20} />
            </button>
            <button onClick={() => navigate('/profile')} className="text-slate-500 hover:text-blue-600 p-2 rounded-xl hover:bg-blue-50 transition-all" title="내 프로필 확인/수정">
              <User size={20} />
            </button>
            <button onClick={handleLogout} className="text-slate-500 hover:text-red-600 p-2 rounded-xl hover:bg-red-50 transition-all" title="로그아웃">
              <LogOut size={20} />
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-5xl mx-auto px-4 py-12 w-full relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold mb-4 tracking-tight">{t.common.subjectTitle || 'Which subject would you like to learn?'}</h2>
          <p className="text-slate-500 font-medium">{t.common.subjectSubtitle || 'Choose a subject and start your exciting adventure.'}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SUBJECTS.map((subject: any) => {
            const Icon = iconMap[subject.icon] || Globe;
            const colors = colorMap[subject.colorTheme] || colorMap.blue;

            return (
              <button
                key={subject.id}
                onClick={() => navigate(`/subjects/${subject.id}`)}
                className={`flex flex-col items-center text-center p-8 rounded-3xl bg-white border-2 transition-all duration-300 shadow-sm hover:-translate-y-2 hover:shadow-xl ${colors.border} ${colors.hover}`}
              >
                <div className={`w-20 h-20 rounded-2xl flex items-center justify-center mb-6 shadow-inner ${colors.bg} ${colors.text}`}>
                  <Icon size={40} />
                </div>
                <h3 className="text-2xl font-bold mb-3">
                  <span className="mr-2">{currentCountry.flag}</span>
                  {subject.title}
                </h3>
                <p className="text-slate-500 font-medium text-sm leading-relaxed">
                  {subject.description}
                </p>
              </button>
            );
          })}
        </div>
      </main>
    </div>
  );
}
