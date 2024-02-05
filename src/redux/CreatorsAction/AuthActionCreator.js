import * as types from '../Actions/AuthAction';
import { auth } from '../../config/firebase';
// import fire from '../../config/firebase' 
import { getAuth } from 'firebase/auth';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';

const loginUser = (user) => {
    return {
        type: types.SIGN_IN,        
        payload:user,
    };
};

const logoutUser = (payload) => {
    return {
        type: types.SIGN_OUT,
        payload,
    };
};

const setUser = (data) => ({
    type: types.SET_USER,
    payload: data,
});

export const signInUser = (email, password,setSuccess) => (dispatch) => {
    signInWithEmailAndPassword(auth, email, password)
        .then((user) => {
            dispatch(loginUser(user));
            console.log("Successfuly logined");
            setSuccess(true)
        })
        .catch((e) => {
            console.log("Invalid email or password!");
        });
};

export const signUpUser = (name, email, password,setSuccess) => (dispatch) => {
    createUserWithEmailAndPassword(auth, email, password)
        .then((user) => {
            updateProfile(auth.currentUser, {
                displayName: name,
            })
            .then(() => {
                const currentUser =  auth().currentUser;
                console.log("Successfuly registered!");
                dispatch(loginUser(currentUser));
                setSuccess(true)
            })
            .catch((e) => {
                console.log(e);
            });
        })
        .catch((e) => {
            if(e.code === 'auth/email-already-in-use'){
                alert('Email arleady used!')
            }
            if(e.code === 'auth/invalid-email'){
                alert('Email invalid!')
            }
            if(e.code === 'auth/weak-password'){
                alert('Weak password!')
            }
        });
};

export const SignOut = (setSuccess) => (dispatch) => {
    auth.signOut().then(() => {
        dispatch(logoutUser())
        setSuccess(true)
    })
    dispatch(logoutUser());
};

export const checkIsLogged = () => dispatch =>  {
    onAuthStateChanged(auth,(user) => {
        if(user){
            dispatch(dispatch(loginUser(user)))
        }
        console.log("logged true");
    })
}
