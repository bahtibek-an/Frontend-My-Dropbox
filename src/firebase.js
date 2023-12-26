import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
    apiKey: "AIzaSyBVARF4BFLAbAGJVAMutdZbWAYASaThwXE",
    authDomain: "todo-4e37f.firebaseapp.com",
    projectId: "todo-4e37f",
    storageBucket: "todo-4e37f.appspot.com",
    messagingSenderId: "844496081921",
    appId: "1:844496081921:web:a639dacc2726ca3b0c9c00",
    measurementId: "G-227G18JVJ5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const imageDb = getStorage(app)
export const storage = getStorage(app);
export const db = getFirestore(app);