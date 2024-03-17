import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCwzIERJGUH4tLtkJisKQ6KMEiwZMEEg6o",
  authDomain: "ziyodabonu-dropbox.firebaseapp.com",
  projectId: "ziyodabonu-dropbox",
  storageBucket: "ziyodabonu-dropbox.appspot.com",
  messagingSenderId: "296176554184",
  appId: "1:296176554184:web:a97d4be5de59347d6a15fd",
  measurementId: "G-SD1YM8PCE7",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

const usersCollection = collection(db, "users");
const usernamesCollection = collection(db, "usernames");

export { auth, db, usersCollection, usernamesCollection, storage };
