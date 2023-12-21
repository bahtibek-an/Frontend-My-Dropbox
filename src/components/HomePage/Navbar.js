import React from "react"
import { Navbar, Nav } from "react-bootstrap"
import { Link } from "react-router-dom"
import dropbox from "./dropbox.png";

export default function NavbarComponent() {
  return (
    // style={{backgroundColor: "#651FFF"}}
    <Navbar  style={{backgroundColor: "lightgray"}} expand="sm" className="d-flex justify-content-between" >  
      <Navbar.Brand as={Link} to="/" className="text-light">
        <img src={dropbox} alt="" width="200" height="40"></img>
      </Navbar.Brand>
      <Nav>
        <Nav.Link as={Link} to="/user" className="text-dark">
          Edit Profile
        </Nav.Link>
      </Nav>
    </Navbar>
  )
}
