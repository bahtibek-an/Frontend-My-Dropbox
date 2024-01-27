var f = null
var r = null

async function recursion(obj, id) {
  for (let key in obj) {
    if (key == 'id' && obj[key] == id) {
      f = {
        name: obj.name,
        id
      }
      r = obj
    }
    if(typeof(obj[key]) === 'object') {
      recursion(obj[key], id)
    }
  }
}

function pwd_obj(data) {
  return {
    type: 'GET_PWD_OBJ',
    data
  }
}

export const recursiveTraversal = (id) => {
  return (dispatch, getState) => {
    const firestore = getState().firestore.firestore
    recursion(firestore, id)
    dispatch(pwd_obj({ f, r }))
  }
}

export const homePwd = () => {
  return (dispatch, getState) => {
    const id = getState().firestore.firestore.name
    f = {
      name: 'home',
      id: id
    }
    r = null
    dispatch(pwd_obj({ f, r }))
  }
}

export default recursion