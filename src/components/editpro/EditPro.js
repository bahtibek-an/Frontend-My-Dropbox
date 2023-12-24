import { useState, useEffect } from "react";
import { auth } from "../firebase/firebase";
import { updateEmail, updatePassword } from "firebase/auth";
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
        console.log("Profile Edit successfully");
        navigate("/dash");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };
  return (
    <div className="container login-site">
      <div className="bg-danger border border-primary">
        <h2 className="text-center text-white m-3">Edit Profile</h2>
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
        <button className="btn btn-info m-3" onClick={handleEditProfile}>
          Save Changes
        </button>
        <Link className="links text-white" to="/dash">
          Back
        </Link>
      </div>
    </div>
  );
}

export default EditProfile;
