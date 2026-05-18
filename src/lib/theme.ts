// 학교급 내부 키: 'elementary' | 'middle' | 'high'

/** 학교급 내부 키로 간단히 판별 (elementary / middle / high) */
const resolveLevel = (level: string): 'elementary' | 'middle' | 'high' => {
  if (level === 'elementary') return 'elementary';
  if (level === 'high') return 'high';
  return 'middle';
};

export const getLightTheme = (level: string) => {
  const resolved = resolveLevel(level);

  if (resolved === 'elementary') {
    return {
      bg: 'bg-amber-50',
      text: 'text-amber-950',
      primary: 'bg-amber-500 hover:bg-amber-600 text-white',
      primaryText: 'text-amber-600',
      border: 'border-amber-200',
      card: 'bg-white border-amber-100 shadow-amber-100/50',
      font: 'font-sans',
      rounded: 'rounded-3xl',
      badge: 'bg-amber-100 text-amber-800 border-amber-200',
      icon: 'text-amber-500',
    };
  } else if (resolved === 'high') {
    return {
      bg: 'bg-stone-100',
      text: 'text-stone-900',
      primary: 'bg-stone-800 hover:bg-stone-900 text-white',
      primaryText: 'text-stone-800',
      border: 'border-stone-300',
      card: 'bg-white border-stone-200 shadow-stone-200/50',
      font: 'font-serif',
      rounded: 'rounded-md',
      badge: 'bg-stone-200 text-stone-800 border-stone-300',
      icon: 'text-stone-700',
    };
  } else {
    return {
      bg: 'bg-slate-50',
      text: 'text-slate-900',
      primary: 'bg-blue-600 hover:bg-blue-700 text-white',
      primaryText: 'text-blue-600',
      border: 'border-blue-200',
      card: 'bg-white border-slate-200 shadow-blue-100/50',
      font: 'font-sans',
      rounded: 'rounded-2xl',
      badge: 'bg-blue-100 text-blue-700 border-blue-200',
      icon: 'text-blue-500',
    };
  }
};

export const getDarkTheme = (level: string) => {
  const resolved = resolveLevel(level);

  if (resolved === 'elementary') {
    return {
      bg: 'bg-amber-950',
      text: 'text-amber-50',
      primary: 'bg-amber-500 hover:bg-amber-400 text-amber-950',
      primaryText: 'text-amber-400',
      border: 'border-amber-800',
      card: 'bg-amber-900/80 border-amber-800',
      font: 'font-sans',
      rounded: 'rounded-3xl',
      button: 'bg-amber-800/80 hover:bg-amber-700 border-amber-700 hover:border-amber-400',
      accent: 'text-amber-300',
    };
  } else if (resolved === 'high') {
    return {
      bg: 'bg-zinc-950',
      text: 'text-zinc-100',
      primary: 'bg-zinc-100 hover:bg-white text-zinc-900',
      primaryText: 'text-zinc-300',
      border: 'border-zinc-800',
      card: 'bg-zinc-900/90 border-zinc-800',
      font: 'font-serif',
      rounded: 'rounded-md',
      button: 'bg-zinc-800/80 hover:bg-zinc-700 border-zinc-700 hover:border-zinc-400',
      accent: 'text-zinc-400',
    };
  } else {
    return {
      bg: 'bg-slate-900',
      text: 'text-slate-100',
      primary: 'bg-blue-600 hover:bg-blue-500 text-white',
      primaryText: 'text-blue-400',
      border: 'border-slate-700',
      card: 'bg-slate-800/90 border-slate-700',
      font: 'font-sans',
      rounded: 'rounded-2xl',
      button: 'bg-slate-700/80 hover:bg-blue-600/90 border-slate-600 hover:border-blue-400',
      accent: 'text-blue-400',
    };
  }
};
