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
import { auth, firestore, storage } from "../api/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { createSlice } from "@reduxjs/toolkit";

export const UserCreate = createAsyncThunk(
  "user/createUserAndProfile",
  async (data, thunkAPI) => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      await updateProfile(auth.currentUser, { displayName: data.userName });
      window.location.reload();
      return user;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const UserLogin = createAsyncThunk("login", async (data, thunkAPI) => {
  try {
    const user = await signInWithEmailAndPassword(
      auth,
      data.email,
      data.password
    );
    window.location.reload();
    return user;
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue(error.message);
  }
});
export const UserLogout = createAsyncThunk("logout", async () => {
  let localUser = JSON.parse(localStorage.getItem("localUser"));
  if (localUser) {
    localStorage.removeItem("localUser");
  }
  auth.signOut();
  window.location.reload();
});
export const folderCreate = createAsyncThunk("newFolder", async (payload) => {
  console.log(payload);
  const folder = {
    name: payload.folderName,
    userId: payload.userId,
    type: "folder",
    folderId: payload.folderId,
    date: new Date(),
  };
  const folderRef = collection(firestore, "Folders");

  await addDoc(folderRef, folder);
});

export const publishPost = createAsyncThunk("files/upload", async (data) => {
  console.log(data);
  const { file, userId, folderId } = data;

  try {
    const storage = getStorage();
    const name = `${new Date()}_${file.name}`;
    const storageRef = ref(storage, name);
    const uploadTask = uploadBytesResumable(storageRef, file);

    const snapshot = await uploadTask;

    const url = await getDownloadURL(snapshot.ref);

    const fileData = {
      name: name,
      filename: file.name,
      url: url,
      userId: userId,
      folderId: folderId,
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
export const getUserFolder = createAsyncThunk(
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
export const changeUserProfile = createAsyncThunk(
  "user/changeProfile",
  async (data, { rejectWithValue }) => {
    console.log(data);
    try {
      await updateProfile(auth.currentUser, {
        displayName: data.username,
      });
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  error: null,
  loading: false,
  filesData: [],
  filesLoading: false,
  postLoading: false,
  foldersData: [],
};
const filesSlice = createSlice({
  name: "files",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(folderCreate.pending, (state, action) => {
        state.filesLoading = true;
        state.postLoading = true;
      })
      .addCase(folderCreate.fulfilled, (state, action) => {
        state.filesLoading = false;
        state.postLoading = false;
      })
      .addCase(folderCreate.rejected, (state, action) => {});
    builder
      .addCase(publishPost.pending, (state, action) => {
        state.postLoading = true;
      })
      .addCase(publishPost.fulfilled, (state, action) => {
        state.postLoading = false;
      })
      .addCase(publishPost.rejected, (state, action) => {});
    builder
      .addCase(getAllUserFiles.pending, (state, action) => {
        state.filesLoading = true;
      })
      .addCase(getAllUserFiles.fulfilled, (state, action) => {
        state.filesLoading = false;
        state.filesData = action.payload;
      })
      .addCase(getAllUserFiles.rejected, (state, action) => {});
    builder
      .addCase(getUserFolder.pending, (state, action) => {
        state.filesLoading = true;
      })
      .addCase(getUserFolder.fulfilled, (state, action) => {
        state.filesLoading = false;
        state.foldersData = action.payload;
      })
      .addCase(getUserFolder.rejected, (state, action) => {});
    builder
      .addCase(UserCreate.pending, (state, action) => {
        state.filesLoading = true;
      })
      .addCase(UserCreate.fulfilled, (state, action) => {
        state.filesLoading = false;
      })
      .addCase(UserCreate.rejected, (state, action) => {
        state.error = action.error.message;
      });
    builder
      .addCase(UserLogin.pending, (state, action) => {
        state.filesLoading = true;
      })
      .addCase(UserLogin.fulfilled, (state, action) => {
        state.filesLoading = false;
      })
      .addCase(UserLogin.rejected, (state, action) => {
        state.error = action.error.message;
      });
    builder
      .addCase(deleteFiles.pending, (state, action) => {
        state.postLoading = true;
      })
      .addCase(deleteFiles.fulfilled, (state, action) => {
        state.postLoading = false;
      })
      .addCase(deleteFiles.rejected, (state, action) => {
        state.error = action.error.message;
      });
    builder
      .addCase(changeUserProfile.pending, (state, action) => {
        state.postLoading = true;
      })
      .addCase(changeUserProfile.fulfilled, (state, action) => {
        state.postLoading = false;
      })
      .addCase(changeUserProfile.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});
export const {} = filesSlice.actions;
export default filesSlice.reducer;
