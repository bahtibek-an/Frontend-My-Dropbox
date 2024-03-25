import * as types from "../actionsTypes/authActionTypes";
import fire from "../../configure/firebase";
import { auth } from '../../configure/firebase';
import { updateProfile } from "firebase/auth";


const loginUser = (user) => {
    return {
        type: types.SIGN_IN,
        payload: user,
    };
};

const logoutUser = (payload) => {
    return {
        type: types.SIGN_OUT,
        payload,
    };
};

const uptadeUser = (user) => {
    return {
        type: types.EDIT_USER,
        payload:user
    }
}

const setUser = (data) => ({
    type: types.SET_USER,
    payload: data,
});

//action creator

export const signInUser =( email, password, setSuccess) => (dispatch) => {
    fire
    .auth().signInWithEmailAndPassword
    (email,password)
    .then((user)=>{
       dispatch(loginUser({
         uid: user.user.uid,
         email: user.user.email,
         displayName: user.user.displayName,

    })
       );
       setSuccess(true);
    }).catch(error=>{
        alert("Invalid email or password!")
    });
};

export const signUpUser =(name, email, password, setSuccess) => (dispatch) => {
    fire
    .auth() 
    .createUserWithEmailAndPassword(email,password)
    .then((user)=>{
        fire
        .auth()
        .currentUser.updateProfile({
            displayName: name,
        }).then(()=>{
            const currentUser = fire.auth().currentUser;
            dispatch(loginUser({
                uid: currentUser.uid,
                name: currentUser.displayName,
                email: currentUser.email,
            })
            );
            setSuccess(true);
        })
        .catch((error)=>{
            console.log(error);
        });
    })
    .catch((error)=>{
   if(error.code === "auth/email-already-in-use"){
    alert("Email already in use");
   }
   if(error.code === "auth/invalid-email"){
    alert("Invalid email");
   }
   if(error.code === "auth/weak-password"){
    alert("Weak password");
   }
    });
};

export const SignOutUser = () => (dispatch) =>{
    fire
    .auth()
    .signOut()
    .then(() => {
     dispatch(logoutUser());
    });
};

export const checkIsLoggedIn = () => (dispatch) => {
    fire.auth().onAuthStateChanged(user => {
        if(user) {
            dispatch(loginUser({
                uid: user.uid,
                email: user.email,
                displayName: user.displayName,
            })
            );
        }
    });
};

export const editUser = (name, photoUrl,navigate) => (dispatch) => {
    const user = auth.currentUser
    console.log({name, photoUrl});
    if (user) {
        const profileToUpdate = {};

        if (name) {
            profileToUpdate.displayName = name;
        }

        if (photoUrl) {
            profileToUpdate.photoUrl = photoUrl;

        }
        updateProfile(user, profileToUpdate)
        .then((res) => {
                dispatch(dispatch(uptadeUser(user)));
                console.log("Success", user);
                alert("Successfuly edited user!")
                navigate('/dashboard')
            })
            .catch((e) => {
                console.error("Error:", e);
            });
    } else {
        console.error("User not authenticated");
    }
};