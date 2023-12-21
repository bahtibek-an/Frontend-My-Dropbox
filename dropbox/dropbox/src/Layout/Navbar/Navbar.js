/** @format */

import React, { useEffect, useState } from "react";
import { defaultUserImg } from "../../Assets";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear, faSignOut } from "@fortawesome/free-solid-svg-icons";
import "./Navbar.css";
import { useDispatch } from "react-redux";
import { UserLogout } from "../../redux/extraReducer";
import { auth } from "../../api/firebase";
function Navbar() {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const dispatch = useDispatch();
  let user = JSON.parse(localStorage.getItem("localUser"));
  const [users, setUsers] = useState("");
  useEffect(() => {
    auth.onAuthStateChanged((e) => {
      setUsers(e);
    });
  }, []);
  return (
    <nav className='navbar'>
      <h2>Dropbox</h2>
      <div className='dropdown'>
        <div
          className='btn'
          onClick={() => setDropdownVisible(!dropdownVisible)}>
          <span>{users?.displayName}</span>
          <img src={defaultUserImg} alt='' />
        </div>
        <ul className={`dropdown-menu ${dropdownVisible ? "active" : ""}`}>
          <li>{user?.email}</li>
          <a href={`/home/user/${user?.uid}`}>
            <li>
              Settings <FontAwesomeIcon icon={faGear} />{" "}
            </li>
          </a>

          <li onClick={() => dispatch(UserLogout())} >
            Sign out <FontAwesomeIcon icon={faSignOut} style={{marginLeft:"60%", marginTop:"-29%"}}/>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
