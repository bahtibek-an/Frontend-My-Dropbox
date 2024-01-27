import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from "../../contexts/AuthContext"
import { Link } from "react-router-dom"
import CenteredContainer from "./CenteredContainer"

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
    <div style={{backgroundColor: "white"}}>
      <CenteredContainer>
        <Card>
          <Card.Body className="bg-primary">
            <h2 className="text-center text-light mb-4">Password Reset</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            {message && <Alert variant="success">{message}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group id="email">
                {/* <Form.Label>Email</Form.Label> */}
                <Form.Control className="bg-primary text-light" type="email"  placeholder="Email" ref={emailRef} required />
              </Form.Group>
              <Button disabled={loading} className="btn bg-info text-light w-100" type="submit">
                Reset Password
              </Button>
            </Form>
            <div className="text-center w-100 mt-3">
              <Link to="/login" style={{color: "#004ce4"}}>Login</Link>
            </div>
            <div className="text-center text-light w-100 mt-2">
              Need an account? <Link to="/signup" style={{color: "#004ce4"}}>Sign Up</Link>
            </div>
          </Card.Body>
        </Card>
      </CenteredContainer>
    </div>
  )
}