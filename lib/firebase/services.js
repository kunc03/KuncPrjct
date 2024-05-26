import { signInWithEmailAndPassword, getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import firebase_app from './init';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';

const auth = getAuth(firebase_app);
const db = getFirestore(firebase_app);

export const signIn = async (email, password) => {
  let result = null,
    error = null;
  try {
    result = await signInWithEmailAndPassword(auth, email, password);
  } catch (e) {
    error = e;
  }

  return { result, error };
};

export const signUp = async (email, password) => {
  let result = null,
    error = null;
  try {
    result = await createUserWithEmailAndPassword(auth, email, password);
  } catch (e) {
    error = e;
  }

  return { result, error };
};

export default async function addData(colllection, id, data) {
  let result = null;
  let error = null;

  try {
    result = await setDoc(doc(db, colllection, id), data, {
      merge: true,
    });
  } catch (e) {
    error = e;
  }

  return { result, error };
}

export const getDocument = async (collection, id) => {
  let docRef = doc(db, collection, id);

  let result = null;
  let error = null;

  try {
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      result = docSnap.data();
    } else {
      throw new Error('Document does not exist');
    }
  } catch (e) {
    error = e;
  }

  return { result, error };
};
