/** @format */

import { createAsyncThunk } from "@reduxjs/toolkit";
import { auth, firestore, storage } from "./firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { addDoc, collection, deleteDoc, doc, getDocs, query, where } from "firebase/firestore";
import { deleteObject, getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";

export const userRegister = createAsyncThunk(
  "sign",
  async (payload, thunkAPI) => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        payload.email,
        payload.password
      );
      await updateProfile(auth.currentUser, { displayName: payload.username });
      return user;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const userSign = createAsyncThunk("login", async (payload, thunkAPI) => {
  try {
    const user = await signInWithEmailAndPassword(
      auth,
      payload.email,
      payload.password
    );
    return user;
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue(error.message);
  }
});



export const newFolder = createAsyncThunk("newFolder", async (payload) => {
  console.log(payload);
  const folder = {
    name: payload.folderName,
    userId: payload.useruid,
    folderId: payload.folderId,
    date: new Date(),
  };
  const folderRef = collection(firestore, "Folders");
  await addDoc(folderRef, folder);
});

export const uploadFile = createAsyncThunk("files/upload", async (data) => {
  const { file, userUid, folderUid, } = data;
console.log(data)
  try {
    const storage = getStorage();
    const name = `${new Date()}_${data.name}`;
    const storageRef = ref(storage, name);
    const uploadTask = uploadBytesResumable(storageRef, data);

    const snapshot = await uploadTask;

    const url = await getDownloadURL(snapshot.ref);

    const fileData = {
      name: name,
      filename: data.name,
      url: url,
      userId: data.userUid,
      folderId: data.folderUid,
      type: "file",
      date: new Date(),
    };

    const docRef = await addDoc(collection(firestore, "files"), fileData);

    return {
      id: docRef.id,
      ...fileData,
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
});
export const getAllUserFiles = createAsyncThunk(
  "files/fetchUserFilesfetchUserFile",
  async (userId, { rejectWithValue }) => {
    try {
      const filesRef = collection(firestore, "files");
      const userFilesQuery = query(filesRef, where("userId", "==", userId));
      const snapshot = await getDocs(userFilesQuery);
      const files = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      return files;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const getAllFolders = createAsyncThunk(
  "folders/get",
  async (userId, { rejectWithValue }) => {
    try {
      const filesRef = collection(firestore, "Folders");
      const userFolder = query(filesRef, where("userId", "==", userId));
      const snapshot = await getDocs(userFolder);
      const folders = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      return folders;
    } catch (error) {
      // return rejectWithValue(error.message);
    }
  }
);
export const removeFile = createAsyncThunk("Delete", async (payload) => {
  console.log(payload);

  const storageRef = ref(storage, payload.name);

  try {
    await getDownloadURL(storageRef);
    await deleteObject(storageRef);
    console.log("File deleted successfully");
    await deleteDoc(doc(firestore, "files", payload.id));
    console.log("Document deleted successfully");
  } catch (error) {
    console.error("Error deleting file or document:", error);
  }
});

export const changeUser = createAsyncThunk(
  'user/changeProfile',
  async (data, { rejectWithValue }) => {
    console.log(data)
    try {
      await updateProfile(auth.currentUser, {
        displayName: data.username,
      });
      return auth.currentUser;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
