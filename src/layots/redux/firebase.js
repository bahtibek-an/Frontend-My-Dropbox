
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics, logEvent, isSupported } from "firebase/analytics";
import { getStorage } from "firebase/storage";

//  Update the config
const firebaseConfig = {
    apiKey: "AIzaSyDOVNV3cXgtS6koRmuZkTT4XAYcSLXukH8",
    authDomain: "dropbox-akrom.firebaseapp.com",
    projectId: "dropbox-akrom",
    storageBucket: "dropbox-akrom.appspot.com",
    messagingSenderId: "549273924878",
    appId: "1:549273924878:web:5c0d5f75b1d6fc7403535f",
    measurementId: "G-J9290K8K3V"   
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const auth = getAuth();
const storage = getStorage(app)


export { app, firestore, auth, storage };

