import { combineReducers } from 'redux'
import downloadReducer from './reducers/downloadReducer'
import uploadReducer from './reducers/uploadReducer'
import removeReducer from './reducers/removeReducer'
import firestoreReducer from './reducers/firestoreReducer'
import createFolderReducer from './reducers/createFolderReducer'
import recursiveTraversalReducer from './reducers/recursiveTraversalReducer'
import currentPathReducer from './reducers/currentPathReducer'
import authReducer from './reducers/authReducer'

const rootReducer = combineReducers({
    remove: removeReducer,
    download: downloadReducer,
    upload: uploadReducer,
    firestore: firestoreReducer,
    createFolder: createFolderReducer,
    pwd: recursiveTraversalReducer,
    currentPath: currentPathReducer,
    auth: authReducer
})
export default rootReducer