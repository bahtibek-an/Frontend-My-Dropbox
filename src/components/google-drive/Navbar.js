import React from "react"
import { Navbar, Nav } from "react-bootstrap"
import { Link } from "react-router-dom"

export default function NavbarComponent() {
  return (
    
    <Navbar style={{backgroundColor: "#004ce4"}} expand="sm" className="d-flex justify-content-between" >  
      <Navbar.Brand as={Link} to="/" className="text-light">
        Dropbox
      </Navbar.Brand>
      <Nav>
        <Nav.Link as={Link} to="/user" className="text-light">
          Profile
        </Nav.Link>
      </Nav>
    </Navbar>
  )
}