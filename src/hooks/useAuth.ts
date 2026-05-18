import { useState, useEffect } from 'react';
import { auth, onAuthStateChanged, db, doc, getDoc, updateDoc } from '../firebase';
import { useAppContext } from '../contexts/AppContext';

export function useAuth() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [hasProfile, setHasProfile] = useState(false);
  const { setSelectedCountry, setSelectedSchoolLevel } = useAppContext();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const docRef = doc(db, 'users', currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setHasProfile(true);
          // Update country in DB if changed from Login screen, or fetch from DB
          const selectedCountry = localStorage.getItem('selectedCountry');
          const userData = docSnap.data();
          const updates: any = {};
          
          if (selectedCountry && userData.country !== selectedCountry) {
            updates.country = selectedCountry;
          } else if (!selectedCountry && userData.country) {
            setSelectedCountry(userData.country);
          }

          // School Level MUST always sync FROM DB TO Local (Firebase is source of truth)
          const currentLocalLevel = localStorage.getItem('selectedSchoolLevel');
          if (userData.level && userData.level !== currentLocalLevel) {
            setSelectedSchoolLevel(userData.level);
          }

          if (Object.keys(updates).length > 0) {
            try {
              await updateDoc(docRef, updates);
            } catch (error) {
              console.error('Failed to update DB from localStorage:', error);
            }
          }
        } else {
          setHasProfile(false);
        }
      } else {
        setHasProfile(false);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return { user, loading, hasProfile, setHasProfile };
}
