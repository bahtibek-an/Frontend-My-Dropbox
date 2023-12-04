import { deleteDoc, doc} from "firebase/firestore";
import { auth, storage, db } from "./firebase";
import { ref, deleteObject } from "firebase/storage";
import firebase from "firebase/compat/app";

export const getUserData = async () => {
  try {
    const user = auth.currentUser;
    const userData = {
      profileImageURL: user.photoURL,
      name: user.email,
    };
    return userData;
  } catch (error) {
    console.error("Failed to get user data:", error);
    throw error;
  }
};

export const updatePassword = async (currentPassword, newPassword) => {
  try {
    const user = auth.currentUser;
    const credential = firebase.auth.EmailAuthProvider.credential(
      user.email,
      currentPassword
    );

    await user.reauthenticateWithCredential(credential);
    await user.updatePassword(newPassword);

    console.log("Password updated successfully!");
  } catch (error) {
    console.error("Error updating password:", error);
    throw error;
  }
};

export const deleteFolder = async (folderId) => {
  try {
    const folderRef = doc(db, "folder", folderId);
    await deleteDoc(folderRef);

    const storageRef = ref(storage, `folder/${folderId}`);
    const storageSnapshot = await storageRef.listAll();
    storageSnapshot.items.forEach((itemRef) => {
      deleteObject(itemRef);
    });
  } catch (error) {
    console.error("Error deleting folder:", error);
    throw error;
  }
};

export const deleteImage = async (imageId) => {
  try {
    const imageRef = doc(db, "post", imageId);
    await deleteDoc(imageRef);

    const storageRef = ref(storage, `images/${imageId}`);
    await deleteObject(storageRef);

    console.log("Image and document deleted successfully!");
  } catch (error) {
    console.error("Error deleting image and document:", error);
    throw error;
  }
};