import { configureStore } from "@reduxjs/toolkit";
import folderSlice from "./folderSlice";

const store = configureStore({
    reducer:{
        bases:folderSlice,
    }
})
export default store;