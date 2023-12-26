import { configureStore } from "@reduxjs/toolkit"
import userSlice from "./userSlice/userSlice";
import folderSlice from "./folderSlice/folderSlice";

const store = configureStore({
    reducer: {
      users: userSlice,
      files:folderSlice
    },
  });
  export default store;