import React, { Component, useEffect } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../config/AuthConfig.jsx";
import { Link, useHistory } from "react-router-dom";
import "../styles/Register.css";

function SignupForm({ signup }) {
  const emailRef = React.createRef();
  const passwordRef = React.createRef();
  const passwordConfirmRef = React.createRef();
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const history = useHistory();
  const { currentUser } = useAuth();

  useEffect(() => {
    if (currentUser) {
      history.push("/");
    }
  }, [currentUser, history]);

  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }

    try {
      setError("");
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      history.push("/");
    } catch {
      setError("Failed to create an account");
    }

    setLoading(false);
  }

  return (
    <div className="box">
      <Card>
        <Card.Body>
          <h2 className="text">Sign Up</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={(e) => handleSubmit(e)}>
            <input
              className="input"
              placeholder="Email"
              type="email"
              ref={emailRef}
              required
            />
            <input
              className="input"
              placeholder="Password"
              type="password"
              ref={passwordRef}
              required
            />
            <input
              className="input"
              placeholder="Confirm Password"
              type="password"
              ref={passwordConfirmRef}
              required
            />
            <button
              className="button"
              disabled={loading}
              type="submit"
            >
              Sign Up
            </button>
          </Form>
          <div className="text">
            Already have an account? <Link to="/login">Login</Link>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

function Signup() {
  const { signup } = useAuth();

  return <SignupForm signup={signup} />;
}

export default Signup;
