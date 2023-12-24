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
        <div class="bg-circles position-fixed">
          <div class="circle-1"></div>
          <div class="circle-2"></div>
          <div class="circle-3"></div>
          <div class="circle-4"></div>
          <div class="circle-5"></div>
          <div class="circle-6"></div>
          <div class="circle-7"></div>
        </div> 
        <div className="register d-flex justify-content-center align-items-center position-absolute">
          <div className="container p-5">
            <form onSubmit={handleSubmit}>
              <h1 className="card-title mb-3">Reset password</h1>
              <div className="form-floating mb-4"> 
                  <input type="email" className="form-control text-dark" id="floatingInput" placeholder="name@example.com" ref={inputEmail} autoComplete="email" required />
                  <label for="floatingInput">Email address</label>
              </div>
              <button type="submit" className="btn btn-success w-100 mb-4">Reset password</button>
            </form>
            <p className="text-center text-muted fs-6">Back to <Link to={"/login"} role="button" className="text-success text-decoration-underline">Log In</Link></p>
          </div>
        </div>
      </main>
    </>
  );
};

export default ResetPassword;