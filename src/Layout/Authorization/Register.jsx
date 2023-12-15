/** @format */

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { UserCreate, UserLogin } from "../../redux/extraReducer";

function Register() {
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
      <div class="auth">
        <form class="form-1" onSubmit={handleSubmit}>
          <h1>Register</h1>
          <label for="username">Username</label>
          <input
            type="text"
            name="username"
            id="username"
            required
            onChange={(e) => setUserName(e.target.value)}
          />
          <label for="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <label for="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <span style={{ color: "#fff" }}>
            Already Have accaunt?
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
