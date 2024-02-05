import { applyMiddleware, combineReducers, createStore } from 'redux';
import {thunk} from 'redux-thunk';
import authReducer from './Reducer/AuthReducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import FileFoldersReducer from './Reducer/FileFolderReducer';

const rootReducer = combineReducers({ auth : authReducer,FileFoldersReducer });
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
