import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebaseEasyLib";
import { AuthContext } from "../context/AuthContext";


class Navbar extends React.Component {
    static contextType = AuthContext;

    render() {
        const { currentUser } = this.context;

        return (
            <div className="navbar bg-dark blur p-1">
                <a className="navbar-brand text-white ml-5 " href="/">
                    <b className="ml-5">
                        👨‍💻 Welcome <b>{currentUser.displayName}</b>
                    </b>
                </a>
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
            </div>
        );
    }
}

export default Navbar;
