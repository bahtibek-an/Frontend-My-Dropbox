import React, { useRef, useState, useEffect } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../config/AuthConfig.jsx";
import { Link, useHistory } from "react-router-dom";
import "../styles/Login.css";

function LoginForm({ login }) {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const { currentUser } = useAuth();

  useEffect(() => {
    if (currentUser) {
      history.push("/");
    }
  }, [currentUser, history]);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      history.push("/");
    } catch {
      setError("Failed to log in");
    }

    setLoading(false);
  }

  return (
    <div className="box">
      <Card>
        <Card.Body>
          <h2 className="text">Login</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <input
              className="input"
              type="email"
              placeholder="email"
              ref={emailRef}
              required
            />
            <input
              className="input"
              type="password"
              placeholder="password"
              ref={passwordRef}
              required
            />
            <button className="button" disabled={loading} type="submit">
              Log In
            </button>
          </Form>
          <div className="text">
            Don't have an account? <Link to="/register">Register</Link>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

function Login() {
  const { login } = useAuth();

  return <LoginForm login={login} />;
}

export default Login;
