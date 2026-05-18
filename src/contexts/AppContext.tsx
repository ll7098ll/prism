import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useTranslation, COUNTRIES } from '../lib/i18n';
import { getCurriculum, SchoolLevel, SCHOOL_LEVEL_KEYS } from '../lib/mockData';

interface AppContextType {
  selectedCountry: string;
  setSelectedCountry: (country: string) => void;
  selectedSchoolLevel: SchoolLevel;
  setSelectedSchoolLevel: (level: SchoolLevel) => void;
  t: any;
  currentCountry: any;
  curriculum: any;
  MODULES: any;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [selectedCountry, setSelectedCountryState] = useState(() => {
    return localStorage.getItem('selectedCountry') || 'kr';
  });

  const [selectedSchoolLevel, setSelectedSchoolLevelState] = useState<SchoolLevel>(() => {
    return (localStorage.getItem('selectedSchoolLevel') as SchoolLevel) || 'elementary';
  });

  const setSelectedCountry = (country: string) => {
    localStorage.setItem('selectedCountry', country);
    setSelectedCountryState(country);
  };

  const setSelectedSchoolLevel = (level: SchoolLevel) => {
    localStorage.setItem('selectedSchoolLevel', level);
    setSelectedSchoolLevelState(level);
  };

  const t = useTranslation(selectedCountry);
  const currentCountry = COUNTRIES.find(c => c.id === selectedCountry) || COUNTRIES[0];
  const curriculum = getCurriculum(selectedCountry, selectedSchoolLevel);
  const MODULES = curriculum.MODULES;

  return (
    <AppContext.Provider value={{ selectedCountry, setSelectedCountry, selectedSchoolLevel, setSelectedSchoolLevel, t, currentCountry, curriculum, MODULES }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}
