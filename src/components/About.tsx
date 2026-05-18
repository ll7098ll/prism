import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, BookOpen, Code, Heart, Sparkles, Users } from 'lucide-react';
import { RetroGrid } from '../../components/ui/retro-grid';
import { useAppContext } from '../contexts/AppContext';

export default function About() {
  const navigate = useNavigate();
  const { t: fullT, currentCountry } = useAppContext();
  
  // Provide English fallback for languages that might not have 'about' translation yet
  const t = fullT.about || {
    title: 'About PRISM',
    titleDesc: 'Personalized Reading & Interactive Semantic Module',
    missionTitle: 'Our Mission',
    missionDesc: 'PRISM is designed to revolutionize the way students interact with educational content. By leveraging advanced AI, we generate personalized, interactive stories that transform traditional reading into engaging, vocabulary-rich adventures. Our text leveling system ensures that every student, regardless of their school level or reading proficiency, can learn at a pace and complexity that is just right for them.',
    techTitle: 'Technology Stack',
    contributorsTitle: 'Contributors & Special Thanks',
    developerName: 'Byeongmin Lee',
    developerRole: 'Developer & Architect',
    bottomText: 'Made with ❤️ and AI for a better future.'
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 relative overflow-hidden flex flex-col">
      <div className="fixed inset-0 z-0 pointer-events-none opacity-40">
        <RetroGrid />
      </div>

      <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-10 border-b border-slate-200/50">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="p-2 -ml-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors">
            <ArrowLeft size={24} />
          </button>
          <h1 className="font-extrabold text-xl tracking-tight">{t.title}</h1>
        </div>
      </header>

      <main className="flex-1 max-w-3xl mx-auto px-4 py-12 w-full relative z-10 space-y-12">
        <section className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-indigo-100 text-indigo-600 mb-4 shadow-sm border border-indigo-200">
            <Sparkles size={32} />
          </div>
          <h2 className="text-4xl font-black tracking-tight text-slate-900">PRISM</h2>
          <p className="text-lg font-medium text-slate-500">{t.titleDesc}</p>
        </section>

        <section className="space-y-6 bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
          <div className="flex items-center gap-3 text-indigo-600 mb-4">
            <BookOpen size={24} />
            <h3 className="text-2xl font-bold text-slate-900">{t.missionTitle}</h3>
          </div>
          <p className="text-slate-600 leading-relaxed font-medium">
            {t.missionDesc}
          </p>
        </section>

        <section className="space-y-6 bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
          <div className="flex items-center gap-3 text-blue-600 mb-4">
            <Code size={24} />
            <h3 className="text-2xl font-bold text-slate-900">{t.techTitle}</h3>
          </div>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-slate-600 font-medium">
            <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2"></div> Frontend: React, Vite, Tailwind CSS</li>
            <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2"></div> Language: TypeScript</li>
            <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2"></div> Backend & Auth: Firebase (Auth, Firestore)</li>
            <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2"></div> AI Integration: Google Gemini Pro / Flash API</li>
            <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2"></div> UI Effects: shadcn UI / Magic UI</li>
            <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2"></div> Icons: Lucide React</li>
          </ul>
        </section>

        <section className="space-y-6 bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
          <div className="flex items-center gap-3 text-emerald-600 mb-4">
            <Users size={24} />
            <h3 className="text-2xl font-bold text-slate-900">{t.contributorsTitle}</h3>
          </div>
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-emerald-50 border border-emerald-100">
            <div className="w-12 h-12 rounded-full bg-emerald-200 flex items-center justify-center text-emerald-700 font-black text-xl">
              BL
            </div>
            <div>
              <p className="font-bold text-slate-900">
                {currentCountry.id === 'kr' ? '이병민 Byeongmin Lee' : t.developerName}
              </p>
              <p className="text-sm font-medium text-emerald-700">{t.developerRole}</p>
              <p className="text-sm text-slate-500">ll7098ll@gmail.com</p>
            </div>
          </div>
          <p className="text-slate-400 text-sm mt-8 text-center pb-2 font-medium">
            {currentCountry.id === 'kr' ? (
              <>{t.bottomText}</>
            ) : (
              <>Made with <Heart size={14} className="inline text-red-500 mx-1 fill-current" /> and AI for a better future.</>
            )}
          </p>
        </section>
      </main>
    </div>
  );
}
