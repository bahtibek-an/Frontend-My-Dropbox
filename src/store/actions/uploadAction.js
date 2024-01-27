import { storage, db, firebase } from '../../config/firebase'

var f = null
var r = null

function recursion(obj, id, fileName, url) {
    for (let key in obj) {
        if (key == 'id' && obj[key] == id) {
            obj.files[fileName] = url
        }
        if (typeof (obj[key]) === 'object') {
            recursion(obj[key], id, fileName, url)
        }
    }
    return obj
}
function uploadRequest() {
    return {
        type: 'UPLOAD_REQUEST'
    }
}
function uploadSuccess(data) {
    return {
        type: 'UPLOAD_SUCCESS',
        data
    }
}
function uploadFailure() {
    return {
        type: 'UPLOAD_FAILURE'
    }
}
function uploadStatus(data) {
    return {
        type: 'UPLOAD_PROGRESS',
        data
    }
}
export const uploadFile = (f = {}, source) => {
    return (dispatch, getState) => {
        const { firestore, pwd, currentPath } = getState()

        const id = pwd.pwd.f.id
        const p = currentPath.currentPath.path
        let file = f.files[0]
        if (file) {
            let fileName = file.name
            let homeId = firestore.firestore.name
            let c = null
            let storageRef = null
      
            if (source == 'home') {
              storageRef = storage.ref('/' + homeId + '/' + fileName)
            }
            else {
              storageRef = storage.ref('/' + homeId + p + '/' + fileName)
            }
      
            dispatch(uploadRequest())
      
            var uploadTask = storageRef.put(file)
            uploadTask.then(() => {
              storageRef.getDownloadURL()
                .then(url => {
                  if (source == 'home') {
                    c = recursion(firestore, homeId, fileName, url)
                    firestore.firestore.files[fileName] = url
                  }
                  else {
                    c = recursion(firestore, id, fileName, url)
                  }
      
                  db.collection('users').doc(homeId).set({
      
                    ...firestore.firestore,
                    folders: c.firestore.folders,
                  })
                    .then(() => {
                      dispatch(uploadSuccess({ fileName, url, status: false }))
                    })
                    .catch((e) => { console.log(e) });
                })
                .catch(e => { console.log('error') })
            })
              .catch(e => dispatch(uploadFailure()))
      
      
            uploadTask.on('state_changed', function (snapshot) {
              var progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      
              dispatch(uploadStatus({ progress }))
      
              switch (snapshot.state) {
                case firebase.storage.TaskState.PAUSED:
                  console.log('Upload is paused');
                  break;
                case firebase.storage.TaskState.RUNNING:
                  console.log('Upload is running');
                  break;
              }
            }, function (error) {
      
            }, function () {
              console.log('Upload Success')
            });
        }
      
    }
}