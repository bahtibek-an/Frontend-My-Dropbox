import fire, { database } from '../../config/firebase';
import * as types from '../Actions/FileFolderActions'
import { auth } from '../../config/firebase';
import { uploadBytesResumable, getDownloadURL, ref, getStorage } from 'firebase/storage';
import { firestore } from '../../config/firebase';
import { addDoc, collection, getDocs, getDoc, where, query, deleteDoc } from 'firebase/firestore';


const addFolder = (folderData) => ({
    type: types.CREATE_FOLDER,
    payload: folderData
})

const addFolders = (folder) => ({
    type: types.ADD_FOLDERS,
    payload: folder
})
const addFiles = (files) => ({
    type: types.ADD_FILES,
    payload: files
})

const setLoading = (isLoading) => ({
    type: types.SET_LOADING,
    payload: isLoading
})

const setChangeFolder = (folderData) => ({
    type: types.CHANGE_FOLDER,
    payload: folderData
})
const addFile = (folder) => ({
    type: types.CREATE_FILE,
    payload: folder
})
const UploadFile = (folder) => ({
    type: types.UPLOAD_FILE,
    payload: folder
})

export const createFolder = (data) => (dispatch) => {
    addDoc(collection(firestore, "folders"), data)
        .then(async (folderData) => {
            console.log(folderData)
            dispatch(addFolder(folderData))
        }).catch((e) => {
            console.log(e);
        })
}

export const createFile = (data, setSuccess) => (dispatch) => {
    addDoc(collection(firestore, "files"), data)
        .then(async (folderRef) => {
            const folderData = { id: folderRef.id };
            console.log("folderData", folderData);
            dispatch(addFile(folderData))
        }).catch((e) => {
            console.log(e);
        })
}

export const getFolders = (userId) => (dispatch) => {
    setLoading(true)
    const allFolders = query(collection(firestore, 'folders'), where('userId', '==', userId));
    getDocs(allFolders)
        .then(async (files) => {
            const folderData = files.docs.map((folder) => ({ ...folder.data(), id: folder.id }));
            dispatch(addFolders(folderData));
            setLoading(false);
        }).catch((e) => {
            console.log(e);
        })
}



export const getFiles = (userId) => (dispatch) => {
    setLoading(true)
    const allFiles = query(collection(firestore, 'files'), where('userId', '==', userId));
    getDocs(allFiles)
        .then(async (files) => {
            const filesData = files.docs.map((file) => ({ ...file.data(), id: file.id }));
            dispatch(addFiles(filesData));
            setLoading(false);
        }).catch((e) => {
            console.log(e);
        })
}


export const setFolder = (folderId) => (dispatch) => {
    const actualFolderId = typeof folderId === 'object' ? folderId['*'] : folderId;
    const trimmedFolderId = actualFolderId.replace("folder/", "");
    console.log("ff", trimmedFolderId);
    dispatch(setChangeFolder(trimmedFolderId))
}

export const uploadFile = (file, data, setIsUploadFileModal) => (dispatch) => {
    const storage = getStorage();
    console.log("filePath", file);
    const storageRefPath = `files/${file.userId}/${file.name}`;
    console.log("storageRefPath:", storageRefPath);
    const storageRef = ref(storage, storageRefPath);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
        "state_changed",
        (snapshot) => {
            const totalBytes = snapshot.totalBytes || 1;
            const progress = Math.round((snapshot.bytesTransferred / totalBytes) * 100);
            console.log("Uploading", progress + '%');
        },
        (error) => {
            console.log(error);
        },
        async () => {
            try {
                const fileUrl = await getDownloadURL(uploadTask.snapshot.ref);

                const fullData = {
                    ...file,
                    url: fileUrl,
                };

                console.log("fulldata", fullData);


                const docRef = await addDoc(collection(firestore, "files"), fullData);
                const fileData = await getDoc(docRef);

                console.log("fileData", fileData.data());

                dispatch(addFile({ ...fileData.data(), id: docRef.id }));
                //   setIsUploadFileModal(false)
                alert("File upload successfuly!");
            } catch (error) {
                console.error("Error uploading file:", error);
            }
        }
    );
};

export const deleteFile = async (userId) => {
    const filesQuery = query(collection(firestore, 'files'), where('userId', '==', userId));
 
    try {
       const querySnapshot = await getDocs(filesQuery);
 
       for (const doc of querySnapshot.docs) {

        const fileDoc = querySnapshot.docs[0];
          try {
             await deleteDoc(fileDoc.ref);
             console.log("Deleted file with ID:", doc.id);
          } catch (deleteError) {
             console.error("Error deleting file:", deleteError);
          }
       }
 
       if (querySnapshot.empty) {
          console.log("No files found for deletion.");
       }
    } catch (error) {
       console.error("Error in deleting files:", error);
    }
 };