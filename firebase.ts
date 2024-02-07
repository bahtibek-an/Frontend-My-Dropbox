
import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";



// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyArfviyx1EWJBUQr5kyM1CPzNkayWoBBE0",
  authDomain: "dropbox-clone-b3415.firebaseapp.com",
  projectId: "dropbox-clone-b3415",
  storageBucket: "dropbox-clone-b3415.appspot.com",
  messagingSenderId: "82011010939",
  appId: "1:82011010939:web:a2055fef863583e5efefde"
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app)
const storage = getStorage(app)

export { db, storage };