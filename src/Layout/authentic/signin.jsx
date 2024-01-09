import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { UserLogin } from "../../recovery/Reducer";
import { Link } from "react-router-dom";
import "./authentic.css";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch("");

  const handleSignIn = (e) => {
    e.preventDefault();
    dispatch(UserLogin({ email: email, password: password }));
  };
  return (
    <div>
      <div className="authentication">
        <form className="registration-form" onSubmit={handleSignIn}>
          <h1>sign In</h1>
          <label style={{color: "#000"}} htmlFor="email">email</label>
          <input
            type="email"
            name="email"
            id="email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <label style={{color: "#000"}} htmlFor="password">password</label>
          <input
            type="password"
            name="password"
            id="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <span style={{ color: "#000" }}>
            No account?
            <Link style={{color: "blue"}}to="/register">sign up</Link>
          </span>
          <button type="submit">sign in</button>
        </form>
      </div>
    </div>
  );
}

export default SignIn;
