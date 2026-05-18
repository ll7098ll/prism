import { useState, useEffect } from 'react';
import { db, doc, onSnapshot, setDoc, getDoc } from '../firebase';

export function useProgress(uid: string | undefined, moduleId: string | undefined) {
  const [progress, setProgress] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!uid || !moduleId) {
      setProgress(null);
      setLoading(false);
      return;
    }

    const progressId = `${uid}_${moduleId}`;
    const pRef = doc(db, 'progress', progressId);

    let unsub: () => void;

    const initProgress = async () => {
      try {
        const pSnap = await getDoc(pRef);
        if (!pSnap.exists()) {
          await setDoc(pRef, {
            userId: uid,
            moduleId: moduleId,
            vocabCompleted: false,
            storyProgress: 0,
            quizScores: [],
            achievements: [],
            storyLogs: [],
            updatedAt: new Date().toISOString()
          });
        }
      } catch (error) {
        console.error('Error initializing progress:', error);
      } finally {
        unsub = onSnapshot(pRef, (docSnap) => {
          if (docSnap.exists()) {
            setProgress(docSnap.data());
          }
          setLoading(false);
        });
      }
    };

    initProgress();

    return () => {
      if (unsub) unsub();
    };
  }, [uid, moduleId]);

  return { progress, loading };
}
