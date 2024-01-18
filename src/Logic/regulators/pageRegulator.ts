import { PageAction, PageState, SET_ERROR, START_LOADING, END_LOADING, SET_SUBMITTED, SET_SUCCESS } from "../store.types";

const initialState: PageState = {
    loading: false,
    error: '',
    success: '',
    submitted: false
}

const pageReducer = (state = initialState, action: PageAction) => {
    switch (action.type) {
        case START_LOADING:
            return {
                ...state,
                loading: true
            }
        case END_LOADING:
            return {
                ...state,
                loading: false
            }
        case SET_ERROR:
            return {
                ...state,
                error: action.payload
            }
        case SET_SUCCESS:
            return {
                ...state,
                success: action.payload
            }
        case SET_SUBMITTED:
            return {
                ...state,
                submitted: action.payload
            }
        default:
            return state
    }
}

export default pageReducer