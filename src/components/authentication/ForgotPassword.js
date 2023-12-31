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
    <div style={{backgroundColor: "#FBF3D5"}}>
    <CenteredContainer>
      <Card>
        <Card.Body className="bg-dark">
          <h2 className="text-center mb-4 text-light">Password Reset</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {message && <Alert variant="success">{message}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              {/* <Form.Label>Email</Form.Label> */}
              <Form.Control className="text-light bg-dark" type="email"  placeholder="Email" ref={emailRef} required />
            </Form.Group>
            <Button disabled={loading} className="w-100 btn btn-success" type="submit">
              Reset Password
            </Button>
          </Form>
          <div className="w-100 text-center mt-3">
            <Link to="/login" style={{color: "green"}}>Login</Link>
          </div>
          <div className="w-100 text-center mt-2 text-light">
            Need an account? <Link to="/signup" style={{color: "green"}}>Sign Up</Link>
          </div>
        </Card.Body>
      </Card>
    </CenteredContainer>
    </div>
  )
}
