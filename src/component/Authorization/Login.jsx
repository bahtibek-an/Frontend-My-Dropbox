import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { UserLogin } from "../../redux/extraReducer";
import { Link } from "react-router-dom";
import "./Auth.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [inputStatus, setInputStatus] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();

  // ...

const handleSubmit = (e) => {
  e.preventDefault();
  dispatch(UserLogin({ email, password }));

  // Example: Set input status based on validation
  if (email === "") {
    setInputStatus((prev) => ({ ...prev, email: "error" }));
  } else {
    setInputStatus((prev) => ({ ...prev, email: "success" }));
  }

  if (password === "") {
    setInputStatus((prev) => ({ ...prev, password: "error" }));
  } else {
    setInputStatus((prev) => ({ ...prev, password: "success" }));
  }

  // Add or remove classes for background color animation
  const formContainer = document.querySelector(".form-1");
  formContainer.classList.remove("error", "success");
  if (inputStatus.email === "error" || inputStatus.password === "error") {
    formContainer.classList.add("error");
  } else if (inputStatus.email === "success" && inputStatus.password === "success") {
    formContainer.classList.add("success");
  }
};

// ...


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
            className={`${
              inputStatus.email === "error" ? "input-error" : ""
            } ${inputStatus.email === "success" ? "input-success" : ""}`}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            required
            className={`${
              inputStatus.password === "error" ? "input-error" : ""
            } ${
              inputStatus.password === "success" ? "input-success" : ""
            }`}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span style={{ color: "#fff" }}>
            You do not have an account?{" "}
            <Link to="/register">
              <b>Sign up</b>
            </Link>
          </span>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
