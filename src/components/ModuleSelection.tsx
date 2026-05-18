import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, BookOpen, ChevronRight } from 'lucide-react';
import { RetroGrid } from '../../components/ui/retro-grid';
import { useAppContext } from '../contexts/AppContext';

export default function ModuleSelection() {
  const { subjectId } = useParams<{ subjectId: string }>();
  const navigate = useNavigate();
  
  const { t: fullT, currentCountry, curriculum, MODULES } = useAppContext();
  const t = fullT.common;
  const SUBJECTS = curriculum.SUBJECTS;

  const subject = SUBJECTS.find((s: any) => s.id === subjectId);
  const modules = subjectId ? MODULES[subjectId as keyof typeof MODULES] || [] : [];

  if (!subject) {
    return <div className="min-h-screen flex items-center justify-center">{t.error || 'Subject not found.'}</div>;
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 relative overflow-hidden flex flex-col">
      <div className="fixed inset-0 z-0 pointer-events-none opacity-40">
        <RetroGrid />
      </div>

      <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-10 border-b border-slate-200/50">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-4">
          <button 
            onClick={() => navigate('/subjects')}
            className="p-2 -ml-2 rounded-xl hover:bg-slate-100 text-slate-500 transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
          <h1 className="font-extrabold text-xl tracking-tight flex items-center gap-2">
            <span className="text-2xl">{currentCountry.flag}</span>
            {subject.title}
          </h1>
        </div>
      </header>

      <main className="flex-1 max-w-4xl mx-auto px-4 py-12 w-full relative z-10">
        <div className="mb-10">
          <h2 className="text-3xl font-extrabold mb-3 tracking-tight">{t.moduleTitle || 'Please select a module to learn'}</h2>
          <p className="text-slate-500 font-medium">{subject.description}</p>
        </div>

        <div className="space-y-4">
          {modules.map((mod: any, index: number) => (
            <button
              key={mod.id}
              onClick={() => navigate(`/modules/${mod.id}/dashboard`)}
              className="w-full flex items-center p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-200 group text-left"
            >
              <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500 mr-5 font-bold text-lg">
                {index + 1}
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-1 group-hover:text-blue-600 transition-colors">
                  <span className="mr-2">{currentCountry.flag}</span>
                  {mod.title}
                </h3>
                <p className="text-slate-500 text-sm font-medium">{mod.description}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                <ChevronRight size={20} />
              </div>
            </button>
          ))}
          
          {modules.length === 0 && (
            <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 border-dashed">
              <BookOpen size={48} className="mx-auto text-slate-300 mb-4" />
              <p className="text-slate-500 font-medium">{t.noModules || 'No modules registered yet.'}</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
