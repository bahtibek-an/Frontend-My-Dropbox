import { deleteDoc, ref } from "firebase/firestore";
import { deleteObject } from "firebase/storage";
import { doc, storage } from "../../firebase/firebase";

export const deleteFile = async (folderId, fileId) => {
  try {
    // Delete document from Firestore
    await deleteDoc(doc(db, "folder", folderId, "folderTree", fileId));

    // Delete corresponding image from Storage
    const imageRef = ref(storage, `folder/${folderId}/${fileId}image`);
    await deleteObject(imageRef);

    console.log("File successfully deleted!");
  } catch (error) {
    console.error("Error deleting file:", error);
  }
};