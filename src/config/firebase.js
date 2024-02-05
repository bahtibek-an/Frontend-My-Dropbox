import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import 'firebase/auth';
import { getFirestore, collection,addDoc, serverTimestamp } from 'firebase/firestore';
import 'firebase/compat/storage'
const firebaseConfig = {
    apiKey: "AIzaSyCV9h5rD4oBdoL02PpGydJVhHPRacEDY5A",
    authDomain: "my-dropbox-5266c.firebaseapp.com",
    projectId: "my-dropbox-5266c",
    storageBucket: "my-dropbox-5266c.appspot.com",
    messagingSenderId: "554835202290",
    appId: "1:554835202290:web:680cb2ce5c7c3ac54cc06b"
};

const fire = initializeApp(firebaseConfig);
export const firestore = getFirestore(fire);

export const database = {
    users: collection(firestore, "users"),
    docs: collection(firestore, "docs"),
    files: collection(firestore, "files"),
    date: serverTimestamp(),
};

// export const storage = fire.storage();


export const auth = getAuth(fire);
export default fire;
