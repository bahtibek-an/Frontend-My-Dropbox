import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleLogin = async () => {
    const authInstance = getAuth();
    try {
      await signInWithEmailAndPassword(authInstance, email, password);
      navigate("/dash");
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };
  return (
    <div className="container login-site">
      <div className="bg-danger border border-primary">
        <h2 className="text-center text-white m-3">Login</h2>
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
        <button style={{marginTop: "15px"}} className="btn btn-info" onClick={handleLogin}>
          Login
        </button>
        <p className="text">
          Are you don't have an account?{" "}
          <Link className="link text-white" to="/register">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
