import React, { useState } from "react"
import { Alert } from "react-bootstrap"
import { useAuth } from "../../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import CenteredContainer from "../CenteredContainer/CenteredContainer"
import './Profile.css'

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
    <div className="profile-container">
    <CenteredContainer>
      <div className="profile-con-item">
          <h2 className="profile-con-txt">Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <p className="profile-con-email">Email: <span>{currentUser.email}</span></p> 
          
      </div>
        <button className="profile-con-out" onClick={handleLogout}>
          Log Out
        </button>
    </CenteredContainer>
    </div>
  )
}
