import "firebase/compat/auth";
import "firebase/compat/storage";
import "firebase/compat/firestore";
import firebase from "firebase/compat/app";
  
const firebaseConfig ={
  apiKey: "AIzaSyC1Rf7guWKwxPojEj3rZPKhYEpqwfEgSdI",
  authDomain: "my-dropbox-t-o.firebaseapp.com",
  projectId: "my-dropbox-t-o",
  storageBucket: "my-dropbox-t-o.appspot.com",
  messagingSenderId: "225037845532",
  appId: "1:225037845532:web:06bdfeeeb1845962810bd9",
  measurementId: "G-SZRPWEKL71"
};

firebase.initializeApp(firebaseConfig);

const firestore = firebase.firestore();

const database = {
  folders: firestore.collection("folders"),
  files: firestore.collection("files"),
  formatDoc: (doc) => {
    return { id: doc.id, ...doc.data() };
  },
  getCurrentTimestamp: firebase.firestore.FieldValue.serverTimestamp,
};

const storage = firebase.storage();
const auth = firebase.auth();

export { database, storage, auth };
export default firebase;