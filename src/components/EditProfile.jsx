import { useState, useEffect } from "react";
import { auth } from "./firebase";
import { getAuth, updateEmail, updatePassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";

function EditProfile() {
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [authUser, setAuthUser] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setAuthUser(user);
      if (user) {
        setNewEmail(user.email);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleEditProfile = async () => {
    try {
      if (authUser) {
        if (newEmail) {
          await updateEmail(authUser, newEmail);
        }
        if (newPassword && newPassword === confirmPassword) {
          await updatePassword(authUser, newPassword);
        }

        setNewEmail("");
        setNewPassword("");
        setConfirmPassword("");

        console.log("Profile updated successfully");
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="cards_3">
      <div className="bg-dark">
        <h3 className="register">Edit Profile</h3>
        <input
          className="inputs"
          type="email"
          placeholder="New Email"
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
        />
        <input
          className="inputs"
          type="password"
          placeholder="New Password"
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <input
          className="inputs"
          type="password"
          placeholder="Confirm Password"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <br />
        <button className="button m-3" onClick={handleEditProfile}>
          Save Changes
        </button>
        <button className="buttons">
          <Link className="links" to="/dashboard">
            Back
          </Link>
        </button>
      </div>
    </div>
  );
}

export default EditProfile;
