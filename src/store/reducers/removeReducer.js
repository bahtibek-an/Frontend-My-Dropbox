const initState = {}
const removeReducer = (state = initState, action) => {
    switch (action.type) {
        case 'DELETE_REQUEST':
            console.log('deleting request')
            return {
                ...state,
                request: true
            }
            break
        case 'DELETE_SUCCESS':
            console.log('delete success')
            const x = action.data.fileName
            return {
                ...state,
                files: {
                    ...state.files,
                    [x]: [x],
                },
                request: false
            }
            break
        case 'DELETE_SUCCESS_FOLDER':
            console.log('delete success')
            const y = action.data.folderName
            return {
                ...state,
                folder: {
                    ...state.folder,
                    [y]: [y],
                },
                request: false
            }
            break
        case 'DELETE_FAILURE':
            console.log('delete failure')
            return state
            break
            default:
                return state
    }
    return state
}
export default removeReducer