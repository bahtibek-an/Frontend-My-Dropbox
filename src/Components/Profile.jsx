import { Avatar } from "@mui/material";
import React, { useState, useEffect } from "react";
import "./Profile.css";
import { getUserData } from "../firebase/firebaseAPI";
import { Link } from "react-router-dom";
import { updatePassword } from "firebase/auth"
import { auth } from "../firebase/firebase";

function Profile() {
  const [profileImage, setProfileImage] = useState("/path/to/profile-image.png");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const userData = await getUserData();
        const { profileImageURL, name } = userData;
        setProfileImage(profileImageURL);
        setName(name);
      } catch (error) {
        console.log("Failed to fetch profile data:", error);
      }
    };

    fetchProfileData();
  }, []);

  const handlePasswordChange = async () => {
    if (newPassword !== "" && newPassword === confirmPassword) {
      setPasswordError("");

      try {
        await updatePassword(auth.currentUser, newPassword);
        setNewPassword("");
        setConfirmPassword("");
        alert("Success");
      } catch (error) {
        setError("Failed to update password.");
      }
    } else {
      setPasswordError("Passwords do not match.");
    }
  };

  return (
    <div className="profile">
      <div id="navigation">
        <Link to="/">
          <span className="link_home">Home</span>
        </Link>
        <p className="icon">&gt;</p>
        <Link to="/profile">
          <span className="link_profile">Profile</span>
        </Link>
      </div>
      <div className="information">
        <div className="profile-info">
          <div className="avatar-wrapper">
            <Avatar sx={{ width: 150, height: 150 }} id="avatar" src={profileImage} />
          </div>
          <div className="name">
            <h2>{name}</h2>
          </div>
        </div>
        <div id="password-section">
          <p className="section-title">Change New Password:</p>
          <div id="password-form">
            <input
              id="new-password"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password"
            />
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
            />
            <button className="change_btn" onClick={handlePasswordChange}>
              Change Password
            </button>
            {passwordError && <p className="error">{passwordError}</p>}
          </div>
        </div>
        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
}

export default Profile;