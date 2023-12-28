import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyDKkAWUN_fZLlw3lN39BeuZSpua0SHTXdw",
  authDomain: "z-dropbox.firebaseapp.com",
  projectId: "z-dropbox",
  storageBucket: "z-dropbox.appspot.com",
  messagingSenderId: "925047308699",
  appId: "1:925047308699:web:05750b4a4cc6113dc6e13e",
  measurementId: "G-5K6LV0238T"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const storage = getStorage(app)