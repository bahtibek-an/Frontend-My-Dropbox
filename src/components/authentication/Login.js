import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from "../../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import CenteredContainer from "./CenteredContainer"
import dropbox from "./dropbox.png";
import { isAbsolute } from "path"

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
    <CenteredContainer>
      <img className="w-100" style={{padding: 100}} width={isAbsolute} height={isAbsolute} src={dropbox} alt=""/>
      <Card>
        <Card.Body className="bg-dark">
          <h2 className="text-right text-white mb-4 ">Sign In</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label></Form.Label>
              <Form.Control className="bg-light text-dark" type="email" placeholder="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Control className="bg-light text-dark" type="password" placeholder="password" ref={passwordRef} required />
            </Form.Group>
            <Button disabled={loading} className="w-100" type="submit">
              Login
            </Button>
          </Form>
          <div className="w-100 text-left mt-3">
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>
          <div className="w-100 text-left text-white mt-2">
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </div>
        </Card.Body>
      </Card>
    </CenteredContainer>
  )
}
