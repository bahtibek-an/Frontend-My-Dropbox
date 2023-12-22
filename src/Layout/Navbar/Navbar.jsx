import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear, faSignOut, faBars } from "@fortawesome/free-solid-svg-icons";
import "./Navbar.css";
import { useDispatch } from "react-redux";
import { UserLogout } from "../../redux/extraReducer";
import { auth } from "../../api/firebase";
import { Link } from "react-router-dom";

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
    <header>
      <div className="container">
        <nav className="navbar">
          <h1>DROPBOX</h1>
          <div className="dropdown">
            <div
              className="btn"
              onClick={() => setDropdownVisible(!dropdownVisible)}
            >
              <span>{users?.displayName}</span>
              <h2>
                <FontAwesomeIcon icon={faBars} />
              </h2>
            </div>
            <ul className={`dropdown-menu ${dropdownVisible ? "active" : ""}`}>
              <li>{user?.displayName}</li>
              <Link to={`/home/user/${user?.uid}`}>
                <li>
                  Settings <FontAwesomeIcon icon={faGear} />
                </li>
              </Link>

              <li onClick={() => dispatch(UserLogout())}>
                Sign out <FontAwesomeIcon icon={faSignOut} />
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
