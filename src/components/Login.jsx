import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

import { auth } from "./firebase"; // Make sure the path to your firebase.js is correct
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    const authInstance = getAuth();

    try {
      await signInWithEmailAndPassword(authInstance, email, password);
      navigate("/dashboard"); // Redirect to dashboard after successful login
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <div className="ccenta">
      <div className="loger">
        <h3 className="register">Login</h3>
        <input
          className="inputs"
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <input
          className="inputs"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button className="button" onClick={handleLogin}>
          Login
        </button>
        <p className="gg">
          Don't have an account?{" "}
          <Link className="link" to="/register">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
