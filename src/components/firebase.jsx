// firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyDx9Rd6YQMexRd5NvYt4RtL3ckv60thxTU",
    authDomain: "vadet-75909.firebaseapp.com",
    projectId: "vadet-75909",
    storageBucket: "vadet-75909.appspot.com",
    messagingSenderId: "545520986897",
    appId: "1:545520986897:web:e2b9fe4795ddd987a07ab0",
    measurementId: "G-36YW4QTHZL"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore();
const storage = getStorage();

export { app, auth, db, storage };
