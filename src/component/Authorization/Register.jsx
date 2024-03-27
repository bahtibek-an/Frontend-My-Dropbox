import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { UserCreate } from "../../redux/extraReducer";
import "./Auth.css";

function Register() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(UserCreate({ userName, email, password }));
  };

  return (
    <div>
      <div className="auth">
        <form className="form-1" onSubmit={handleSubmit}>
          <h1>Register</h1>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            id="username"
            required
            onChange={(e) => setUserName(e.target.value)}
          />
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <span style={{ color: "#fff" }}>
            Already have an account?
            <Link to="/">
              <b>Login</b>
            </Link>
          </span>
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
}

export default Register;