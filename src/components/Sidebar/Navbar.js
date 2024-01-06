import React from "react"; 
import { useHistory } from "react-router-dom";
import dropbox from "./dropbox.png";

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
      <img src={dropbox} alt="" width="200" height="40"></img>
        <div className="d-flex">
            <button onClick={handleClick} className="btn btn-primary me-3">Edit Profile</button>
            <button onClick={logOut} className="btn btn-primary">Log Out</button>
        </div>
      </nav>
    </>
  );
};

export default Navbar;