const initState = {}
const uploadReducer = (state = initState, action) => {
    switch (action.type) {
        case 'UPLOAD_REQUEST':
            console.log('upload request')
            return state
            break
        case 'UPLOAD_FAILURE':
            console.log('upload failure')
            return state
            break
        case 'UPLOAD_SUCCESS':
            console.log('upload success')
            const x = action.data.fileName
            const y = action.data.url
            return {
                ...state,
                files: {
                    ...state.files,
                    [x]: y,
                },
                status: false
            }
            break
        case 'UPLOAD_PROGRESS':
            return {
                ...state,
                status: true,
                prog: action.data
            }
            default:
                return state
    }
}
export default uploadReducer