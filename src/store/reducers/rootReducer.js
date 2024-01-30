// rootReducer.js
import { combineReducers } from 'redux';
import authReducer from './authReducer';
import fileReducer from './fileReducer';
import folderReducer from './folderReducer'; // Import your folderReducer
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase';

const rootReducer = combineReducers({
  auth: authReducer,
  file: fileReducer,
  folder: folderReducer, // Add your folderReducer to the root reducer
  firestore: firestoreReducer,
  firebase: firebaseReducer
});

export default rootReducer;
