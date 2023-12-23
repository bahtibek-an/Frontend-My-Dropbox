import React, { useEffect, useLayoutEffect, useState, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Form, InputGroup, Button } from "react-bootstrap";
import { BiSearchAlt } from "react-icons/bi";
import axios from "axios";
import { Foldercard } from "./Foldercard";
import { Foldercard1 } from "./Foldercard1";
import { SERVER_IP } from "../Env";
import { useNavigate } from "react-router-dom";
import Filter from "../../Filter/Filter";
// import FolderOnly from "./FolderOnly";
import { FolderOnly } from "./FolderOnly";
function Folders() {
  // for search
  const navigate = useNavigate();

  const [user, setUser] = useState("");
  const [dropboxData, setDropboxData] = useState([]);

  const [path, setPath] = useState("");
  const [isShow, setIsShow] = useState(false);
  const [searchData, setSearchData] = useState();
  const [allFolder, setAllFolder] = useState(false);
  const count = useRef("");
  const [load, setLoad] = useState(0);
  const keys = ["name"];
  const search = (infos, val) => {
    return infos?.filter((info) => {
      if (val == 0 || info[".tag"]) {
        // count.current = 0;
        // return keys?.some((key) =>
        //   info["name"].toLowerCase().startsWith(user.toLowerCase())
        // );
        return info["name"];
      } else {
        count.current = 1;
        return keys?.some((key) =>
          info.metadata["name"].toLowerCase().startsWith(user.toLowerCase())
        );
      }
    });
  };

  // var a = folder_filter(dropboxData, 3);
  // const filter_btn_folder = () => {
  //   // var a = folder_filter(dropboxData, 3);
  //   console.log("PPPPPPPPPPP", a);
  // };
  // const filter_btn_file = () => {};

  const api = async () => {
    console.log(user);
    // let url = `${SERVER_IP}/vicky`;
    let url = `https://dropbox-api-nodejs-index-qsr6.onrender.com/vicky`;
    const query = { searchName: user };
    const res = await axios.post(url, { searchName: user });
    if (res.status === 200) {
      console.log("::::::::", res.data);
      setSearchData(res.data);
      // var a = search(res.data, 1);
      // console.log("$$$$$$$$$", a);
      // setDropboxData(a);
    } else {
      console.log("failed");
    }
    let url1 = `https://dropbox-api-nodejs-index-qsr6.onrender.com/check`;
    const res1 = await axios.get(url1);
    if (res1.status === 200) {
      // setSearchData(res1.data);
      // setAllFolder(res1)
      // console.log("$$$$$$$$$", res1.data);
    } else {
      console.log("failed");
    }
  };

  const req_path_api = async (path) => {
    // let url = `${SERVER_IP}/receive`;
    // setLoad(1);
    // alert(path);
    let url = `https://dropbox-api-nodejs-index-qsr6.onrender.com/receive`;
    // console.log("{{{{{{{{", path);
    var res = await axios.post(url, {
      // text: window.location.pathname,
      text: path,
    });
    if (res.status === 200) {
      console.log("#####################", res.data.result.entries);
      // var a = search(res.data.result.entries, 1);
      setDropboxData(res.data.result.entries);
    } else {
      console.log("failed");
    }
  };

  useEffect(() => {
    api();
  }, [user]);
  useEffect(() => {
    console.log("hii");
    // console.log(path);
    // console.log("***********", dropboxData);
    console.log(path);

    req_path_api(path);
  }, [path, window.location.pathname]);

  // console.log("---", path);
  return (
    <>
      <Container fluid className="p-2">
        <Col className="folder-page p-3">
          <Row>
            <div className="row">
              <div className="col-6">
                <button className="bg-secondary" onClick={() => navigate(-1)}>
                  back
                </button>
                <button className="bg-secondary" onClick={() => navigate(1)}>
                  front
                </button>
              </div>
              <div className="col-6">
                <Filter
                // filter_btn_folder={filter_btn_folder}
                // filter_btn_file={filter_btn_file}
                />
              </div>
            </div>
            <h2>select folder</h2>

            <hr />
            <form className="search-fields mb-2">
              <InputGroup>
                <Form.Control
                  placeholder="Search by folder name"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  onChange={(e) => {
                    setUser(e.target.value);
                  }}
                />
                <Button
                  className="bg-secondary"
                  onClick={() => {
                    // search(dropboxData);
                    api();
                    setUser(user);
                    setIsShow(true);
                  }}
                >
                  <BiSearchAlt />
                </Button>
              </InputGroup>
            </form>
          </Row>
          <Row className="g-2 mt-2">
            <h3>Folders</h3>
            {isShow == false ? (
              <Foldercard
                folders={search(dropboxData, 0)}
                // folder_val={search(searchData, 1)}
                path={path}
                setPath={setPath}
                value={count.current}
                fun={req_path_api}
              />
            ) : (
              ""
            )}
            <Foldercard1
              folders={search(dropboxData, 0)}
              folder_val={search(searchData, 1)}
              path={path}
              setPath={setPath}
              value={count}
              api_call={req_path_api}
            />
            {/* <FolderOnly
              folders={search(dropboxData, 0)}
              folder_val={search(searchData, 1)}
              path={path}
              setPath={setPath}
              value={isShow}
            /> */}
          </Row>
        </Col>
      </Container>
    </>
  );
}

export default Folders;
