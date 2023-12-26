/** @format */

import { createSlice } from "@reduxjs/toolkit";
import {
  changeUser,
  getAllFolders,
  getAllUserFiles,
  newFolder,
  removeFile,
  uploadFile,
} from "../extraReducer";
const initialState = {
  error: "",
  createLoading: false,
  folders: [],
  files: [],
  deleteFolderOrFile: null,
  uploadFile: null,
  closeModal: null,
  loading: null,
};

const folderSlice = createSlice({
  name: "folder",
  initialState,
  reducers: {
    closeTheModal: (state, action) => {
      state.closeModal = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(newFolder.pending, (state, action) => {
        state.createLoading = true;
      })
      .addCase(newFolder.fulfilled, (state, action) => {
        state.createLoading = false;
        state.closeModal = "open";
      })
      .addCase(newFolder.rejected, (state, action) => {
        state.error = action.error.message;
      });
    builder
      .addCase(getAllFolders.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getAllFolders.fulfilled, (state, action) => {
        state.folders = action.payload;
      })
      .addCase(getAllFolders.rejected, (state, action) => {
        state.error = action.error.message;
      });
    builder
      .addCase(uploadFile.pending, (state, action) => {
        state.createLoading = true;
      })
      .addCase(uploadFile.fulfilled, (state, action) => {
        state.createLoading = false;
        state.closeModal = "open";
      })
      .addCase(uploadFile.rejected, (state, action) => {
        state.error = action.error.message;
      });
    builder
      .addCase(getAllUserFiles.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getAllUserFiles.fulfilled, (state, action) => {
        state.files = action.payload;
      })
      .addCase(getAllUserFiles.rejected, (state, action) => {
        state.error = action.error.message;
      });
    builder
      .addCase(changeUser.pending, (state, action) => {
        state.deleteFolderOrFile = true;
      })
      .addCase(changeUser.fulfilled, (state, action) => {
        state.deleteFolderOrFile = false;
      })
      .addCase(changeUser.rejected, (state, action) => {
        state.error = action.error.message;
      });
    builder
      .addCase(removeFile.pending, (state, action) => {
        state.deleteFolderOrFile = true;
      })
      .addCase(removeFile.fulfilled, (state, action) => {
        state.deleteFolderOrFile = false;
      })
      .addCase(removeFile.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});
export const { closeTheModal } = folderSlice.actions;
export default folderSlice.reducer;
