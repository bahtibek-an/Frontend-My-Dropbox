/** @format */

import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { auth, firestore, storage } from "./api";
import { updateProfile } from "firebase/auth";

export const newFolder = createAsyncThunk("newFolder", async (payload) => {
  // console.log(payload);
  const folder = {
    name: payload.folderName,
    userId: payload.userId,
    folderId: payload.folderId,
    date: new Date(),
  };
  const folderRef = collection(firestore, "Folders");
  await addDoc(folderRef, folder);
});


export const uploadFile = createAsyncThunk("files/upload", async (data) => {
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

const initialState = {
  fileLoader: false,
  files: [],
  foldersData: [],
  error: null,
  loading: null,
  createLoading: null,
  deleteFi:false
};

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
  "get",
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
    } catch (error) {}
  }
);

export const UpdateUser = createAsyncThunk(
  "user/changeProfile",
  async (data, { rejectWithValue }) => {
    console.log(data);
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
export const deleteFiles = createAsyncThunk("Delete", async (payload) => {
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
const folderSlice = createSlice({
  name: "folders",
  initialState,
  reducers: {},
  extraReducers: (buider) => {
    buider
      .addCase(newFolder.pending, (state) => {
        state.fileLoader = true;
      })
      .addCase(newFolder.fulfilled, (state) => {
        state.fileLoader = false;
      })
      .addCase(newFolder.rejected, (state, action) => {
        state.error = action.error.message;
      });
    buider
      .addCase(uploadFile.pending, (state) => {
        state.fileLoader = true;
      })
      .addCase(uploadFile.fulfilled, (state) => {
        state.fileLoader = false;
      })
      .addCase(uploadFile.rejected, (state, action) => {
        state.error = action.error.message;
      });
    buider
      .addCase(getAllFolders.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllFolders.fulfilled, (state, action) => {
        // state.folders = false;
        state.foldersData = action.payload;
      })
      .addCase(getAllFolders.rejected, (state, action) => {
        state.error = action.error.message;
      });
    buider
      .addCase(getAllUserFiles.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllUserFiles.fulfilled, (state, action) => {
        state.files = action.payload;
      })
      .addCase(getAllUserFiles.rejected, (state, action) => {
        state.error = action.error.message;
      });
    buider
      .addCase(UpdateUser.pending, (state) => {
        state.fileLoader = true;
      })
      .addCase(UpdateUser.fulfilled, (state) => {
        state.fileLoader = false;
      })
      .addCase(UpdateUser.rejected, (state, action) => {
        state.error = action.error.message;
      });
      buider
      .addCase(deleteFiles.pending, (state) => {
        state.deleteFi = true;
      })
      .addCase(deleteFiles.fulfilled, (state) => {
        state.deleteFi = false;
      })
      .addCase(deleteFiles.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export const {} = folderSlice.actions;
export default folderSlice.reducer;
