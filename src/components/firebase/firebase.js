// firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDnRFhZlbzUtNSYGfFfMmB9J6oTeQh9qYQ",
  authDomain: "dropboxxx-d617d.firebaseapp.com",
  projectId: "dropboxxx-d617d",
  storageBucket: "dropboxxx-d617d.appspot.com",
  messagingSenderId: "143632742651",
  appId: "1:143632742651:web:515348c5d07ad83455985e",
  measurementId: "G-33NZT9QYY6"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore();
const storage = getStorage();

export { app, auth, db, storage };
