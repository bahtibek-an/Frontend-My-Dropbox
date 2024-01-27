import authReducer from "../reducers/authReducer";
import fileFoldersReducer from "../reducers/fileFoldersReducers";
import {  combineReducers } from "redux";

const rootReducer = combineReducers({auth:authReducer, filefolders:fileFoldersReducer});

export default rootReducer;