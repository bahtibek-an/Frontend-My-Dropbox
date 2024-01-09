import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { UserCreate } from "../../recovery/Reducer";

function SignUp() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch("");
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      UserCreate({ userName: userName, email: email, password: password })
    );
  };
  return (
    <div>
      <div className="authentication">
        <form className="registration-form" onSubmit={handleSubmit}>
          <h1>Sign up</h1>
          <label style={{color: "#000"}} htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            id="username"
            required
            onChange={(e) => setUserName(e.target.value)}
          />
          <label style={{color: "#000"}} htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <label style={{color: "#000"}} htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <span style={{ color: "#000" }}>
            Already have an account?
            <Link style={{color: "blue"}} to="/">Sign in</Link>
          </span>
          <button type="submit">Sign up</button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
