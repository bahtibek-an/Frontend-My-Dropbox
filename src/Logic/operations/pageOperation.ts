import { ThunkAction } from "redux-thunk";
import { RootState } from "../store.main";
import { PageAction, SET_ERROR, START_LOADING, END_LOADING, SET_SUBMITTED, SET_SUCCESS } from "../store.types";

// Set loading
export const startLoading = (): PageAction => {
    return {
        type: START_LOADING
    }
}

export const endLoading = (): PageAction => {
    return {
        type: END_LOADING
    }
}

// Set error
export const setError = (msg: string): ThunkAction<void, RootState, null, PageAction> => {
    return dispatch => {
        dispatch({
            type: SET_ERROR,
            payload: msg
        });
    }
}

// Set success
export const setSuccess = (msg: string): ThunkAction<void, RootState, null, PageAction> => {
    return dispatch => {
        dispatch({
            type: SET_SUCCESS,
            payload: msg
        });
    }
}

// Set submitted
export const setSubmitted = (success: boolean): ThunkAction<void, RootState, null, PageAction> => {
    return dispatch => {
        dispatch({
            type: SET_SUBMITTED,
            payload: success
        });
    }
}

// after Submit set Loading
export const submitLoading = (): ThunkAction<void, RootState, null, PageAction> => {
    return dispatch => {
        dispatch({
            type: SET_SUBMITTED,
            payload: true
        });
        dispatch({
            type: END_LOADING,
        });
        dispatch({
            type: SET_SUBMITTED,
            payload: false
        });
    }
}
