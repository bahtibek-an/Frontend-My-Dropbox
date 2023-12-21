/** @format */

import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics, logEvent, isSupported } from "firebase/analytics";
import { getStorage } from "firebase/storage";

//  Update the config
const firebaseConfig = {
  apiKey: "AIzaSyA2Gh7Eal-79jOaadjw-dQV4vgTVkyxBFg",
  authDomain: "second-dropbox.firebaseapp.com",
  projectId: "second-dropbox",
  storageBucket: "second-dropbox.appspot.com",
  messagingSenderId: "880524175614",
  appId: "1:880524175614:web:64ef2f30af4a031216ddaf",
  measurementId: "G-JX6E95J9QD",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const auth = getAuth();
const storage = getStorage(app);

export { app, firestore, auth, storage };
