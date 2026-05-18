import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc as originalGetDoc, setDoc as originalSetDoc, updateDoc as originalUpdateDoc, onSnapshot, collection, query, where, getDocs as originalGetDocs, DocumentReference, DocumentData, SetOptions, UpdateData, CollectionReference, Query } from 'firebase/firestore';
import firebaseConfig from '../firebase-applet-config.json';

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
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
