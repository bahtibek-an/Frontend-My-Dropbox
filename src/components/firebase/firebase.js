import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD9tkiRNoeU5QZgXAfuzzYei2JXSaRuF8U",
  authDomain: "dropbox-e3741.firebaseapp.com",
  projectId: "dropbox-e3741",
  storageBucket: "dropbox-e3741.appspot.com",
  messagingSenderId: "693349924200",
  appId: "1:693349924200:web:418baf557d4e0b0638aadd",
  measurementId: "G-D9NCLSBKY7"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };

export async function saveUserDataToFirebase(userId, userData) {
  try {
    const userRef = doc(db, "users", userId);
    await setDoc(userRef, userData);
    console.log("User data saved successfully!");
  } catch (error) {
    console.error("Error saving user data:", error);
    throw error;
  }
}

export async function getUserDataFromFirebase(userId) {
  try {
      const userRef = doc(db, "users", userId);
      const userDoc = await getDoc(userRef);
      if (userDoc.exists()) {
          const userData = userDoc.data();
          console.log("User data retrieved:", userData);
          return userData;
      } else {
          console.error("User not found!");
          return null;
      }
  } catch (error) {
      console.error("Error fetching user data:", error);
      throw error;
  }
}

