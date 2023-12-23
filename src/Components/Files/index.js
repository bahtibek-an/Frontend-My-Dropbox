import React, { useState } from "react";
import { Container, Row, Col, Form, InputGroup, Button } from "react-bootstrap";
import { BiSearchAlt } from "react-icons/bi";
// import { Link } from "react-router-dom";
import { Filecard } from "./Filecard";
import { useLocation } from "react-router-dom";
// import { SERVER_IP } from "../Env";
import Filter from "../../Filter/Filter";
import axios from "axios";

function Files() {
  // for search
  const [user, setUser] = useState("");
  const [datas, setDatas] = useState([
    { id: 1, fileName: "z", url: "https://domainName.com" },
    { id: 2, fileName: "y", url: "https://domainName.com" },
    { id: 3, fileName: "x", url: "https://domainName.com" },
    { id: 4, fileName: "w", url: "https://domainName.com" },
    { id: 5, fileName: "u", url: "https://domainName.com" },
    { id: 6, fileName: "v", url: "https://domainName.com" },
    { id: 7, fileName: "t", url: "https://domainName.com" },
    { id: 8, fileName: "s", url: "https://domainName.com" },
    { id: 9, fileName: "r", url: "https://domainName.com" },
    { id: 10, fileName: "q", url: "https://domainName.com" },
    { id: 11, fileName: "p", url: "https://domainName.com" },
    { id: 12, fileName: "o", url: "https://domainName.com" },
    { id: 13, fileName: "n", url: "https://domainName.com" },
    { id: 14, fileName: "m", url: "https://domainName.com" },
    { id: 15, fileName: "l", url: "https://domainName.com" },
  ]);
  const keys = ["fileName"];
  const search = (infos) => {
    return infos.filter((info) => {
      return keys.some((key) =>
        info["fileName"].toLowerCase().includes(user.toLowerCase())
      );
    });
  };

  const api = async () => {
    console.log("skdjhbc");
    // let url = `${SERVER_IP}/vicky`;
    let url = `https://dropbox-api-nodejs-index-qsr6.onrender.com/vicky`;
    const query = { searchName: user };
    const res = await axios.get(url, query);
    if (res.status === 200) {
      console.log(res);
    } else {
      console.log("failed");
    }
  };
  const test = () => {
    console.log("fdsaf");
  };
  return (
    <>
      <Container fluid className="p-2">
        <Col className="files-page p-3">
          <Row>
            <h2>select files</h2>
            <hr />
            <form className="search-fields mb-2">
              <InputGroup>
                <Form.Control
                  placeholder="Search by file name"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  onChange={(e) => {
                    setUser(e.target.value);
                  }}
                />
                <Button className="bg-secondary" onClick={() => api()}>
                  sdfcs <BiSearchAlt />
                </Button>
              </InputGroup>
            </form>
          </Row>
          <Row className="g-2 mt-2">
            <h3>Files</h3>
            <Filecard files={search(datas)} />
          </Row>
        </Col>
      </Container>
      {/* <Container>
        <Row>
          <Col>
            <div className="p-5">
              <form>
                <InputGroup className="mb-3">
                  <InputGroup.Text id="basic-addon1">
                    <BiSearchAlt />
                  </InputGroup.Text>
                  <Form.Control
                    placeholder="Username"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                  />
                  <InputGroup.Text id="basic-addon1">A-z</InputGroup.Text>
                </InputGroup>
              </form>
            </div>
          </Col>
        </Row>
      </Container>
      <Container>
        {file.map((d, i) => {
          return (
            <>
              <Row>
                <Col>
                  <div className="p-1" key={d.id}>
                    <span className="fs-2">
                      <AiFillFilePdf />
                    </span>
                    <span className="fs-5 ps-2">{d.fileName}</span>

                    <a
                      href={pdfUrl}
                      download={pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer">
                      <span className="fs-2 float-end">
                        <FcDownload />
                      </span>
                    </a>
                  </div>
                </Col>
              </Row>
            </>
          );
        })}
      </Container> */}
    </>
  );
}

export default Files;
