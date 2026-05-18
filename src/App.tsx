/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import Login from './components/Login';
import ProfileSetup from './components/ProfileSetup';
import SubjectSelection from './components/SubjectSelection';
import ModuleSelection from './components/ModuleSelection';
import Dashboard from './components/Dashboard';
import Vocabulary from './components/Vocabulary';
import StoryMode from './components/StoryMode';
import Evaluation from './components/Evaluation';
import Achievements from './components/Achievements';
import About from './components/About';
import { useAuth } from './hooks/useAuth';
import { useAppContext } from './contexts/AppContext';

export default function App() {
  const { user, loading, hasProfile, setHasProfile } = useAuth();
  const { selectedCountry } = useAppContext();

  if (loading) {
    const loadingText = {
      kr: '로딩 중...',
      us: 'Loading...',
      jp: '読み込み中...',
      cn: '加载中...',
      gb: 'Loading...',
      fr: 'Chargement...',
      it: 'Caricamento...',
      de: 'Laden...'
    }[selectedCountry] || 'Loading...';
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 text-slate-900 border-2">
        <Loader2 className="animate-spin text-blue-500 mb-4" size={40} />
        <p className="text-slate-500 font-medium animate-pulse">{loadingText}</p>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={!user ? <Login /> : hasProfile ? <Navigate to="/subjects" /> : <Navigate to="/setup" />} />
        <Route path="/setup" element={user && !hasProfile ? <ProfileSetup onComplete={() => setHasProfile(true)} /> : <Navigate to="/" />} />
        <Route path="/profile" element={user && hasProfile ? <ProfileSetup onComplete={() => setHasProfile(true)} /> : <Navigate to="/" />} />
        <Route path="/subjects" element={user && hasProfile ? <SubjectSelection /> : <Navigate to="/" />} />
        <Route path="/subjects/:subjectId" element={user && hasProfile ? <ModuleSelection /> : <Navigate to="/" />} />
        <Route path="/modules/:moduleId/dashboard" element={user && hasProfile ? <Dashboard /> : <Navigate to="/" />} />
        <Route path="/modules/:moduleId/vocabulary" element={user && hasProfile ? <Vocabulary /> : <Navigate to="/" />} />
        <Route path="/modules/:moduleId/story" element={user && hasProfile ? <StoryMode /> : <Navigate to="/" />} />
        <Route path="/modules/:moduleId/evaluation" element={user && hasProfile ? <Evaluation /> : <Navigate to="/" />} />
        <Route path="/achievements" element={user && hasProfile ? <Achievements /> : <Navigate to="/" />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}
