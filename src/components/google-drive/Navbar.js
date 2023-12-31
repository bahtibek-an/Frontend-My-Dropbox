import React from "react"
import { Navbar, Nav } from "react-bootstrap"
import { Link } from "react-router-dom"

export default function NavbarComponent() {
  return (
    // style={{backgroundColor: "#651FFF"}}
    <Navbar bg="dark" expand="sm" className="d-flex justify-content-between" >  
      <Navbar.Brand as={Link} to="/" className="text-light">
        Dropbox
      </Navbar.Brand>
      <Nav>
        <Nav.Link as={Link} to="/user" className="text-light bg-dark">
          Profile
        </Nav.Link>
      </Nav>
    </Navbar>
  )
}
