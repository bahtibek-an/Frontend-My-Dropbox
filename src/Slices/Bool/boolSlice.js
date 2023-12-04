import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  folderBool: false,
  modelBools: false,
  photo: false,
  folderParentId: "",
};

const booleanSlice = createSlice({
  name: "bool",
  initialState,
  reducers: {
    setBoolean: (state, action) => {
      state.folderBool = action.payload.folderBool;
      state.modelBools = action.payload.modelBools;
      state.photo = action.payload.photo;
    },
    setFolderParentId: (state, action) => {
      state.folderParentId = action.payload.parentId;
    }
  },
});

export const { setBoolean, setFolderParentId } = booleanSlice.actions;

export const selectFolderBool = (state) => state.bool.folderBool;
export const selectModelBool = (state) => state.bool.modelBools;
export const selectPhotoBool = (state) => state.bool.photo;
export const selectFolderParentId = (state) => state.bool.folderParentId;
export default booleanSlice.reducer;
