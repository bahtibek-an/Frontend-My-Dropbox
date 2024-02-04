import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import "firebase/compat/firestore"
import "firebase/compat/storage"

 
const app = firebase.initializeApp ({
  apiKey: "AIzaSyBqNnI1gq6ZIc-_YMvS-k0-DIphVVF3t3k",
  authDomain: "dropbox-3d006.firebaseapp.com",
  projectId: "dropbox-3d006",
  storageBucket: "dropbox-3d006.appspot.com",
  messagingSenderId: "169088410070",
  appId: "1:169088410070:web:59bb184b32aad212a44477",
  measurementId: "G-113JNPSPJS"
});

const firestore = app.firestore()


export const database = {
  folders: firestore.collection("folders"),
  files: firestore.collection("files"),
  formatDoc: doc => {
    return { id: doc.id, ...doc.data() }
  },
  getCurrentTimestamp: firebase.firestore.FieldValue.serverTimestamp,
}
export const storage = app.storage()
export const auth = app.auth()
export default app
