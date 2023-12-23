import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { Col } from "react-bootstrap";
import { FcOpenedFolder } from "react-icons/fc";
import { AiFillFilePdf } from "react-icons/ai";
// import { FcDownload } from "react-icons/fc";
// import { useNavigate } from "react-router-dom";
// import down from "../../Assets/img/cover.jpg";
import Filter from "../../Filter/Filter";
import { SERVER_IP } from "../Env";
import { get } from "lodash-es";
export const Foldercard = ({
  folders,
  folder_val,
  path,
  setPath,
  value,
  fun,
  setPrevPath,
  handleBackNavigation
}) => {
  // const nav = useNavigate();
  // const navigatePath = (type) => {
  //   type === "folder" ? nav(`/folders/${type}`) : nav(`/files/${type}`);
  // };

  // console.log("----", folders);
  // console.log("change----", folder_val);
  const [downloadPath, setDownloadPath] = useState("");
  const [blob, setBlob] = useState({ imgUrl: "" });
  const [con, setCon] = useState(true);
  const [url_path, setUrl_path] = useState("");
  const download_pdf_url = useRef("");
  const fileDownload = () => {
    let a = document.createElement("a");
    console.log(downloadPath);
    console.log("----", blob);
    a.href = `data:image/jpeg;base64,${blob.imgUrl}`;
    console.log("{{");
    a.download = "got";
    a.click();
  };
  function base64toPDF(data) {
    var bufferArray = base64ToArrayBuffer(data);
    var blobStore = new Blob([bufferArray], { type: "application/pdf" });
    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
      window.navigator.msSaveOrOpenBlob(blobStore);
      return;
    }
    var data = window.URL.createObjectURL(blobStore);
    var link = document.createElement("a");
    document.body.appendChild(link);
    link.href = data;
    link.download = downloadPath;
    link.click();
    window.URL.revokeObjectURL(data);
    link.remove();
  }
  function base64ToArrayBuffer(data) {
    var bString = window.atob(data);
    var bLength = bString.length;
    var bytes = new Uint8Array(bLength);
    for (var i = 0; i < bLength; i++) {
      var ascii = bString.charCodeAt(i);
      bytes[i] = ascii;
    }
    return bytes;
  }

  const requestFilePath = async () => {
    // let url = `${SERVER_IP}/get_file`;
    let url = "https://dropbox-api-nodejs-index-qsr6.onrender.com/get_file";
    await axios
      .post(url, {
        filePath: downloadPath,
      })
      .then(async (res) => {
        console.log("//////", res.data);
        download_pdf_url.current = res.data;
        var abc = download_pdf_url.current.imgUrl;
        base64toPDF(abc);
        await setBlob(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    requestFilePath();
  }, [downloadPath, folder_val, folders]);

  return (
    <>
      <button
        onClick={() => {
          handleBackNavigation()
        }}
      >
        click
      </button>
      {folders?.map((data, i) => {
        // console.log("/////////", data, "----", i);
        return (
          <>
            <Col
              className="position-relative"
              lg={12}
              onClick={() => {
                setPrevPath(data.path_lower)
                // window.history.pushState(null, "", "folders" + data.path_lower);
                setUrl_path(data.path_lower);
                setPath(data.path_lower);
              }}
              key={i}
            >
              {/* {console.log(path)} */}
              {data[".tag"] === "folder" ? (
                <Col className="folder-box p-3" key={data.id}>
                  <FcOpenedFolder style={{ fontSize: "1.7rem" }} />
                  &nbsp;
                  <span>{data.name}</span>
                </Col>
              ) : (
                <Col className="folder-box p-3" key={data.id}>
                  {/* {(con = 1)} */}
                  <AiFillFilePdf style={{ fontSize: "1.7rem", color: "red" }} />
                  &nbsp;
                  {/* {console.log(dummy)} */}
                  <span>{data.name}</span>
                  <br></br>
                  <span style={{ fontSize: "0.7rem", color: "red" }}>
                    {data.path_lower}
                  </span>
                  {/* {console.log("con", con)} */}
                  {value == 1 ? (
                    <div>
                      <span>{data.name}</span>
                      <br></br>
                      <span style={{ fontSize: "0.7rem", color: "red" }}>
                        {/* {data["metadata"]["path_display"]} */}
                      </span>
                    </div>
                  ) : (
                    ""
                  )}
                  <span
                    style={{ position: "absolute", right: "1%", top: "20%" }}
                  >
                    <button
                      className="btn btn-danger"
                      onClick={() => {
                        setDownloadPath(data.path_lower);
                        // DownloadFile(blob);
                        // call();
                        // showFile(blob, path);
                        // PdfDownload(blob, path);
                        // fileDownload();
                      }}
                    >
                      download
                    </button>
                  </span>
                </Col>
              )}
            </Col>
          </>
        );
      })}
    </>
  );
};
