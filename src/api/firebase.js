import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD1nQbOYMsjE-TvdtNoQYiaFDuIGVYnODg",
  authDomain: "mukam-astrum-dropbox-c587c.firebaseapp.com",
  projectId: "mukam-astrum-dropbox-c587c",
  storageBucket: "mukam-astrum-dropbox-c587c.appspot.com",
  messagingSenderId: "933026160108",
  appId: "1:933026160108:web:92d11aae5ea5f889ed34c9",
  measurementId: "G-HSEE4DS3EN",
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const auth = getAuth();
const storage = getStorage(app);

export { app, firestore, auth, storage };
