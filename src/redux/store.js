import { configureStore } from "@reduxjs/toolkit";
import filesSlice from "./extraReducer";
const store = configureStore({
  reducer: {
    files: filesSlice,
  },
});

export default store;
