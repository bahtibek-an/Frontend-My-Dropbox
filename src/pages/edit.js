import React, { useState, useEffect } from "react";
import { auth } from "../firebase";
import { EmailAuthProvider, onAuthStateChanged, reauthenticateWithCredential, updatePassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const EditUser = () => {
  const navigate = useNavigate();
  const [authUser, setAuthUser] = useState(null);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      setAuthUser(user);
    });
  
    return () => {
      listen();
    };
  }, []);
  

  const userUpdate = (e) => {
    e.preventDefault();
    
    if (!authUser) {
      return;
    }

    const credential = EmailAuthProvider.credential(
      authUser.email,
      oldPassword
    );

    reauthenticateWithCredential(authUser, credential)
      .then(() => {
        updatePassword(authUser, newPassword)
          .then(() => {
            console.log("Password updated successfully");
            navigate("/home");
          })
          .catch((error) => {
            setErrorMessage("Failed to update password");
          });
      })
      .catch((error) => {
        setErrorMessage("Incorrect old password");
      });
  };

  return (
    // <div className="modal position">
    //   <div className="brand login-text"></div>

      <div className="form position">
        <div className="form-inner">
          <div className="tabs">
            <ul className="tabs">
              <h1 className="h1color"> Edit User </h1>
            </ul>
            <div className="form-content current" id="member">
              <form id="sign-in">
                <input
                  type="email"
                  name="login-id"
                  id="user"
                  placeholder="Email"
                  className="field"
                  value={`authUser ? ${authUser.email} : ""`}
                  readOnly
                />
                <input
                  type="password"
                  name="oldpw"
                  placeholder="Old Password"
                  className="field"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  required
                />
                <input
                  type="password"
                  name="newpw"
                  placeholder="New Password"
                  className="field"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
                <div className="clear"></div>
                <div className="signedIn">
                  Signed In as{" "}
                  <span className="userEmail">
                    {`authUser ? ${authUser.email} : ""`}
                  </span>
                </div>
                {errorMessage && <div className="error">{errorMessage}</div>}
                <button
                  onClick={userUpdate}
                  id="btn"
                  name="sign-in-button"
                  className="flat-button signin"
                >
                  Update
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    // </div>
  );
};

export default EditUser;