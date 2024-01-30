import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const app = firebase.initializeApp({
  apiKey: "AIzaSyBCzoAZNRlJ6Ws0KT1I_XkbjrIfwHkXaT4",
  authDomain: "dropbox-8c65e.firebaseapp.com",
  projectId: "dropbox-8c65e",
  storageBucket: "dropbox-8c65e.appspot.com",
  messagingSenderId: "19295349300",
  appId: "1:19295349300:web:f58c5eea8e671669da3861",
});

export const firestore = app.firestore();

export const database = {
  folders: firestore.collection("folders"),
  files: firestore.collection("files"),
  formatDoc: (doc) => {
    return { id: doc.id, ...doc.data() };
  },
  getCurrentTimestamp: firebase.firestore.FieldValue.serverTimestamp,
};
export const storage = app.storage();
export const auth = app.auth();
export default app;
