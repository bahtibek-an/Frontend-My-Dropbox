// folderReducer.js
import { CREATE_FOLDER } from '../actions/folderActionTypes';

const initialState = {
  // Initial state if needed
};

const folderReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_FOLDER:
      console.log('Folder created:', action.folder);
      // You can update state or perform additional actions here
      return state;

    // Add other cases if needed

    default:
      return state;
  }
};

export default folderReducer;
