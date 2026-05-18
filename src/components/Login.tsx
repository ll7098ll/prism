import React, { useState } from 'react';
import { auth, googleProvider, signInWithPopup } from '../firebase';
import { BookOpen, Sparkles, Brain, Trophy, ArrowRight, Layers, Globe, ChevronRight, Loader2 } from 'lucide-react';
import { COUNTRIES } from '../lib/i18n';
import { useAppContext } from '../contexts/AppContext';
import { Particles } from '../../components/ui/particles';
import { RetroGrid } from '../../components/ui/retro-grid';
import { ShimmerButton } from '../../components/ui/shimmer-button';
import { BorderBeam } from '../../components/ui/border-beam';
import { motion } from 'motion/react';

const enDict = {
  heroTitle1: 'The Most Immersive',
  heroTitle2: 'AI Interactive Textbook',
  heroSub: 'Experience Social Studies, Science, and History as living stories, not just text. Your decisions shape the narrative.',
  loginButton: 'Get Started with Google',
  loginNav: 'Login',
  loggingIn: 'Logging in...',
  loginFailed: 'Login failed. Please try again.',
  featuresTitle: 'Shifting the Paradigm of Learning',
  f1Title: 'AI-Tailored Storytelling',
  f1Desc: 'Gemini AI generates unique stories and vivid background illustrations in real-time, matching your interests and age.',
  f2Title: 'Global Curriculum & Multilingual',
  f2Desc: 'Fully supports standard curricula from 8 countries. Build global competitiveness with the language and content of your choice.',
  f3Title: 'Choice-based Consequence',
  f3Desc: 'Go beyond multiple-choice questions. The decisions you make will change the fate of a village or the trajectory of a spaceship.',
  f4Title: 'Gamification & Rewards',
  f4Desc: 'Stay motivated with a rich system of badges and titles awarded for completing modules and mastering challenges.',
  ctaTitle: 'Step into the World of PRISM Today',
};

const krDict = {
  ...enDict,
  heroTitle1: '가장 몰입감 넘치는',
  heroTitle2: 'AI 인터랙티브 교과서',
  heroSub: '사회, 과학, 역사를 텍스트가 아닌 살아있는 스토리로 경험하세요. 당신의 결정이 이야기와 학습을 완성합니다.',
  loginButton: 'Google로 시작하기',
  loginNav: '로그인',
  loggingIn: '로그인 중...',
  loginFailed: '로그인에 실패했습니다. 다시 시도해주세요.',
  featuresTitle: '배움의 패러다임을 바꿉니다',
  f1Title: 'AI 맞춤형 스토리텔링',
  f1Desc: '제미나이(Gemini) AI가 학습자의 관심사와 연령에 맞춰 매번 새로운 스토리와 배경 일러스트를 실시간으로 생성합니다.',
  f2Title: '글로벌 커리큘럼 & 다국어',
  f2Desc: '전 세계 8개국 표준 교육과정을 완벽하게 지원합니다. 원하는 국가의 언어와 내용으로 글로벌 경쟁력을 키우세요.',
  f3Title: '선택 기반 인과관계 로직',
  f3Desc: '단순한 객관식 문제를 넘어섭니다. 당신이 내린 결정이 마을의 운명과 우주선의 궤도를 바꿉니다.',
  f4Title: '게이미피케이션 기반 보상',
  f4Desc: '단원을 완수할 때마다 부여되는 다양한 배지와 칭호 시스템으로 끊임없는 학습 동기를 부여합니다.',
  ctaTitle: '지금 바로 프리즘의 세계로 들어오세요',
};

const TRANSLATIONS: Record<string, typeof enDict> = {
  kr: krDict,
  us: enDict,
  gb: enDict,
  jp: { ...enDict, loginButton: 'Googleでログイン', loginNav: 'ログイン', loggingIn: 'ログイン中...', loginFailed: 'ログインに失敗しました。もう一度お試しください。' },
  cn: { ...enDict, loginButton: '使用 Google 登录', loginNav: '登录', loggingIn: '登录中...', loginFailed: '登录失败，请重试。' },
  fr: { ...enDict, loginButton: 'Continuer avec Google', loginNav: 'Connexion', loggingIn: 'Connexion en cours...', loginFailed: 'Échec de la connexion. Veuillez réessayer.' },
  it: { ...enDict, loginButton: 'Continua con Google', loginNav: 'Accedi', loggingIn: 'Accesso in corso...', loginFailed: 'Accesso fallito. Riprova.' },
  de: { ...enDict, loginButton: 'Weiter mit Google', loginNav: 'Anmelden', loggingIn: 'Anmeldung läuft...', loginFailed: 'Anmeldung fehlgeschlagen. Bitte versuche es erneut.' }
};

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const { selectedCountry, setSelectedCountry } = useAppContext();

  const handleCountrySelect = (id: string) => {
    setSelectedCountry(id);
  };

  const t = TRANSLATIONS[selectedCountry] || TRANSLATIONS['us'];

  const handleLogin = async () => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error: any) {
      console.error('Login failed:', error);
      if (error.code !== 'auth/cancelled-popup-request' && error.code !== 'auth/popup-closed-by-user') {
        alert(t.loginFailed);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans overflow-x-hidden selection:bg-blue-200">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-lg border-b border-slate-200/50 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
              <BookOpen size={24} />
            </div>
            <span className="text-xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700 hidden sm:block">PRISM</span>
          </div>
          
          <div className="flex items-center gap-4 sm:gap-6">
            <div className="hidden lg:flex items-center gap-1 bg-slate-100/80 p-1 rounded-full border border-slate-200">
              {COUNTRIES.map(country => (
                <button
                  key={country.id}
                  onClick={() => handleCountrySelect(country.id)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-xl transition-all duration-300 ${selectedCountry === country.id ? 'bg-white shadow-sm ring-1 ring-slate-300 transform scale-110' : 'hover:bg-slate-200/50 opacity-50 hover:opacity-100'}`}
                  title={country.name}
                >
                  {country.flag}
                </button>
              ))}
            </div>

            {/* Mobile language simple selector */}
            <select
              value={selectedCountry}
              onChange={(e) => handleCountrySelect(e.target.value)}
              className="lg:hidden bg-slate-100 border border-slate-200 rounded-full px-3 py-2 text-sm max-w-[120px] focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {COUNTRIES.map(country => (
                <option key={country.id} value={country.id}>{country.flag} {country.name}</option>
              ))}
            </select>

            <button
              onClick={handleLogin}
              disabled={isLoading}
              className="flex items-center gap-2 bg-slate-900 text-white px-5 py-2.5 rounded-full font-bold hover:bg-slate-800 transition-all hover:scale-105 active:scale-95 disabled:opacity-50"
            >
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5 bg-white rounded-full p-0.5" />}
              <span>{isLoading ? t.loggingIn : t.loginNav}</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-[100dvh] pt-32 pb-20 flex flex-col items-center justify-center text-center px-4 overflow-hidden">
        <RetroGrid className="absolute inset-0 z-0 opacity-40" />
        <Particles className="absolute inset-0 z-0" quantity={120} ease={100} color="#3b82f6" refresh />
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 max-w-5xl mx-auto flex flex-col items-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-600 font-semibold text-sm mb-8 shadow-sm">
            <Sparkles size={16} className="animate-pulse" />
            <span>Powered by Gemini 3.1 Pro & 2.5 Flash Image</span>
          </div>
          
          <h1 className="text-5xl sm:text-6xl md:text-8xl font-black mb-6 tracking-tight leading-[1.1]">
            <span className="block text-slate-800 drop-shadow-sm">{t.heroTitle1}</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 drop-shadow-sm">
              {t.heroTitle2}
            </span>
          </h1>
          
          <p className="text-lg sm:text-xl md:text-2xl text-slate-500 mb-12 max-w-3xl font-medium leading-relaxed px-4">
            {t.heroSub}
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <ShimmerButton 
              onClick={handleLogin} 
              className="shadow-2xl shadow-blue-500/20"
              shimmerColor="#ffffff40"
              shimmerSize="0.1em"
            >
              <span className="flex items-center justify-center gap-3 text-white font-bold text-lg px-4 sm:px-6 py-1">
                <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-6 h-6 bg-white rounded-full p-1" />
                {t.loginButton}
              </span>
            </ShimmerButton>
          </div>
        </motion.div>

        {/* Floating 3D mockups */}
        <motion.div 
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="w-full max-w-6xl mx-auto mt-20 sm:mt-32 relative z-10 px-4 sm:px-8"
          style={{ perspective: 1000 }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-transparent to-transparent z-20 h-full w-full pointer-events-none" />
          <div className="relative rounded-t-3xl overflow-hidden shadow-2xl border border-slate-200/60 bg-white transform rotate-x-12 translate-y-8 scale-95 shadow-blue-900/5 group">
            <BorderBeam size={300} duration={12} delay={9} />
            <div className="h-10 bg-slate-100 flex items-center px-4 gap-2 border-b border-slate-200">
              <div className="w-3 h-3 rounded-full bg-red-400"></div>
              <div className="w-3 h-3 rounded-full bg-amber-400"></div>
              <div className="w-3 h-3 rounded-full bg-green-400"></div>
            </div>
            <div className="p-4 sm:p-8 grid grid-cols-1 md:grid-cols-3 gap-6 bg-slate-50/50 pointer-events-none">
                <div className="col-span-2 bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-slate-100 flex flex-col gap-4">
                  <div className="w-full h-40 sm:h-56 bg-slate-200 rounded-xl overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-300 to-indigo-400 opacity-20"></div>
                    <div className="absolute top-4 left-4 right-4 h-24 sm:h-36 bg-white/40 backdrop-blur-sm rounded-lg border border-white/50"></div>
                  </div>
                  <div className="space-y-3">
                    <div className="h-4 bg-slate-100 rounded w-3/4"></div>
                    <div className="h-4 bg-slate-100 rounded w-full"></div>
                    <div className="h-4 bg-slate-100 rounded w-5/6"></div>
                  </div>
                </div>
                <div className="col-span-1 space-y-4 hidden md:block">
                  <div className="h-28 bg-white rounded-2xl shadow-sm border border-slate-100 p-4 shrink-0 flex flex-col justify-center gap-3 cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full shrink-0"></div>
                      <div className="h-3 bg-slate-100 rounded w-1/2"></div>
                    </div>
                    <div className="space-y-1.5 ml-13">
                      <div className="h-2 bg-slate-50 rounded w-full"></div>
                      <div className="h-2 bg-slate-50 rounded w-3/4"></div>
                    </div>
                  </div>
                  <div className="h-28 bg-white rounded-2xl shadow-sm border border-blue-200 ring-2 ring-blue-500/20 p-4 shrink-0 flex flex-col justify-center gap-3 cursor-pointer relative overflow-hidden">
                    <div className="absolute inset-0 bg-blue-50/50"></div>
                    <div className="relative flex items-center gap-3">
                      <div className="w-10 h-10 bg-indigo-100 rounded-full shrink-0"></div>
                      <div className="h-3 bg-blue-200 rounded w-2/3"></div>
                    </div>
                    <div className="relative space-y-1.5 ml-13">
                      <div className="h-2 bg-blue-100 rounded w-full"></div>
                      <div className="h-2 bg-blue-100 rounded w-4/5"></div>
                    </div>
                  </div>
                </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Features Bento Grid */}
      <section className="py-24 px-4 sm:px-6 bg-white relative z-20">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 text-center px-4">
            <h2 className="text-3xl md:text-5xl font-extrabold mb-6 tracking-tight text-slate-900">{t.featuresTitle}</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[auto] md:auto-rows-[340px]">
            {/* Card 1: Large Wide */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
              className="md:col-span-2 relative rounded-3xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 p-8 sm:p-10 overflow-hidden group"
            >
              <div className="absolute top-0 right-0 p-8 opacity-10 transform translate-x-1/4 -translate-y-1/4 group-hover:scale-110 transition-transform duration-700 pointer-events-none">
                <Brain size={280} className="text-blue-600" />
              </div>
              <div className="relative z-10 flex flex-col justify-end h-full md:w-3/4">
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-blue-600 mb-6 shadow-sm border border-slate-100 shrink-0">
                  <Sparkles size={28} />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-slate-800 mb-4">{t.f1Title}</h3>
                <p className="text-slate-600 text-lg leading-relaxed">{t.f1Desc}</p>
              </div>
            </motion.div>

            {/* Card 2: Square */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="md:col-span-1 relative rounded-3xl bg-slate-50 border border-slate-200 p-8 sm:p-10 overflow-hidden group"
            >
              <div className="absolute -top-10 -right-10 p-6 opacity-[0.05] transform group-hover:-rotate-12 transition-transform duration-500 pointer-events-none">
                <Globe size={240} className="text-slate-900" />
              </div>
              <div className="relative z-10 flex flex-col h-full">
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-slate-700 mb-6 shadow-sm border border-slate-100 shrink-0">
                  <Globe size={28} />
                </div>
                <div className="mt-auto">
                  <h3 className="text-2xl font-bold text-slate-800 mb-3">{t.f2Title}</h3>
                  <p className="text-slate-600 leading-relaxed">{t.f2Desc}</p>
                </div>
              </div>
            </motion.div>

            {/* Card 3: Square */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="md:col-span-1 relative rounded-3xl bg-slate-50 border border-slate-200 p-8 sm:p-10 overflow-hidden group"
            >
              <div className="absolute -bottom-10 -right-10 p-8 opacity-[0.05] transform group-hover:scale-110 transition-transform duration-500 pointer-events-none">
                <Layers size={240} className="text-slate-900" />
              </div>
              <div className="relative z-10 flex flex-col h-full">
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-slate-700 mb-6 shadow-sm border border-slate-100 shrink-0">
                  <ArrowRight size={28} />
                </div>
                <div className="mt-auto">
                  <h3 className="text-2xl font-bold text-slate-800 mb-3">{t.f3Title}</h3>
                  <p className="text-slate-600 leading-relaxed">{t.f3Desc}</p>
                </div>
              </div>
            </motion.div>

            {/* Card 4: Large Wide */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="md:col-span-2 relative rounded-3xl bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-100 p-8 sm:p-10 overflow-hidden group"
            >
              <div className="absolute bottom-0 right-0 p-8 opacity-10 transform group-hover:-translate-y-4 transition-transform duration-500 pointer-events-none hidden md:block">
                <Trophy size={240} className="text-amber-500" />
              </div>
              <div className="relative z-10 flex flex-col justify-end h-full md:w-2/3">
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-amber-500 mb-6 shadow-sm border border-slate-100 shrink-0">
                  <Trophy size={28} />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-slate-800 mb-4">{t.f4Title}</h3>
                <p className="text-slate-600 text-lg leading-relaxed">{t.f4Desc}</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 sm:py-32 px-4 sm:px-6 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500 rounded-full blur-[100px]"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-indigo-500 rounded-full blur-[100px]"></div>
        </div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black mb-10 tracking-tight leading-tight">{t.ctaTitle}</h2>
          <div className="flex justify-center">
              <button
                onClick={handleLogin}
                disabled={isLoading}
                className="group relative flex items-center gap-4 bg-white text-slate-900 px-6 sm:px-8 py-4 sm:py-5 rounded-full font-bold text-lg sm:text-xl hover:scale-105 active:scale-95 transition-all shadow-xl shadow-blue-900/20 disabled:opacity-80"
              >
                {isLoading ? <Loader2 className="w-6 h-6 animate-spin text-blue-600" /> : <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-6 h-6" />}
                <span>{isLoading ? t.loggingIn : t.loginButton}</span>
                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors shrink-0">
                  <ChevronRight size={20} />
                </div>
              </button>
          </div>
        </div>
      </section>
    </div>
  );
}

