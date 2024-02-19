import React from "react"
import { Link } from "react-router-dom"
import './Navbar.css'

export default function NavbarComponent() {
  return (
    <div className="navbar-container" >  
      <Link to="/" className="navbar-con-link">
        Dropbox
      </Link>
      <Link to="/" className="navbar-con-link">
        Home
      </Link>
        <Link to="/user" className="navbar-con-profil">
          Profile
        </Link>
    </div>
  )
}
