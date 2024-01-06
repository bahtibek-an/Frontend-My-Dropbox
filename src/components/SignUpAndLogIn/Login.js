import React, { useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const Login = () => {
  const inputEmail = useRef();
  const inputPassword = useRef();
  const { login } = useAuth();
  const portal = useHistory();

  const handleUp = () => {
    portal.push("/signup");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await login(inputEmail.current.value, inputPassword.current.value);
      alert("Log In successfully!");
      portal.push("/");
    } catch {
      alert("Failed to log in");
    };
  };

  return (
    <>
      <main className="main">
        <div className="register d-flex justify-content-center align-items-center position-absolute">
          <div className="container p-5">
            <form onSubmit={handleSubmit}>
              <div>
                <h1 className="card-title mb-3">Login</h1>
                <div className="form-floating mb-3">
                  <input type="email" className="form-control text-dark" id="floatingInput" placeholder="name@example.com" ref={inputEmail} autoComplete="email" required />
                  <label for="floatingInput">Email address</label>
                </div>
              </div>
                <div>
                  <div className="form-floating mb-3">
                    <input type="password" className="form-control" id="floatingPassword" placeholder="Password" ref={inputPassword} autoComplete="current-password" required />
                    <label for="floatingPassword">Password</label>
                  </div>
                  <button type="submit" className="btn btn-primary w-100 mb-3">Log In</button>
                </div>
              </form>
              <p className="text-left fs-6">Doesn't have an account? <span onClick={handleUp} role="button" className="text-primary text-decoration-underline mb-3">Sign Up</span></p>
              <p role="button" className="text-primary text-left"><Link className="text-reset" to="/reset">Forgot password?</Link></p>
            </div>
        </div>
      </main>
    </>
  );
};

export default Login;