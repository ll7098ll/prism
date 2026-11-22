import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc as originalGetDoc, setDoc as originalSetDoc, updateDoc as originalUpdateDoc, onSnapshot, collection, query, where, getDocs as originalGetDocs, DocumentReference, DocumentData, SetOptions, UpdateData, CollectionReference, Query } from 'firebase/firestore';
const env = (import.meta as any).env;
const firebaseConfig = {
  apiKey: env.VITE_FIREBASE_API_KEY,
  authDomain: env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: env.VITE_FIREBASE_APP_ID,
  measurementId: env.VITE_FIREBASE_MEASUREMENT_ID,
  firestoreDatabaseId: env.VITE_FIREBASE_FIRESTORE_DATABASE_ID,
};

const app = initializeApp(firebaseConfig);
export const db = firebaseConfig.firestoreDatabaseId && firebaseConfig.firestoreDatabaseId !== '(default)'
  ? getFirestore(app, firebaseConfig.firestoreDatabaseId)
  : getFirestore(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  }
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData?.map(provider => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  }
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// Wrappers
export const setDoc = async <T extends DocumentData>(reference: DocumentReference<T>, data: Partial<T> | T, options?: SetOptions) => {
  try {
    return options ? await originalSetDoc(reference, data as any, options) : await originalSetDoc(reference, data as T);
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, reference.path);
  }
};

export const updateDoc = async <T extends DocumentData>(reference: DocumentReference<T>, data: UpdateData<T>) => {
  try {
    return await originalUpdateDoc(reference, data);
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, reference.path);
  }
};

export const getDoc = async <T extends DocumentData>(reference: DocumentReference<T>) => {
  try {
    return await originalGetDoc(reference);
  } catch (error) {
    handleFirestoreError(error, OperationType.GET, reference.path);
    throw error;
  }
};

export const getDocs = async <T extends DocumentData>(query: Query<T>) => {
  try {
    return await originalGetDocs(query);
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, null);
    throw error;
  }
};

export { signInWithPopup, signOut, onAuthStateChanged, doc, onSnapshot, collection, query, where };
