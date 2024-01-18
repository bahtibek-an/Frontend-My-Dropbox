import { initializeApp, getApp, getApps } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyCeYXqji7Ie7CegYCOrChpycVxULvb3nHk",
  authDomain: "dropbox-clone-912ff.firebaseapp.com",
  projectId: "dropbox-clone-912ff",
  storageBucket: "dropbox-clone-912ff.appspot.com",
  messagingSenderId: "855042387824",
  appId: "1:855042387824:web:2ce22e6517a6d4240629b5",
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };
