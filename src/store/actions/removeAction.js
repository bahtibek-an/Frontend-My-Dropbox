import { storage, db } from '../../config/firebase'

var f = null
var r = null

function recursionFile(obj, id, fileName) {
  for (let key in obj) {
    if (key == 'id' && obj[key] == id) {

      delete obj.files[fileName]
    }
    if (typeof (obj[key]) === 'object') {
      recursionFile(obj[key], id, fileName)
    }
  }
  return obj
}

function recursionFolder(obj, id, folderName) {
  for (let key in obj) {
    if (key == 'id' && obj[key] == id) {
      delete obj.folders[folderName]
    }
    if (typeof (obj[key]) === 'object') {
      recursionFolder(obj[key], id, folderName)
    }
  }
  return obj
}

function deleteRequest() {
  return {
    type: 'DELETE_REQUEST'
  }
}

function deleteSuccess(data) {
  return {
    type: 'DELETE_SUCCESS',
    data
  }
}

function deleteFailure() {
  return {
    type: 'DELETE_FAILURE'
  }
}

function deleteSuccessFolder(data) {
  return {
    type: 'DELETE_SUCCESS_FOLDER',
    data
  }
}

export const removeFile = (fileName, source) => {
  return (dispatch, getState) => {
    const { firestore, pwd, currentPath } = getState()

    const id = pwd.pwd.f.id
    const p = currentPath.currentPath.path
    let homeId = firestore.firestore.name
    let c = null
    let storageRef = null

    if (source == 'home') {
      storageRef = storage.ref('/' + homeId + '/' + fileName)
    }
    else {
      storageRef = storage.ref('/' + homeId + p + '/' + fileName)
    }

    dispatch(deleteRequest())
    storageRef.delete()
      .then(() => {
        if (source == 'home') {
          delete firestore.firestore.files[fileName]
          db.collection('users').doc(homeId).set({

            ...firestore.firestore
          })
            .then(() => {
              dispatch(deleteSuccess({ fileName }))
            })
            .catch((e) => { console.log(e) });
        }
        else {
          c = recursionFile(firestore, id, fileName)
          db.collection('users').doc(homeId).set({

            ...firestore.firestore,
            folders: c.firestore.folders,
          })
            .then(() => {
              dispatch(deleteSuccess({ fileName }))
            })
            .catch((e) => { console.log(e) });
        }
      })
      .catch()
  }
}

export const removeFolder = (folderName, source) => {
  return (dispatch, getState) => {
    const { firestore, pwd, currentPath } = getState()
    const id = pwd.pwd.f.id
    const p = currentPath.currentPath.path
    let homeId = firestore.firestore.name
    let c = null
    

    // delete files recursively in storage

    dispatch(deleteRequest())

    if (source == 'home') {
      delete firestore.firestore.folders[folderName]
      console.log(firestore)
      db.collection('users').doc(homeId).set({

        ...firestore.firestore
      })
        .then(() => {
          dispatch(deleteSuccessFolder({ folderName }))
        })
        .catch((e) => { console.log(e) });
    }
    else {
      c = recursionFolder(firestore, id, folderName)
      db.collection('users').doc(homeId).set({
        ...firestore.firestore,
        folders: c.firestore.folders,
      })
        .then(() => {
          dispatch(deleteSuccess({ folderName }))
        })
        .catch((e) => { console.log(e) });
    }
  }
}