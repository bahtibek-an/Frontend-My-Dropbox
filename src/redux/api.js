/** @format */

import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics, logEvent, isSupported } from "firebase/analytics";
import { getStorage } from "firebase/storage";

//  Update the config
const firebaseConfig = {
  apiKey: "AIzaSyAYSG7HDLiwWx_i9-MggZjl9MehSHPyuWE",
  authDomain: "dropbox-5d3dd.firebaseapp.com",
  projectId: "dropbox-5d3dd",
  storageBucket: "dropbox-5d3dd.appspot.com",
  messagingSenderId: "381859775836",
  appId: "1:381859775836:web:1ad19edb92a3bef3962d99",
  measurementId: "G-J1L2B8WEHL"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const auth = getAuth();
const storage = getStorage(app);

export { app, firestore, auth, storage };