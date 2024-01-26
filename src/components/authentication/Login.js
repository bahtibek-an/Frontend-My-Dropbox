import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from "../../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import CenteredContainer from "./CenteredContainer"
import dropbox from "./dropbox.png"

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
    <div style={{backgroundColor: "white"}}>
      <CenteredContainer >
        <Card >
          <Card.Body className="bg-primary rounded" >
              <img className="w-100" width={50} height={250} src={dropbox} alt="dropbox"/>

              <h2 className="text-center text-light mb-4">Login</h2>
              {error && <Alert variant="danger">{error}</Alert>}

              <Form onSubmit={handleSubmit}>
                <Form.Group id="email">
                  {/* <Form.Label>Email</Form.Label> */}
                  <Form.Control className="bg-primary text-light" type="email" placeholder="Email" ref={emailRef} required />
                </Form.Group>
                <Form.Group id="password">
                  <Form.Control className="bg-primary text-light" type="password" placeholder="Password" ref={passwordRef} required />
                </Form.Group>
                <Button disabled={loading} className="btn bg-info w-100" type="submit">
                Login
                </Button>
              </Form>
              <div className="text-center w-100 mt-3" >
                <Link to="/forgot-password" style={{color: "#004ce4"}}>Forgot Password?</Link>
              </div>
              <div className="text-center text-light w-100 mt-2">
                <Link to="/signup" style={{color: "#004ce4"}}>Sign Up</Link>
              </div>
          </Card.Body>
        </Card>
      </CenteredContainer>
    </div>
  )
}