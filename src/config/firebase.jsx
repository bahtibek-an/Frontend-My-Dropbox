import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import "firebase/compat/firestore"
import "firebase/compat/storage"

const app = firebase.initializeApp({
  apiKey: "AIzaSyDDuxM_6DMLX-cHPVSRlMMskoFSqZEbzzA",
  authDomain: "drop-af078.firebaseapp.com",
  projectId: "drop-af078",
  storageBucket: "drop-af078.appspot.com",
  messagingSenderId: "206352719582",
  appId: "1:206352719582:web:ff1a00833e3822ea3aec4f",
  measurementId: "G-F41ZPKLKE4"
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
