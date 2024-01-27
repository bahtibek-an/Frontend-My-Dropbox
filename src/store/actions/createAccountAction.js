import { db } from '../../config/firebase'

function request() {
    return {
        type: 'ACCOUNT_CREATION_REQUEST'
    }
}
function received(data) {
    return {
        type: 'ACCOUNT_CREATED',
        data
    }
}
export const createAccount = (userData) => {
    return (dispatch, getState) => {
        const files = new Object()
        const folders = new Object()
        dispatch(request())
        const { name, email, uid } = userData
        const user = {
            email,
            files: {},
            folders: {},
            name: uid,
            username: name
        }
        db.collection('users').doc(uid).set(
            user
        )
        .then(() => dispatch(received(user)))
        .catch(e => console.log(e))
    }
}