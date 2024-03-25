import firebase from"firebase/compat/app";
import {getAuth} from 'firebase/auth'
import "firebase/compat/firestore";
import "firebase/compat/auth";
import "firebase/compat/storage";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyCVLAvTGfR6mcAr6AE52g4OIvqiOTQy0-M",
  authDomain: "react-dropbox-dacd3.firebaseapp.com",
  projectId: "react-dropbox-dacd3",
  storageBucket: "react-dropbox-dacd3.appspot.com",
  messagingSenderId: "30594051749",
  appId: "1:30594051749:web:edabfc2355e8e288a5e74c"
  };

  const fire = firebase.initializeApp(firebaseConfig);
  export const firestore = getFirestore(fire);
  
  export const auth = getAuth(fire)
  export default fire;