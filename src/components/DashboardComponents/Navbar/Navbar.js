import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom"
import { SignOutUser } from "../../../redux/actionCreators/authActionCreator";
import '../../../CSS/Navbar.css';

const Navbar = () => {
    const { isAuthenticated, user } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    return( 
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <Link className="navbar-brand ms-5" to="/dashboard">Dashboard</Link>

            <ul className="navbar-nav ms-auto me-5">
                {
                    isAuthenticated ? (
                        <>
                            <li className="nav-item dropdown">
                                <div className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    {user.displayName}
                                </div>
                                <ul className="dropdown-menu dropdown-menu-end dropdown-menu-dark" aria-labelledby="navbarScrollingDropdown">
                                    <li><Link className="dropdown-item" to="/">Home</Link></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li><button className="dropdown-item" onClick={() => dispatch(SignOutUser())}>Sign Out</button></li>
                                </ul>
                            </li>
                        </>
                    ) : (
                        <>
                             <li className="nav-item mx-2">
                                <Link className="btn btn-primary btn-sm" to="/login">Login</Link>
                            </li>
                            <li className="nav-item mx-2">
                                <Link className="btn btn-success btn-sm" to="/register">Sign Up</Link>
                            </li>
                        </>
                    )
                }
            </ul>
        </nav>   
    )
}

export default Navbar;