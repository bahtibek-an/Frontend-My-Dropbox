const initState = {}
const downloadReducer = (state = initState, action) => {
    switch (action.type) {
        case 'DOWNLOAD' :
            console.log('download file, action')
            break
            default:
                return state
    }
    return state
}
export default downloadReducer