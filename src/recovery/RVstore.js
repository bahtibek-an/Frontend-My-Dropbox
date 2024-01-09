import { configureStore } from "@reduxjs/toolkit";
import filesSlice from './Reducer'

const store = configureStore({
  reducer: {
    files: filesSlice
  },
});

export default store;
