import React, { useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const Signup = () => {
  const inputEmail = useRef();
  const inputPassword = useRef();
  const inputPasswordConfirm = useRef();
  const { signup } = useAuth();
  const portal = useHistory();
   
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (inputPassword.current.value !== inputPasswordConfirm.current.value) {
      return alert("Passwords do not match");
    }

    try {
      alert("Sign Up Successfully!");
      await signup(inputEmail.current.value, inputPassword.current.value);
      portal.push("/");
    } catch {
      alert("Failed to create an account!");
    }
  }

  return (
    <>
      <main className="main">
        <div class="bg-circles position-fixed">

        </div>
        <div className="register d-flex justify-content-center align-items-center position-absolute">
          <div className="container p-5">
              <form onSubmit={handleSubmit}>
                  <h1 className="text-left mb-3">Sign Up</h1>
                  <div className="form-floating mb-3">
                      <input type="email" ref={inputEmail} className="form-control text-dark" id="floatingInput" placeholder="name@example.com" required />
                      <label for="floatingInput">Email address</label>
                  </div>
                  <div className="form-floating mb-3">
                      <input type="password" ref={inputPassword} className="form-control" id="floatingPassword" placeholder="Password" required />
                      <label for="floatingPassword">Password</label>
                  </div>
                  <div className="form-floating mb-4">
                      <input type="password" ref={inputPasswordConfirm} className="form-control" id="floatingPassword" placeholder="Password" autoComplete="current-password" required />
                      <label for="floatingPassword">Confirm password</label>
                  </div>
                  <button type="submit" className="btn btn-primary w-100 mb-3">Sign Up</button>
              </form>
              <p className="text-left fs-6">Have an account? <Link to="/login" role="button" className="text-primary text-decoration-underline">Log In</Link></p>
          </div>
        </div>
      </main>
    </>
  );
};

export default Signup;