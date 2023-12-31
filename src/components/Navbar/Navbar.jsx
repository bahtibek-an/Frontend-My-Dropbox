import React from 'react'
import { getAuth, signOut } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { dropbox_logo, logout } from '../extra/icons'

function Navbar() {
  const navigate = useNavigate()
  const handleLogout = () => {
    const auth = getAuth()
    signOut(auth)
      .then(() => {
        navigate("/login")
      })
      .catch((error) => {
        console.error(error)
      })
  }
  return (
    <div>
    <nav class="navbar navbar-light bg-primary ">
    <div class="d-flex justify-content-between container">
      <a class="navbar-brand text-light" href="/home"><img src={dropbox_logo} alt="dropbox"/> Dropbox</a>
      <button className='btn btn-danger' onClick={handleLogout}><img src={logout} alt="logout" /></button>
    </div>
  </nav>
    </div>
  )
}

export default Navbar
