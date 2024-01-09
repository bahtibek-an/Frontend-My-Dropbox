import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { UserLogout } from "../../recovery/Reducer";
import { auth } from "../../config/firebase";
import "./menubar.css";
import Logo from"./dropbox_logo.png"

function Menubar() {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const dispatch = useDispatch();
  let user = JSON.parse(localStorage.getItem("localUser"));
  const [setUsers] = useState("");
  useEffect(() => {
    auth.onAuthStateChanged((e) => {
      setUsers(e);
    });
  });
  return (
    <header>
      <div className="container">
        <nav className="navbar">
          <h2 className="logo">
              <a href="">
                <img src={Logo} alt="Логотип"/>
              </a>
          </h2>
          <div className="dropdown">
            <div
              className="btn"
              onClick={() => setDropdownVisible(!dropdownVisible)}
            >
              <h1>⫶</h1>
            </div>
            <ul className={`dropdown-menu ${dropdownVisible ? "active" : ""}`}>
              <Link to={`/home/user/${user?.uid}`}>
                <li>
                  edit
                </li>
              </Link>
              <li onClick={() => dispatch(UserLogout())}>
                log out
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Menubar;
