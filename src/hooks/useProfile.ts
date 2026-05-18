import { useState, useEffect } from 'react';
import { db, doc, onSnapshot, updateDoc } from '../firebase';

export function useProfile(uid: string | undefined) {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!uid) {
      setProfile(null);
      setLoading(false);
      return;
    }

    const unsub = onSnapshot(doc(db, 'users', uid), (docSnap) => {
      if (docSnap.exists()) {
        setProfile(docSnap.data());
      } else {
        setProfile(null);
      }
      setLoading(false);
    });

    return () => unsub();
  }, [uid]);

  const updateProfile = async (data: any) => {
    if (!uid) return;
    await updateDoc(doc(db, 'users', uid), data);
  };

  return { profile, loading, updateProfile };
}
