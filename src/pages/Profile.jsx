import React, { useRef, useState } from "react";
import { Form, Card, Alert } from "react-bootstrap";
import { useAuth } from "./../config/AuthConfig.jsx";
import { Link, useHistory } from "react-router-dom";
import "../styles/Profile.css";

function EditProfile() {
  const emailRef = useRef();
  const username = useRef(); // New displayName reference
  const { currentUser, updateEmail, updateProfile } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    if (emailRef.current.value !== currentUser.email) {
      try {
        await updateEmail(emailRef.current.value);
      } catch (error) {
        setError("Failed to update email");
        setLoading(false);
        return;
      }
    }

    // Update the display name (username)
    if (username.current.value !== currentUser.displayName) {
      try {
        await updateProfile(username.current.value);
      } catch (error) {
        setError("Failed to update display name");
        setLoading(false);
        return;
      }
    }

    history.push("/");
    setLoading(false);
  };

  return (
    <div className="box">
      <Card>
        <Card.Body>
          <h2 className="text">Edit Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <input
              className="input"
              placeholder="Email"
              type="email"
              ref={emailRef}
              disabled
              required
              defaultValue={currentUser.email}
            />

            <input
              className="input"
              placeholder="Display Name"
              type="text"
              ref={username}
              defaultValue={currentUser.displayName || ""}
            />

            <button className="button" disabled={loading} type="submit">
              Update
            </button>
          </Form>
          <div className="text">
            <Link to="/">Cancel</Link>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

export default EditProfile;
