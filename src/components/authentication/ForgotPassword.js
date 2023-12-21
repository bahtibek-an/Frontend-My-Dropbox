import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from "../../contexts/AuthContext"
import { Link } from "react-router-dom"
import CenteredContainer from "./CenteredContainer"
import dropbox from "./dropbox.png";
import { isAbsolute } from "path"

export default function ForgotPassword() {
  const emailRef = useRef()
  const { resetPassword } = useAuth()
  const [error, setError] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setMessage("")
      setError("")
      setLoading(true)
      await resetPassword(emailRef.current.value)
      setMessage("Check your inbox for further instructions")
    } catch {
      setError("Failed to reset password")
    }

    setLoading(false)
  }

  return (
    <CenteredContainer>
      <img className="w-100" style={{padding: 100}} width={isAbsolute} height={isAbsolute} src={dropbox} alt=""/>
      <Card>
        <Card.Body className="bg-dark">
          <h2 className="text-right mb-4 text-white">Password Reset</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {message && <Alert variant="success">{message}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              {/* <Form.Label>Email</Form.Label> */}
              <Form.Control className="text-dark bg-light" type="email"  placeholder="email" ref={emailRef} required />
            </Form.Group>
            <Button disabled={loading} className="w-100" type="submit">
              Reset Password
            </Button>
          </Form>
          <div className="w-100 text-left mt-3 text-white">
            or <Link to="/login">Login</Link>
          </div>
          <div className="w-100 text-left mt-2 text-white">
            Doesn't have an account? <Link to="/signup">Sign Up</Link>
          </div>
        </Card.Body>
      </Card>
    </CenteredContainer>
  )
}
