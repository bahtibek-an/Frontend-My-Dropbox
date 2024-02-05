import * as types from '../Actions/FileFolderActions'

const initialState = {
    isLoading:false,
    currentFolder:"root",
    userFolders:[],
    userFiles:[],
    adminFolders:[],
    adminFiles:[]
}

const FileFoldersReducer = (state = initialState,action) => {
    switch(action.type){
        case types.CREATE_FOLDER:
            return {
                ...state,
                userFolders:[...state.userFolders,action.payload]
            }

        case types.ADD_FOLDERS: 
        return {
            ...state,
            userFolders:action.payload
        };
        case types.ADD_FILES: 
        return {
            ...state,
            userFiles:action.payload
        };

        case types.SET_LOADING :
            return {
                ...state,
                isLoading:action.payload
            }

        case types.CHANGE_FOLDER:
            return {
                ...state,
                currentFolder:action.payload,
            }
        case types.CREATE_FILE: 
        return {
            ...state,
            userFiles:[...state.userFiles , action.payload]
        }
        case types.UPLOAD_FILE:
        return{
            ...state,
            userFiles:[...state.userFiles,action.payload]
        }
        default : return state
    }
}

export default FileFoldersReducer;