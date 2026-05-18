import React, { useState } from 'react';
import { auth, googleProvider, signInWithPopup } from '../firebase';
import { BookOpen, Loader2, Globe, Sparkles, Brain, Trophy } from 'lucide-react';
import { COUNTRIES } from '../lib/i18n';
import { useAppContext } from '../contexts/AppContext';
import { Particles } from '../../components/ui/particles';

const TRANSLATIONS: Record<string, any> = {
  kr: {
    title: '인터랙티브 교과서',
    subtitle: '사회, 과학, 역사를 인터랙티브 스토리로 배워보세요!',
    selectLanguage: '국가 및 언어 선택',
    loginButton: 'Google로 시작하기',
    loggingIn: '로그인 중...',
    loginFailed: '로그인에 실패했습니다. 다시 시도해주세요.'
  },
  us: {
    title: 'Interactive Textbook',
    subtitle: 'Learn Social Studies, Science, and History through interactive stories!',
    selectLanguage: 'Select Country & Language',
    loginButton: 'Continue with Google',
    loggingIn: 'Logging in...',
    loginFailed: 'Login failed. Please try again.'
  },
  jp: {
    title: 'インタラクティブ教科書',
    subtitle: '社会、科学、歴史をインタラクティブなストーリーで学ぼう！',
    selectLanguage: '国と地域の選択',
    loginButton: 'Googleでログイン',
    loggingIn: 'ログイン中...',
    loginFailed: 'ログインに失敗しました。もう一度お試しください。'
  },
  cn: {
    title: '互动教科书',
    subtitle: '通过互动故事学习社会、科学和历史！',
    selectLanguage: '选择国家和语言',
    loginButton: '使用 Google 登录',
    loggingIn: '登录中...',
    loginFailed: '登录失败，请重试。'
  },
  gb: {
    title: 'Interactive Textbook',
    subtitle: 'Learn Social Studies, Science, and History through interactive stories!',
    selectLanguage: 'Select Country & Language',
    loginButton: 'Continue with Google',
    loggingIn: 'Logging in...',
    loginFailed: 'Login failed. Please try again.'
  },
  fr: {
    title: 'Manuel Interactif',
    subtitle: 'Apprenez les sciences sociales, les sciences et l\'histoire à travers des histoires interactives !',
    selectLanguage: 'Sélectionnez le pays et la langue',
    loginButton: 'Continuer avec Google',
    loggingIn: 'Connexion en cours...',
    loginFailed: 'Échec de la connexion. Veuillez réessayer.'
  },
  it: {
    title: 'Libro di Testo Interattivo',
    subtitle: 'Impara studi sociali, scienze e storia attraverso storie interattive!',
    selectLanguage: 'Seleziona paese e lingua',
    loginButton: 'Continua con Google',
    loggingIn: 'Accesso in corso...',
    loginFailed: 'Accesso fallito. Riprova.'
  },
  de: {
    title: 'Interaktives Lehrbuch',
    subtitle: 'Lerne Sozialkunde, Naturwissenschaften und Geschichte durch interaktive Geschichten!',
    selectLanguage: 'Land und Sprache auswählen',
    loginButton: 'Weiter mit Google',
    loggingIn: 'Anmeldung läuft...',
    loginFailed: 'Anmeldung fehlgeschlagen. Bitte versuche es erneut.'
  }
};

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const { selectedCountry, setSelectedCountry } = useAppContext();

  const handleCountrySelect = (id: string) => {
    setSelectedCountry(id);
  };

  const t = TRANSLATIONS[selectedCountry] || TRANSLATIONS['kr'];

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
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 text-slate-900 p-4 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <Particles
          className="absolute inset-0"
          quantity={80}
          ease={80}
          color="#3b82f6"
          refresh
        />
      </div>

      <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-white/90 backdrop-blur-xl rounded-[2rem] shadow-2xl overflow-hidden border border-white/50 relative z-10 transition-all duration-500">
        
        {/* Hero Section */}
        <div className="p-10 md:p-12 md:pr-0 flex flex-col justify-center h-full text-slate-800">
          <div className="w-16 h-16 bg-blue-600 text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-blue-500/30 transform -rotate-6 transition-transform hover:rotate-0 duration-300">
            <BookOpen size={32} />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight leading-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              {t.title}
            </span>
          </h1>
          <p className="text-lg text-slate-500 mb-8 font-medium leading-relaxed">
            {t.subtitle}
          </p>
          
          {/* Feature Highlights */}
          <div className="space-y-5">
            <div className="flex items-center gap-4 text-slate-700 bg-white/50 p-3 rounded-2xl border border-slate-100 hover:bg-slate-50 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 shadow-sm">
                <Sparkles size={20} />
              </div>
              <span className="font-bold">{selectedCountry === 'kr' ? 'AI 맞춤형 스토리텔링' : 'AI-tailored Storytelling'}</span>
            </div>
            <div className="flex items-center gap-4 text-slate-700 bg-white/50 p-3 rounded-2xl border border-slate-100 hover:bg-slate-50 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600 shadow-sm">
                <Brain size={20} />
              </div>
              <span className="font-bold">{selectedCountry === 'kr' ? '스마트 어휘 및 평가' : 'Smart Vocabulary & Assessment'}</span>
            </div>
            <div className="flex items-center gap-4 text-slate-700 bg-white/50 p-3 rounded-2xl border border-slate-100 hover:bg-slate-50 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center text-amber-600 shadow-sm">
                <Trophy size={20} />
              </div>
              <span className="font-bold">{selectedCountry === 'kr' ? '게이미피케이션 학습' : 'Gamified Learning Experience'}</span>
            </div>
          </div>
        </div>

        {/* Login Panel */}
        <div className="p-10 md:p-12 relative flex flex-col justify-center h-full">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-blue-50/50 -z-10 rounded-l-[3rem] hidden md:block border-l border-white"></div>
          
          <div className="mb-8">
            <label className="flex items-center gap-2 text-sm font-extrabold text-slate-500 mb-4 uppercase tracking-wider">
              <Globe size={18} className="text-blue-500" /> {t.selectLanguage}
            </label>
            <div className="grid grid-cols-2 gap-3">
              {COUNTRIES.map(country => (
                <button
                  key={country.id}
                  onClick={() => handleCountrySelect(country.id)}
                  className={`flex flex-col items-center justify-center gap-1 px-2 py-4 rounded-2xl border-2 transition-all duration-300 ${
                    selectedCountry === country.id 
                      ? 'border-blue-500 bg-blue-50 shadow-md shadow-blue-100 transform scale-[1.02] z-10' 
                      : 'border-slate-100 bg-white hover:border-blue-200 text-slate-600 hover:bg-slate-50 hover:scale-[1.01]'
                  }`}
                >
                  <span className="text-3xl drop-shadow-sm mb-1">{country.flag}</span>
                  <span className={`text-xs font-bold ${selectedCountry === country.id ? 'text-blue-700' : 'text-slate-500'}`}>{country.name}</span>
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleLogin}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-3 bg-white border-2 border-slate-200 hover:border-blue-400 hover:bg-blue-50 disabled:bg-slate-100 disabled:text-slate-400 disabled:border-slate-200 disabled:cursor-not-allowed text-slate-700 font-extrabold text-lg py-5 px-6 rounded-2xl transition-all shadow-sm hover:shadow-md active:scale-[0.98] group mt-auto"
          >
            {isLoading ? (
              <Loader2 className="animate-spin w-6 h-6 text-blue-600" />
            ) : (
              <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-6 h-6 transform group-hover:scale-110 transition-transform" />
            )}
            <span>
              {isLoading ? t.loggingIn : t.loginButton}
            </span>
          </button>
          
          <p className="text-center text-xs text-slate-400 font-medium mt-6">
            By signing in, you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
}
