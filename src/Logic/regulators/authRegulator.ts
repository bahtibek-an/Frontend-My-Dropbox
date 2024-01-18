import {
    AuthAction, AuthState, NEED_VERIFICATION, SET_USER, SIGN_OUT
} from '../store.types'

const initialState: AuthState = {
    user: null,
    authenticated: false,
    needVerification: false,
}

export default (state = initialState, action: AuthAction) => {
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                user: action.payload,
                authenticated: true
            }
        case SIGN_OUT:
            return {
                ...state,
                user: null,
                authenticated: false,
                loading: false
            }
        case NEED_VERIFICATION:
            return {
                ...state,
                needVerification: true
            }
        default:
            return state
    }
}
