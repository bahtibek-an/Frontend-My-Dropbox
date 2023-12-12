import React from "react"; 
import { useHistory } from "react-router-dom";

const Navbar = () => {
  const portal = useHistory();
  const logOut = () => {
    alert("Log Out Successfully!");
    portal.push("/login");
  }
  const handleClick = () => {
    portal.push("/update-profile");
  }

  return (
    <>
      <nav className="navbar p-3 border-bottom">
        <h3>My Dropbox</h3>
        <div className="d-flex">
            <button onClick={handleClick} className="btn btn-success me-3">Update Profile</button>
            <button onClick={logOut} className="btn btn-success">Log Out</button>
        </div>
      </nav>
    </>
  );
};

export default Navbar;