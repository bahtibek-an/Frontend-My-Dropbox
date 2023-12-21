import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
	apiKey: "AIzaSyBjB3cm_Oz6QttY8qJb0VJBnrk7wFXTl7s",
	authDomain: "dropbox-clone-7b0f0.firebaseapp.com",
	projectId: "dropbox-clone-7b0f0",
	storageBucket: "dropbox-clone-7b0f0.appspot.com",
	messagingSenderId: "141023689174",
	appId: "1:141023689174:web:96d81ddaf0d5814f478c77",
	measurementId: "G-6FSPM2ENPC"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
