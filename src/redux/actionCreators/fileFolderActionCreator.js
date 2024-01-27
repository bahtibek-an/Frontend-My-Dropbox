import * as types from "../actions/fileFolderActionTypes";
import  firestore  from "../../config/firebase";
// import { type } from "@testing-library/user-event/dist/type";
// import { getFirestore } from "firebase/firestore";

const addFolder = (payload) => ({
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

const setChangeFolder = (payload) => ({
    type: types.CHANGE_FOLDER,
    payload,
});

// files

const addFiles = (payload) => ({
    type: types.ADD_FILES,
    payload,
})

const addFile = (payload) => ({
    type: types.CREATE_FILE,
    payload,
}) 

export const createFolder = (data) => (dispatch) => {
    // console.log(data);
    // console.log(firestore.firestore().collection("folder").app(data).then((folder) => {dispatch.addFolder(folder)}));
    firestore
        .firestore()
        .collection("folders")
        .add(data)
        .then(async (folder) => {
            const folderData = await (await folder.get()).data();
            const folderId = folder.id
            dispatch(addFolder({ data: folderData, docId: folderId}));
            alert("Folder created successfully!");
        });
}

export const getFolders = (userId) => (dispatch) => {
    dispatch(setLoading(true));
    firestore
    .firestore()
    .collection("folders")
    .where("userId", "==", userId)
    .get()
    .then(async (folders) => {
        const foldersData = await folders.docs.map((folder) => ({
            data: folder.data(),
            docId: folder.id,
        }));
        dispatch(addFolders(foldersData));
        dispatch(setLoading(false));
    })
}

export const changeFolder = (folderId) => (dispatch) => {
    dispatch(setChangeFolder(folderId));
}


// files

export const getFiles = (userId) => (dispatch) => {
    firestore
    .firestore()
    .collection("files")
    .where("userId", "==", userId)
    .get()
    .then(async (files) => {
        const filesData = await files.docs.map((file) => ({
            data: file.data(),
            docId: file.id,
        }));
        dispatch(addFiles(filesData));
        // dispatch(setLoading(false));
    })
}

export const createFile = (data, setSuccess) => (dispatch) => {
    // console.log(data);
    firestore
    .firestore()
    .collection("files")
    .add(data)
    .then(async (file) => {
        const fileData = await (await file.get()).data();
        const fileId = file.id;
        alert("File created successfully!");
        dispatch(addFile({data: fileData, docId: fileId}));
        setSuccess(true);
    })
    .catch(() => {
        setSuccess(false);
    })
}

export const uploadFile = (file, data, setSuccess) => (dispatch) => {
    const uploadFileRef = firestore.storage().ref(`files/${data.userId}/${data.name}`);

    uploadFileRef.put(file).on("state_changed", (snapshot) => {
        const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        )
        console.log("uploading " + progress + "%");
    },
    (error) => {
        console.log(error);
    },
    async () => {
        const fileUrl = await uploadFileRef.getDownloadURL();
        const fullData = {...data, url: fileUrl};
        
        firestore.firestore().collection("files").add(fullData).then(async (file) => {
            const fileData = await (await file.get()).data();
            const fileId = file.id;

            dispatch(addFile({data: fileData, docId: fileId}));
            alert("File uploaded successfully!");
            setSuccess(true);
        }).catch(() => {
            setSuccess(false);
        })
    }
    )
}

export const downloadFile = (data,succes) => {
    const downloadFileRef = firestore.storage().ref(`files/${data.userId}/${data.name}`).getDownloadURL();

    if(downloadFileRef) return downloadFileRef;
    return;
}