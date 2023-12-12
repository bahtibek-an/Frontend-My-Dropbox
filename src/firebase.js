import "firebase/compat/auth";
import "firebase/compat/storage";
import "firebase/compat/firestore";
import firebase from "firebase/compat/app";

const firebaseConfig = {
  apiKey: "AIzaSyBI02lOWNZKVKwCSttVYE-a2cpnAsc1XC8",
  authDomain: "my-dropbox-44cb0.firebaseapp.com",
  projectId: "my-dropbox-44cb0",
  storageBucket: "my-dropbox-44cb0.appspot.com",
  messagingSenderId: "786322571881",
  appId: "1:786322571881:web:00ea3930fe542a8c96d8f8"
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