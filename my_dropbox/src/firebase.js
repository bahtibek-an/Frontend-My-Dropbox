import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app"
import { Timestamp, collection, getFirestore, serverTimestamp, } from "firebase/firestore"
import { getStorage } from "firebase/storage"
import "firebase/compat/auth"
import "firebase/compat/firestore"
import "firebase/compat/storage"

const app = initializeApp({
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID
})

const firestore = getFirestore()
export const database = {
  folders: collection(firestore, "folders"),
  files: collection(firestore, "files"),
  formatDoc: doc => {
    return { id: doc.id, ...doc.data() }
  },
  getCurrentTimestamp: serverTimestamp,
}
export const storage = getStorage()
export const auth = getAuth(app);
export default app