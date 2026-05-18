import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, signOut } from '../../firebase';
import { useProfile } from '../../hooks/useProfile';
import { useProgress } from '../../hooks/useProgress';
import { useAppContext } from '../../contexts/AppContext';
import { Loader2 } from 'lucide-react';
import DashboardView from './DashboardView';

interface Props {
  moduleId: string;
}

export default function DashboardContainer({ moduleId }: Props) {
  const navigate = useNavigate();
  
  const { profile, loading: profileLoading, updateProfile } = useProfile(auth.currentUser?.uid);
  const { progress, loading: progressLoading } = useProgress(auth.currentUser?.uid, moduleId);
  const { t, currentCountry, MODULES } = useAppContext();

  // Find module info
  const moduleInfo = Object.values(MODULES).flat().find((m: any) => m.id === moduleId);

  // Profile Edit State
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editName, setEditName] = useState('');
  const [editLevel, setEditLevel] = useState('Beginner');
  const [editReadingLevel, setEditReadingLevel] = useState<'basic'|'standard'|'advanced'>('standard');
  const [editInterests, setEditInterests] = useState<string[]>([]);
  const [interestInput, setInterestInput] = useState('');

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/');
  };

  const openEditModal = () => {
    if (!profile) return;
    setEditName(profile.name);
    // Map legacy levels if necessary
    let initialLevel = profile.level;
    if (initialLevel === 'Beginner') initialLevel = 'elementary';
    if (initialLevel === 'Intermediate') initialLevel = 'middle';
    if (initialLevel === 'Advanced') initialLevel = 'high';
    setEditLevel(initialLevel || 'elementary');
    setEditReadingLevel(profile.readingLevel || 'standard');
    setEditInterests(profile.interests || []);
    setIsEditingProfile(true);
  };

  const handleSaveProfile = async () => {
    if (!editName.trim()) return;
    try {
      await updateProfile({
        name: editName,
        level: editLevel,
        readingLevel: editReadingLevel,
        interests: editInterests,
        updatedAt: new Date().toISOString()
      });
      setIsEditingProfile(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      alert(t.common.error);
    }
  };

  const handleAddInterest = (e?: React.KeyboardEvent | React.MouseEvent) => {
    if (e && 'key' in e && e.key !== 'Enter') return;
    if (e) e.preventDefault();
    
    const trimmed = interestInput.trim();
    if (!trimmed) return;
    if (editInterests.length >= 3) return;
    if (editInterests.includes(trimmed)) {
      setInterestInput('');
      return;
    }
    
    setEditInterests([...editInterests, trimmed]);
    setInterestInput('');
  };

  const removeInterest = (interestToRemove: string) => {
    setEditInterests(editInterests.filter(i => i !== interestToRemove));
  };

  if (profileLoading || progressLoading || !profile || !progress || !moduleInfo) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
        <Loader2 className="animate-spin text-blue-500 mb-4" size={40} />
        <p className="text-slate-500 font-medium animate-pulse">{t.common.loading || 'Loading...'}</p>
      </div>
    );
  }

  return (
    <DashboardView
      moduleId={moduleId}
      profile={profile}
      progress={progress}
      moduleInfo={moduleInfo}
      t={t}
      currentCountry={currentCountry}
      navigate={navigate}
      handleLogout={handleLogout}
      isEditingProfile={isEditingProfile}
      setIsEditingProfile={setIsEditingProfile}
      openEditModal={openEditModal}
      editName={editName}
      setEditName={setEditName}
      editLevel={editLevel}
      setEditLevel={setEditLevel}
      editReadingLevel={editReadingLevel}
      setEditReadingLevel={setEditReadingLevel}
      editInterests={editInterests}
      interestInput={interestInput}
      setInterestInput={setInterestInput}
      handleAddInterest={handleAddInterest}
      removeInterest={removeInterest}
      handleSaveProfile={handleSaveProfile}
    />
  );
}
