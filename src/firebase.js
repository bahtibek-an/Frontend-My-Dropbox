import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import "firebase/compat/firestore"
import "firebase/compat/storage"

const app = firebase.initializeApp({
  apiKey: "AIzaSyDt1ILEden3HN0TO6U-EACB-ioWIPUKgxM",
  authDomain: "denislamklimov-dropbox.firebaseapp.com",
  projectId: "denislamklimov-dropbox",
  storageBucket: "denislamklimov-dropbox.appspot.com",
  messagingSenderId: "392302206633",
  appId: "1:392302206633:web:90485529e533f8ccc853b8"
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
