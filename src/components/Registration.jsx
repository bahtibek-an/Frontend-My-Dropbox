import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

import { auth } from "./firebase"; // Make sure the path to your firebase.js is correct

function Registration() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegistration = async () => {
    const authInstance = getAuth();

    try {
      await createUserWithEmailAndPassword(authInstance, email, password);
      navigate("/dashboard"); // Redirect to dashboard after successful registration
    } catch (error) {
      console.error("Error registering:", error);
    }
  };

  return (
    <div className="ccenta">
      <div className="loger">
        <h3 className="register">Register</h3>
        <input
          className="inputs"
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />{" "}
        <br />
        <input
          className="inputs"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />{" "}
        <br />
        <button className="button" onClick={handleRegistration}>
          Register
        </button>
        <p className="gg">
          Already have an account?{" "}
          <Link className="link" to="/login">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Registration;
