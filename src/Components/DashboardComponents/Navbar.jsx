import React from 'react'
import './Navbar.css'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../Home/Nav.css'
import { useDispatch, useSelector } from 'react-redux'
import { SignOut } from '../../redux/CreatorsAction/AuthActionCreator'
const Navbar = () => {

    const dispatch = useDispatch();
    const { isLogged, user } = useSelector((state) => state.auth)
    const [success,setSuccess] = useState(false);
    const navigate = useNavigate();
    const handleLogout = (e) => {
      e.preventDefault();
      dispatch(SignOut(setSuccess));
    }

  return (
    <header className='h-navbar home-header'>
    <div className="nav-text-logo">
      <Link className='n text-logo h-logo' to={'/dashboard'}>B-Dropbox</Link>
    </div>
    <nav>
      <ul>
        {
          isLogged  ? (
            <>
              <li>
                <Link className="n nav-linkr l" onClick={handleLogout}>Logout</Link>
              </li>
              <li>
                <Link className="n nav-linkr r" to={'/'}>Home</Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link className="n nav-link r" to={'/register'}>Register</Link>
              </li>
              <li>
                <Link className="n nav-link l" to={'/login'}>Login</Link>
              </li>
            </>
          )
        }

      </ul>
    </nav>
  </header>
  )
}

export default Navbar