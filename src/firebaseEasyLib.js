import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
	apiKey: "AIzaSyDt1ILEden3HN0TO6U-EACB-ioWIPUKgxM",
	authDomain: "denislamklimov-dropbox.firebaseapp.com",
	projectId: "denislamklimov-dropbox",
	storageBucket: "denislamklimov-dropbox.appspot.com",
	messagingSenderId: "392302206633",
	appId: "1:392302206633:web:90485529e533f8ccc853b8"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
