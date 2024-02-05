import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from "../../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import CenteredContainer from "../CenteredContainer/CenteredContainer"
import './Signup.css'

export default function Signup() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const { signup } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  async function handleSubmit(e) {
    e.preventDefault()

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match")
    }

    try {
      setError("")
      setLoading(true)
      await signup(emailRef.current.value, passwordRef.current.value)
      history.push("/")
    } catch {
      setError("Failed to create an account")
    }

    setLoading(false)
  }

  return (
    <div className="up-container">
    <CenteredContainer>
        <div className="up-con-item">
          <h3 className="up-con-name">Sign Up</h3>
          {error && <Alert variant="danger">{error}</Alert>}
          <form onSubmit={handleSubmit}>
              <input className="up-con-input-email" placeholder="Enter your email" type="email" ref={emailRef} required />
              <input className="up-con-input-pasword" placeholder="Enter your password" type="password" ref={passwordRef} required />
              <label className="up-con-input-txt">Password Confirmation</label>
              <input className="up-con-input-repasword" placeholder="Confirm your password" type="password" ref={passwordConfirmRef} required />
            <button className="up-con-sign">Sign Up</button>
          </form>
        </div>
      <div className="up-con-in">
        Already have an account? <Link to="/login">Log In</Link>
      </div>
    </CenteredContainer>
    </div>
  )
}
