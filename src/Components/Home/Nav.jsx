import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Nav.css'
import { useDispatch, useSelector } from 'react-redux'
import { SignOut } from '../../redux/CreatorsAction/AuthActionCreator'

const Nav = () => {
  const dispatch = useDispatch();
  const { isLogged , user } = useSelector((state) => state.auth)
  const [success,setSuccess] = useState(false);
  const navigate = useNavigate();
  console.log({isLogged,user});
  const handleLogout = (e) => {
    dispatch(SignOut(setSuccess));
  }

  return (
    <header className='home-header'>
      <div className="nav-text-logo">
        <Link className='n text-logo' to={'/'}>B-Dropbox</Link>
      </div>
      <nav>
        <ul>
          {
            isLogged  ? (
              <>
                <li>
                  <Link className="n nav-link r" to={'/dashboard'}>Dashboard</Link>
                </li>
                <li>
                  <Link className="n nav-linkr l" onClick={handleLogout}>Logout</Link>
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

export default Nav
