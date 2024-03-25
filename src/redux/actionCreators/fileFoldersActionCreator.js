 import * as types from "../actionsTypes/fileFoldersActionTypes";
 import fire, { firestore } from "../../configure/firebase";
 import { addDoc, collection, getDocs, getDoc, where, query, deleteDoc } from 'firebase/firestore';

const addFolder = (payload) =>({
    type: types.CREATE_FOLDER,
    payload,
});

const addFolders = (payload) => ({
    type: types.ADD_FOLDERS,
    payload,
});


const setLoading = (payload) => ({
    type: types.SET_LOADING,
    payload,
});

const setchangeFolder = (payload) => ({
     type: types.CHANGE_FOLDER,
     payload,
});

const setFileData = (payload) => ({
    type: types.SET_FILE_DATA,
    payload,
})

// files

const addFile = (payload) => ({
    type: types.CREATE_FILE,
    payload: folder
});

const addFiles = (files) => ({
    type: types.ADD_FILES,
    payload: files
});


export const createFolder = (data) =>(dispatch) =>{
    console.log(data)
    fire
        .firestore()
        .collection("folders")
        .add(data)
        .then( async(folder) => {
            const folderData =  await ( await folder.get()).data();
            const folderId = folder.id;
            // console.log({ data: folderData, docId: folderId})

            dispatch(addFolder({ data: folderData, docId: folderId}));
            alert("Folder created successfully");
        }); 
};





 export const changeFolder =(folderId) => (dispatch) => {
     dispatch(setchangeFolder(folderId));
 } ;

 // files

 export const getFolders = (userId) => (dispatch) => {
    dispatch(setLoading(true));
    fire
        .firestore()
        .collection("folders")
        .where("userId", "==", userId)
        .get()
        .then(async(folders) => {
            // console.log(folders)
            //  await folders.docs.map((folder) => {
            //     console.log(folder.data())
            //  })
            const foldersData = await folders.docs.map((folder) => ({
                data: folder.data(),
                docId: folder.id,
            }));
            dispatch(setLoading(false));
            dispatch(addFolders(foldersData));
           
        });
};
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
export const createFile = (data, setSuccess) => (dispatch) => {
        fire
        .firestore()
        .collection("files")
        .add(data)
        .then(async (file) =>{
            const fileData = await (await file.get()).data();
            const fileId =  file.id;
            alert("File created successfully!")
            window.location.reload();
            dispatch(addFile({data: fileData, docId: fileId}));
            setSuccess(true);
       }
        ).catch(() => {
         setSuccess(false);
        });
};
   
 export const updateFileData = (fileId, data) => (dispatch) => {
    fire
    .firestore()
    .collection("files")
    .doc(fileId)
    .update({data})
    .then(() => {
        dispatch(setFileData({fileId, data}));
        alert("File saved successfully!");
    }).catch(() => {
        alert("Somthing went wrong!");
    });
 }


//  export const setFolder = (folderId) => (dispatch) => {
//     const actualFolderId = typeof folderId === 'object' ? folderId['*'] : folderId;
//     const trimmedFolderId = actualFolderId.replace("folder/", "");
//     console.log("ff", trimmedFolderId);
//     dispatch(setChangeFolder(trimmedFolderId))
// }

export const uploadFile = ( file, data, setSuccess) => (dispatch) => {
    // console.log(data);
    const uploadFileRef = fire.storage().ref('files/${data.userId}/${data.name}');

    uploadFileRef.put(file).on("state_changed", (snapshot) => {
        const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        console.log("uploading" +progress + "%");
    },
     (error) => {
        console.log(error);
     },
     async () => {
        const fileUrl= await uploadFileRef.getDownloadURL();
        const   fullData = {... data, url: fileUrl};

        fire.firestore().collection("files").add(fullData).then(async (file) => {
         const fileData = await (await file.get()).data();
         const fileId = file.id;
         dispatch(addFile({data: fileData, docId: fileId}));
         alert("File upload successfully!")
         window.location.reload();
         setSuccess(true);
        }).catch(() => {
            setSuccess(true);
        })
     }
    );
};




//     const storage = getStorage();
//     console.log("filePath", file);
//     const storageRefPath = `files/${file.userId}/${file.name}`;
//     console.log("storageRefPath:", storageRefPath);
//     const storageRef = ref(storage, storageRefPath);
//     const uploadTask = uploadBytesResumable(storageRef, file);

//     uploadTask.on(
//         "state_changed",
//         (snapshot) => {
//             const totalBytes = snapshot.totalBytes || 1;
//             const progress = Math.round((snapshot.bytesTransferred / totalBytes) * 100);
//             console.log("Uploading", progress + '%');
//         },
//         (error) => {
//             console.log(error);
//         },
//         async () => {
//             try {
//                 const fileUrl = await getDownloadURL(uploadTask.snapshot.ref);

//                 const fullData = {
//                     ...file,
//                     url: fileUrl,
//                 };

//                 console.log("fulldata", fullData);


//                 const docRef = await addDoc(collection(firestore, "files"), fullData);
//                 const fileData = await getDoc(docRef);

//                 console.log("fileData", fileData.data());

//                 dispatch(
//                     // currentFolder === "root"
//                        addFile({ ...fileData.data(), id: docRef.id })
//                     //   : addFolder({ ...fileData.data(), id: docRef.id })
//                   );
//                 //   setIsUploadFileModal(false)
//                 alert("File uploaded!");
//             } catch (error) {
//                 console.error("Error uploading file:", error);
//             }
//         }
//     );
// };

export const deleteFile = async (userId) => {
    const filesQuery = query(collection(firestore, 'files'), where('userId', '==', userId));
 
    try {
       const querySnapshot = await getDocs(filesQuery);
 
       for (const doc of querySnapshot.docs) {
          try {
             await deleteDoc(doc.ref);
             console.log("Deleted file with ID:", doc.id);
             alert("Successfully deleted file!")
             window.location.reload();
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
















