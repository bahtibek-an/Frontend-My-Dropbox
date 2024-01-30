// folderActions.js
import { CREATE_FOLDER } from './folderActionTypes';

export const createFolder = (folder) => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();

    // Add logic to interact with Firestore and create a new folder
    firestore.collection('folders').add({
      ...folder,
      createdAt: new Date(),
    })
    .then(() => {
      dispatch({ type: CREATE_FOLDER, folder });
    })
    .catch((error) => {
      console.error('Error creating folder:', error);
    });
  };
};
