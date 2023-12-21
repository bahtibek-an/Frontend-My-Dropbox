import React, { useState } from "react"
import { Card, Button, Alert } from "react-bootstrap"
import { useAuth } from "../../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import CenteredContainer from "./CenteredContainer"
import dropbox from "./dropbox.png";
import { isAbsolute } from "path"

export default function Profile() {
  const [error, setError] = useState("")
  const { currentUser, logout } = useAuth()
  const history = useHistory()
  async function handleLogout() {
    setError("")
    try {
      await logout()
      history.push("/login")
    } catch {
      setError("Failed to log out")
    }
  }
  return (
    <CenteredContainer>
      <img className="w-100" style={{padding: 100}} width={isAbsolute} height={isAbsolute} src={dropbox} alt=""/>
      <Card className="bg-white">
        <Card.Body className="text-primary">
          <h2 className="text-right text-dark mb-4">Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <strong className="text-dark">Email:</strong> {currentUser.email}
          <Link to="/update-profile" className="btn btn-primary w-100 mt-3 mb-2">
            Update Profile
          </Link>
          <Button as={Link} to="/" className="w-100" type="submit">
              Back
          </Button>
        </Card.Body>
      </Card>
      <div className="w-100 text-left mt-2 bg-light">
        <Button variant="link" onClick={handleLogout}>
          Log Out
        </Button>
      </div>
    </CenteredContainer>
  )
}
