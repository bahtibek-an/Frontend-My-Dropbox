import React, { useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const ResetPassword = () => {
  const inputEmail = useRef()
  const { resetPassword } = useAuth()
  const portal = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      await resetPassword(inputEmail.current.value);
      alert("Check your email");
      portal("/login");
    } catch {
      alert("Failed to reset password");
    };
  };

  return (
    <>
      <main className="main">
        <div className="register d-flex justify-content-center align-items-center position-absolute">
          <div className="container p-5">
            <form onSubmit={handleSubmit}>
              <h1 className="card-title mb-3">Password Reset</h1>
              <div className="form-floating mb-4"> 
                  <input type="email" className="form-control text-dark" id="floatingInput" placeholder="name@example.com" ref={inputEmail} autoComplete="email" required />
                  <label for="floatingInput">email</label>
              </div>
              <button type="submit" className="btn btn-primary w-100 mb-4">Reset password</button>
            </form>
            <p className="text-left fs-6">or <Link to={"/login"} role="button" className="text-primary text-decoration-underline">Log In</Link></p>
            <p className="text-left fs-6">Doesn't have an account? <Link to={"/signup"} role="button" className="text-primary text-decoration-underline">Sign Up</Link></p>
          </div>
        </div>
      </main>
    </>
  );
};

export default ResetPassword;