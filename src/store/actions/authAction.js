function authenticate(data) {
    return {
        type: 'AUTHENTICATED',
        data
    }
}
export const auth = (data) => {
    return (dispatch, getState) => {
        dispatch(authenticate(data))
    }
}