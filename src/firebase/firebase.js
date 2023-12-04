import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDaCR6uHFe50jt0yLCcr-fhb2oV-HD1SCk",
  authDomain: "dropbox-5989a.firebaseapp.com",
  projectId: "dropbox-5989a",
  storageBucket: "dropbox-5989a.appspot.com",
  messagingSenderId: "13582258167",
  appId: "1:13582258167:web:1c3d27e4753aa720d768f2",
  measurementId: "G-C0GMELFS7J"
};

!getApps().length ? initializeApp(firebaseConfig) : getApp();
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);
const provider = new GoogleAuthProvider();
const firestoreCollection = collection(db, "users");

export default db;
export const database = getAuth(app);
export { app, db, auth, storage, provider, firestoreCollection, db as firestore };