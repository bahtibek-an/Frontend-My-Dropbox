import { deleteDocs, deleteQuery, query, getDocs, deleteDoc } from "firebase/firestore";
import { deleteObject, listAll, ref } from "firebase/storage";
import { firestoreCollection, db, storage } from "../../firebase/firebase";

export const deleteFolder = async (folderId) => {
  try {
    // Delete documents in the folder and corresponding images from Firestore and Storage
    const folderRef = firestoreCollection(db, "folder", folderId, "folderTree");
    const querySnapshot = await getDocs(query(folderRef));

    const deletePromises = querySnapshot.docs.map(async (doc) => {
      const fileId = doc.id;

      // Delete document from Firestore
      await deleteDoc(doc(db, "folder", folderId, "folderTree", fileId));

      // Delete corresponding image from Storage
      const imageRef = ref(storage, `folder/${folderId}/${fileId}image`);
      await deleteObject(imageRef);
    });

    await Promise.all(deletePromises);

    console.log("Folder and files successfully deleted!");
  } catch (error) {
    console.error("Error deleting folder:", error);
  }
};

export default deleteFolder;