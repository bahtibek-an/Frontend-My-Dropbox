import React, { useRef, useState } from "react"
import { Alert } from "react-bootstrap"
import { useAuth } from "../../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import CenteredContainer from "../CenteredContainer/CenteredContainer"
import dropbox from "../img/dropbox.png";
import './Login.css'

export default function Login() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const { login } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setError("")
      setLoading(true)
      await login(emailRef.current.value, passwordRef.current.value)
      history.push("/")
    } catch {
      setError("Failed to log in")
    }

    setLoading(false)
  }
  return (
    <div className="login-container">
    <CenteredContainer>
      <div>
        <div className="login-con-item">
            <img className="login-con-img" src={dropbox} alt=""/>
          <h2 className="login-con-names">Log In</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <form onSubmit={handleSubmit}>
            <div className="login-con-email-item" id="email">
              <input className="login-con-email" type="email" placeholder="Email" ref={emailRef} required />
            </div>
            <div className="login-con-email-item" id="password">
              <input className="login-con-email" type="password" placeholder="Password" ref={passwordRef} required />
            </div>
            <button disabled={loading} className="login-con-button">
              Log In
            </button>
          </form>
          <div >
          </div>
          <p className="login-con-up">
            Need an account? <Link to="/signup">Sign Up</Link>
          </p>
        </div>
      </div>
      
    </CenteredContainer>
    </div>
      
  )
}
