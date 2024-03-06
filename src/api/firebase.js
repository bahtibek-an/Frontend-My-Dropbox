

import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

//  Update the config
const firebaseConfig = {
  apiKey: "AIzaSyDt1ILEden3HN0TO6U-EACB-ioWIPUKgxM",
  authDomain: "denislamklimov-dropbox.firebaseapp.com",
  projectId: "denislamklimov-dropbox",
  storageBucket: "denislamklimov-dropbox.appspot.com",
  messagingSenderId: "392302206633",
  appId: "1:392302206633:web:90485529e533f8ccc853b8"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const auth = getAuth();
const storage = getStorage(app);

export { app, firestore, auth, storage };
