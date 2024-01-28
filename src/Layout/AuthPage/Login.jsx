import React, { useState } from "react";
import "./Auth.css";
import { useDispatch } from "react-redux";
import { UserLogin } from "../../redux/extraReducer";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(UserLogin({ email, password }));
  };

  return (
    <div>
      <div className="auth">
        <form className="form-1" onSubmit={handleSubmit}>
          <h1>Login</h1>
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
          <span>
            You don't have an account?{" "}
            <a href="/register">
              <b>Sign up</b>
            </a>{" "}
          </span>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
