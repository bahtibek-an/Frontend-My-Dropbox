import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB7cEZNmWz9KGzcRkhsLA-tIeZKFhTkUz4",
  authDomain: "dropbox-59a0f.firebaseapp.com",
  projectId: "dropbox-59a0f",
  storageBucket: "dropbox-59a0f.appspot.com",
  messagingSenderId: "465088466675",
  appId: "1:465088466675:web:efe9e5ffc239711da7b186"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
