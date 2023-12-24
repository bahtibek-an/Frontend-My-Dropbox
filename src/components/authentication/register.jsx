    import React, { useState } from "react";
    import { Link, useNavigate } from "react-router-dom";
    import { auth } from '../firebase/firebase';
    import { createUserWithEmailAndPassword } from "firebase/auth";
    import { saveUserDataToFirebase } from "../firebase/firebase";

    export default function Register() {
        const [email, setEmail] = useState("");
        const [password, setPassword] = useState("");
        const [username, setUsername] = useState("");
        const [errorMessage, setErrorMessage] = useState("");
        const navigate = useNavigate();

        const signup = async (e) => {
            e.preventDefault();
            console.log("Signup function called.");

            if (email.trim() === '' || password.trim() === '' || username.trim() === '') {
                setErrorMessage("Incorrect email, username, or password.");
            } else {
                try {
                    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                    const userId = userCredential.user.uid;

                    await saveUserDataToFirebase(userId, { username, email });
                    console.log("User data saved successfully.");

                    setErrorMessage("");
                    navigate(`/login/${userId}`);
                } catch (err) {
                    console.error(err); 
                    setErrorMessage("Registration failed. Please try again.");
                }
            }
        };

        return (
            <div className="login">
                <div className="container">
                    <form onSubmit={signup} className="login-form">
                        <h1>Register</h1>
                        <label className="login-label">
                            <span className="login-email-p">Username</span>
                            <input type="text" className="login-input" onChange={(e) => setUsername(e.target.value)} /><br /><br />
                            <span className="login-email-p">Email</span>
                            <input type="email" className="login-input" onChange={(e) => setEmail(e.target.value)} /><br /><br />
                            <span className="login-email-p">Password</span>
                            <input type="password" className="login-input" onChange={(e) => setPassword(e.target.value)} />
                        </label>
                        <p className="error-message">{errorMessage}</p>
                        <button type="submit" className="login-button">Register</button>
                        <Link to={"/"} className="login-link">Login back</Link>
                    </form>
                </div>
            </div>
        )
    }
