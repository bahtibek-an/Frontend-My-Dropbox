import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
	apiKey: "AIzaSyAfHpcYxvmUEfs0e_mPYTNNywobfyIn9BQ",
	authDomain: "dropbox-50544.firebaseapp.com",
	projectId: "dropbox-50544",
	storageBucket: "dropbox-50544.appspot.com",
	messagingSenderId: "990363027267",
	appId: "1:990363027267:web:afbb8839b55bd6955651f6",
	measurementId: "G-SB2VQMWF12"
};


export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
