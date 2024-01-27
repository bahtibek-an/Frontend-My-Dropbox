const initState = {}
let count = 0

function addId (obj) {
    for (let key in obj) {
        if (typeof(obj[key]) === 'object' && obj.name) {
            obj['id'] = count++
            addId(obj[key])
        }else if (typeof(obj[key]) === 'object') {
            addId(obj[key])
        }
    }
    return obj
}
const firestoreReducer = (state = initState, action) => {
    switch (action.type) {
        case 'REQUEST_DATA':
            console.log('request data')
            return state
            break
        case 'RECEIVE_FAILURE':
            console.log('data failure')
            return state
            break
        case 'DATA_RECEIVED':
            const data =addId(action.data)
            return {
                ...state,
                firestore: data
            }
            break
            default:
                return state
    }
}
export default firestoreReducer