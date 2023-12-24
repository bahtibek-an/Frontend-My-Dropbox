import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

function Registration() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleRegistration = async () => {
    const authInstance = getAuth();
    try {
      await createUserWithEmailAndPassword(authInstance, email, password);
      navigate("/dash");
    } catch (error) {
      console.error("Error registering:", error);
    }
  };
  return (
    <div className="container login-site">
      <div className="bg-danger border border-primary">
        <h2 className="text-center text-white m-3">Register</h2>
        <input
          className="input"
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="input"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          style={{ marginTop: "15px" }}
          className="btn btn-info"
          onClick={handleRegistration}
        >
          Register
        </button>
        <p className="text">
          Already have an account?{" "}
          <Link className="link text-white" to="/login">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Registration;
