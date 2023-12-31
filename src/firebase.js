import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import "firebase/compat/firestore"
import "firebase/compat/storage"

const app = firebase.initializeApp({
  apiKey: "AIzaSyA-hddie7J-3bSfZygFw3sP0PgXZWQOhNQ",
  authDomain: "dropbox-ee88c.firebaseapp.com",
  projectId: "dropbox-ee88c",
  storageBucket: "dropbox-ee88c.appspot.com",
  messagingSenderId: "602202076833",
  appId: "1:602202076833:web:cd17540a05e2e9b5fce2e0",
  measurementId: "G-3DFFGKD41R"
})

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
