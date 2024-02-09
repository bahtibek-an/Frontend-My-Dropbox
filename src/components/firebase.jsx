// firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyCQSqZMB1B5-k4T88xSjXegXGO2WRGUq-k",
    authDomain: "eighth-pursuit-412817.firebaseapp.com",
    databaseURL: "https://eighth-pursuit-412817-default-rtdb.firebaseio.com",
    projectId: "eighth-pursuit-412817",
    storageBucket: "eighth-pursuit-412817.appspot.com",
    messagingSenderId: "327619661891",
    appId: "1:327619661891:web:8302b7d1a44eacc53884f6",
    measurementId: "G-7702J2BEX2"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore();
const storage = getStorage();

export { app, auth, db, storage };
