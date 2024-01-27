import { db } from '../../config/firebase'

function dataRequest() {
    return {
        type: 'REQUEST_DATA'
    }
}   
function dataReceived(data) {
    return {
        type: 'DATA_RECEIVED',
        data
    }
}
function dataFailure() {
    return {
        type: 'RECEIVE_FAILURE'
    }
}
export const firestore = (uid) => {
    return async (dispatch, getState) => {
        dispatch(dataRequest())
        await db.collection('users').doc(uid).get()
        .then(doc => {
            dispatch(dataReceived(doc.data()))
        })
        .catch(e => dispatch(dataFailure()))
    }
}