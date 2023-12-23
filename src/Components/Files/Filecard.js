import React, { useState, useEffect } from "react";
import { Col } from "react-bootstrap";
import { AiFillFilePdf } from "react-icons/ai";
import { FcDownload } from "react-icons/fc";
// import { Link } from "react-router-dom";
import axios from "axios";

export const Filecard = ({ files }) => {
  const url = "http://192.168.1.13/pdf/pdf.php";

  const [pdfUrl, setPdfUrl] = useState(null);

  const downloadFile = (evt) => {
    axios.get(url, {}).then((res) => {
      setPdfUrl(res.data);
    });
  };

  useEffect(() => {
    // downloadFile();
  }, []);

  return (
    <>
      {files.map((data) => {
        return (
          <Col lg={12}>
            <Col className="folder-box p-3" key={data.id}>
              <AiFillFilePdf style={{ fontSize: "1.7rem", color: "red" }} />
              &nbsp;
              <span>{data.fileName}</span>
              <a
                href={pdfUrl}
                download={pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span style={{ position: "absolute", right: "10%" }}>
                  <FcDownload />
                </span>
              </a>
            </Col>
          </Col>
        );
      })}
    </>
  );
};
