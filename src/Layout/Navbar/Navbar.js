import React, { useEffect, useState } from "react";
import { userAvatar } from "../../userAvatar/index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear, faSignOut } from "@fortawesome/free-solid-svg-icons";
import "./Navbar.css";
import { useDispatch } from "react-redux";
import { UserLogout } from "../../redux/extraReducer";
import { auth } from "../../firebase/firebase";

function Navbar() {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const dispatch = useDispatch();
  const [users, setUsers] = useState("");

  useEffect(() => {
    auth.onAuthStateChanged((e) => {
      setUsers(e);
    });
  }, []);

  return (
    <nav className="navbar">
      <h2>Dropbox</h2>
      <div className="dropdown">
        <div
          className="btn"
          onClick={() => setDropdownVisible(!dropdownVisible)}
        >
          <span>{users?.displayName || "Guest"}</span>
          <img src={userAvatar} alt="" className="user-avatar" />
        </div>
        <ul className={`dropdown-menu ${dropdownVisible ? "active" : ""}`}>
          {users ? (
            <>
              <li>{users?.email}</li>
              <li>
                <a href={`/home/user/${users?.uid}`}>
                  Settings <FontAwesomeIcon icon={faGear} />
                </a>
              </li>
              <li onClick={() => dispatch(UserLogout())}>
                Sign out <FontAwesomeIcon icon={faSignOut} />
              </li>
            </>
          ) : (
            <li>Login</li>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
