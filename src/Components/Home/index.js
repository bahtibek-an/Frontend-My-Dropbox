import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

function Home() {
  let a = "#f27f10";

  const nav = useNavigate();

  return (
    <>
      <Container fluid className="landing-page vh-100">
        <Row>
          <Col>
            <div className="text-center">
              <h2 className="text-light">TRANSPORT OFFICER</h2>
              <p className="text-light">
                Reference Guide for Transport Department.
              </p>
              <p>
                <Link to="/folders">
                  <button className="btn-lg btn-default btn-notify">
                    WELCOME
                  </button>
                </Link>
              </p>
              <p className="text-light">D.MADHVAN.</p>
              <p className="text-light">madhvan.durai@gmail.com</p>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Home;
