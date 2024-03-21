import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';
import { getFirestore, serverTimestamp, collection } from 'firebase/firestore';

const firebaseApp = initializeApp({
  apiKey: "AIzaSyAEsI6mDfKI-8pLl_pxAuDRPLc_qihUKHc",
  authDomain: "mydropbox-3f448.firebaseapp.com",
  projectId: "mydropbox-3f448",
  storageBucket: "mydropbox-3f448.appspot.com",
  messagingSenderId: "407671079910",
  appId: "1:407671079910:web:c7ed4b9b8008c89643cc27"
});

const fs = getFirestore(firebaseApp);

export const db = {
  folders: collection(fs, 'folders'),
  files: collection(fs, 'files'),
  createdAt: serverTimestamp,
  formatDoc: doc => {
    return {
      id: doc.id,
      ...doc.data()
    }
  }
}

export const auth = getAuth(firebaseApp);
export const storage = getStorage(firebaseApp);
export { firebaseApp };