import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import axios from "axios";
function Upload() {
  const init = {
    fileName: "",
    file: {},
  };
  const aRef = useRef(null);
  const [data, setData] = useState(init);
  useEffect(() => {
    console.log(data);
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    let res = await axios.post("", { ...data });
    console.log(data);
    resetInput();
    setData(init);
  };
  const resetInput = () => {
    aRef.current.value = null;
  };
  return (
    <>
      <Container>
        <Row>
          <Col
            xxl={{ span: 6, offset: 3 }}
            xl={{ span: 6, offset: 3 }}
            lg={{ span: 6, offset: 3 }}
          >
            <div>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>File Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="File Name"
                    required
                    value={data.fileName}
                    onChange={(e) => {
                      setData({ ...data, fileName: e.target.value });
                    }}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Choose File</Form.Label>
                  <Form.Control
                    type="file"
                    required
                    ref={aRef}
                    onChange={(e) => {
                      setData({ ...data, file: e.target.files[0] });
                    }}
                  />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Upload;
