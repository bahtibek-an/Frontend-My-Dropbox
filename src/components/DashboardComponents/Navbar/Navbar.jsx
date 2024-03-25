import { Link } from "react-router-dom";
import "./Navbar.css";
import { useDispatch, useSelector } from "react-redux";
import { SignOutUser } from "../../../redux/actionCreators/authActionCreator";

const Navbar = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  return (
    <>
      <nav className="navbar navbar-expand-lg  navbar-light bg-white shadow-lg p-3">
        <Link className="navbar-brand ms-5 fw-bold " to="/dashboard">
          React Dropbox
        </Link>

        <ul className="navbar-nav ms-auto me-5 ">
          {isAuthenticated ? (
            <>
              <li className="nav-item mx-2">
                <p className="my=0 mt-2 mx-2">
                  <span className="text-dark">Welcome, </span>
                  <span className="fw-bold">{user.displayName}</span>
                </p>
              </li>
              <li className="nav-item mx-2">
                <Link className="btn btn-primary" to="/">
                  HomePage
                </Link>
              </li>
              <li className="nav-item">
                <button
                  className="btn btn-success "
                  onClick={() => dispatch(SignOutUser())}
                >
                  Logout
                </button>
              </li>
              <li className="nav-item mx-2">
                <Link className="btn btn-secondary" to="/dashboard/edit/user">
                  Edit Profile
                </Link>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item mx-2">
                <Link className="btn btn-primary btn-sm" to="/login">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link className="btn btn-success btn-sm" to="/register">
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
