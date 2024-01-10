import React, { useState, useContext } from "react";
import { signOut, updateProfile } from "firebase/auth";
import { auth } from "../firebaseEasyLib";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
    const { currentUser } = useContext(AuthContext);
    const [state, setState] = useState({
        randomName: "",
        isRandomNameActive: true, // Random ismni ishlatishni to'xtatish
    });


    const toggleRandomName = () => {
        setState((prevState) => ({
            ...prevState,
            isRandomNameActive: !prevState.isRandomNameActive,
        }));

        // Random ismni yangilash
        if (state.isRandomNameActive) {
            // generateRandomName();
        }
    };

    // Profilni edit qilish uchun 
    const changeDisplayName = () => {
        const newDisplayName = prompt('Please enter your new display name');

        if (newDisplayName) {
            console.log(currentUser);
            // Foydalanuvchining nomini o'zgartirish
            // Masalan, serverga yuborish, o'z ichida saqlash yoki boshqa xizmatlar bilan ishlash.
            updateProfile(currentUser, {
                displayName: newDisplayName,
            }).then(() => {
                console.log('Display Name updated successfully:', newDisplayName);
            }).catch((error) => {
                console.error('Error updating display name:', error);
            });
        } else {
            console.log('User cancelled or did not enter a new display name');
        }
    };

    const { randomName, isRandomNameActive } = state;

    return (
        <div className="navbar bg-dark blur p-1">
            {console.log(currentUser)}
            <div className="float-end">
                <a
                    href="#upload"
                    type="button"
                    className="btn btn-outline-primary m-1"
                    data-bs-toggle="modal"
                    data-bs-target="#newFolder"
                >
                    <b>Create Folder</b>
                </a>
                <a
                    href="#upload"
                    type="button"
                    className="btn btn-outline-success m-1"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                >
                    <b>File Upload</b>
                </a>
                <a
                    href="#Exit"
                    className=" btn btn-outline-danger m-1"
                    onClick={() => signOut(auth)}
                >
                    <b>Exit</b>
                </a>
            </div>

            <div className="float-end">
                <a className="navbar-brand text-white ml-5" href="/" onClick={toggleRandomName}>
                    <button style={{ padding: "3px" }} onClick={changeDisplayName}>Edit</button> <br/>
                    <b className="ml-5">
                        {currentUser.displayName && isRandomNameActive
                            ? `${currentUser.displayName}, Salom`
                            : `Salom ${randomName}`}
                    </b>
                </a>
            </div>
        </div>
    );
}

export default Navbar;