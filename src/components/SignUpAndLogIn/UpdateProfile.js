import React, { useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export default function UpdateProfile() {
  const inputEmail = useRef();
  const inputPassword = useRef();
  const inputPasswordConfirm = useRef();
  const { currentUser, updatePassword, updateEmail } = useAuth();
  const portal = useHistory();

  function handleSubmit(e) {
    e.preventDefault();
    if (inputPassword.current.value !== inputPasswordConfirm.current.value) {
      return alert("Passwords do not match");
    }

    const promises = [];

    if (inputEmail.current.value !== currentUser.email) {
      promises.push(updateEmail(inputEmail.current.value));
    }
    if (inputPassword.current.value) {
      promises.push(updatePassword(inputPassword.current.value));
    }

    Promise.all(promises)
      .then(() => {
        portal.push("/");
      })
      .catch(() => {
        alert("Failed to update account");
      })
      .finally(() => {
        alert("Profile Update Successfully!");
      });
  }

  return (
    <>
      <main className="main">
        <div className="register d-flex justify-content-center align-items-center position-absolute">
          <div className="container p-5">
              <form onSubmit={handleSubmit}>
                  <h1 className="card-title mb-3">Update Profile</h1>
                  <div className="form-floating mb-3">
                      <input type="email" ref={inputEmail} defaultValue={currentUser.email} className="form-control text-dark" id="floatingInput" placeholder="name@example.com" required />
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
                  <button type="submit" className="btn btn-primary w-100 mb-4">Update</button>
                  <button className="btn btn-primary w-100 mb-4 text-center text-muted fs-6"><Link to="/" role="button" className="text-white">Cancel</Link></button>
              </form>
          </div>
        </div>
      </main>
    </>
  );
};