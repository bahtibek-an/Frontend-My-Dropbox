import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: process.env.RAECT_APP_AUTHDOMAIN,
  projectId: process.env.RAECT_APP_PROJECTID,
  storageBucket: 'dropbox-d2e0a.appspot.com',
  messagingSenderId: process.env.RAECT_APP_MESSAGIN,
  appId: process.env.RAECT_APP_APPID,
  measurementId: process.env.RAECT_APP_MEASUREMENT,
}

export const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)

export const storage = getStorage(app)
