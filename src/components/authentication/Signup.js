import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from "../../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import CenteredContainer from "./CenteredContainer"

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
    <div style={{backgroundColor: "white"}}>
      <CenteredContainer>
        <Card>
          <Card.Body className="bg-primary">
            <h2 className="text-center text-light mb-4">Sign Up</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group id="email">
                <Form.Control className="bg-primary text-light" placeholder="Enter your email" type="email" ref={emailRef} required />
              </Form.Group>
              <Form.Group id="password">
                <Form.Control className="bg-primary text-light" placeholder="Enter your password" type="password" ref={passwordRef} required />
              </Form.Group>
              <Form.Group id="password-confirm">
                <Form.Label className="text-light">Password Confirmation</Form.Label>
                <Form.Control className="bg-primary text-light" placeholder="Confirm your password" type="password" ref={passwordConfirmRef} required />
              </Form.Group>
              <Button disabled={loading} className="btn bg-info w-100" type="submit">
                Sign Up
              </Button>
            </Form>
          </Card.Body>
        </Card>
        <div className="bg-primary text-center text-light border border-light w-100 mt-2 p-3 h-50">
          Already have an account?<br/>
          <Link to="/login" style={{color: "#004ce4"}}>Login</Link>
        </div>
      </CenteredContainer>
    </div>
  )
}