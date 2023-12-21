import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import firebase from "firebase/compat/app";
import "firebase/compat/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAm51nnd_-xog31y0pmh4jXtqB23wA97GA",
  authDomain: "insta2-1b6a8.firebaseapp.com",
  projectId: "insta2-1b6a8",
  storageBucket: "insta2-1b6a8.appspot.com",
  messagingSenderId: "1061810403044",
  appId: "1:1061810403044:web:98776ba4b3c8d4e0981ef1",
  measurementId: "G-M4972ZB2BG"
};

firebase.initializeApp(firebaseConfig);

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = firebase.storage();
export const db = getFirestore()
