/** @format */

import { createSlice } from "@reduxjs/toolkit";
import { userRegister } from "../extraReducer";
const initialState = {
  loading: null,
  error: null,
  user: "",
};
const userSlice = createSlice({
  name: "users",
  initialState,
  reducers:{},
  extraReducers: (builder) => {
    builder
      .addCase(userRegister.pending, (action, payload) => {})
      .addCase(userRegister.fulfilled, (action, payload) => {})
      .addCase(userRegister.rejected, (action, payload) => {});
  },
});
export const {} = userSlice.actions;
export default userSlice.reducer; 
