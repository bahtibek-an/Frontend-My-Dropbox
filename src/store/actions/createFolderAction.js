import { db } from '../../config/firebase'
var f = null
var r = null
function recursion(obj, id, folderName, folder) {
    for (let key in obj) {
        if (key == 'id' && obj[key] == id) {
            obj.folders[folderName] = folder
        }
        if (typeof (obj[key]) === 'object') {
            recursion(obj[key], id, folderName, folder)
        }
    }
    return obj
}

function createRequest() {
    return {
        type: 'CREATE_FOLDER_REQUEST'
    }
}
function createSuccess(data) {
    return {
        type: 'FOLDER_CREATED',
        data
    }
}
export const createFolder = (folderName, source) => {
    return (dispatch, getState) => {
        const { firestore, pwd } = getState()
        const id = pwd.pwd.f.id
        let homeId = firestore.firestore.name
        let c = null
        dispatch(createRequest())
        const obj = {
            files: {},
            folders : {},
            id: new Date().valueOf(),
            name: folderName
        }
        if(source == 'home') {
            firestore.firestore.folders[folderName] = obj
            db.collection('users').doc(homeId).set({
                ...firestore.firestore,
            })
            .then(() => {
                dispatch(createSuccess({ folderName }))
            })
            .catch((e) => { console.log(e) });
        }
        else {
            c = recursion(firestore, id, folderName, obj)
            db.collection('users').doc(homeId).set({
                ...firestore.firestore,
                folders: c.firestore.folders,
            })
            .then(() => {
                dispatch(createSuccess({ folderName }))
            })
            .catch((e) => { console.log(e) });
        }
    }
}