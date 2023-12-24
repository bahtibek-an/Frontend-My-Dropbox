import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase/firebase';
import { Link, useNavigate } from "react-router-dom";
import "../styles/login.css"

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        if (email.trim() === '' || password.trim() === '') {
            setErrorMessage("Incorrect email or password.");
            return;
        }

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            setErrorMessage("");

            const userId = userCredential.user.uid;

            navigate(`/login/${userId}`);
        } catch (error) {
            console.error(error);
            setErrorMessage("There was an error logging in. Please check your information and try again.");
        }
    };

    return (
        <div className="login">
            <div className="container">
                <form onSubmit={handleLogin} className="login-form">
                    <h1>Login</h1>
                    <label className="login-label">
                        <span className="login-email-p">Email</span>
                        <input type="email" className="login-input" value={email} onChange={(e) => setEmail(e.target.value)} /><br /><br />
                        <span className="login-email-p">Password</span>
                        <input type="password" className="login-input" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </label>
                    <p className="error-message">{errorMessage}</p>
                    <button type="submit" className="login-button">Login</button>
                    <Link to={"/register"} className="login-link">Register</Link>
                </form>
            </div>
        </div>
    )
}

export default Login;
