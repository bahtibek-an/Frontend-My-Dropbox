import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, collection } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBfNCiQaX1YHVPEErqx01Kc0C-HEyv4mRw",
  authDomain: "helpdropbo.firebaseapp.com",
  projectId: "helpdropbo",
  storageBucket: "helpdropbo.appspot.com",
  messagingSenderId: "1069577604515",
  appId: "1:1069577604515:web:33c34dfff411fc73071e16",
  measurementId: "G-64VENJ5EXM"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();
const usersCollection = collection(db, 'users');
const signOut = () => auth.signOut();
const storage = getStorage(app);

export { auth, db, googleProvider, usersCollection, signOut, storage };
