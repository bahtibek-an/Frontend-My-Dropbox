import { ThunkAction } from "redux-thunk";

import firebase from "firebase/compat/app";
import {
    Board,
    BoardAction,
    registerData,
    User
} from "../store.types";
import { RootState } from "../store.main";
import { setError, startLoading, submitLoading } from "./pageOperation";

export const registerBoard = (data: registerData, user: User, onError: () => void): ThunkAction<void, RootState, null, BoardAction> => {
    return async dispatch => {
        try {
            const boardData: Board = {
                title: data.title,
                content: data.content,
                author: user.id,
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            };
            dispatch(startLoading)
            await firebase.firestore().collection('board').add(boardData);
            dispatch(submitLoading())
        } catch (err: any) {
            console.log(err)
            onError();
            dispatch(setError(err.message))
        }
    }
}

// export const fetchBoard = (data: registerData, user: User, onError: () => void): ThunkAction<void, RootState, null, BoardAction> => {
//     return async dispatch => {
//         try {
//
//         }
//     }
// }


