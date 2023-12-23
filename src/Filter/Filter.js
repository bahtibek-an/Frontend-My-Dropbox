import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee, faHome, faXmark } from "@fortawesome/free-solid-svg-icons";
export default function Filter() {
  const [first, setFirst] = useState(0);
  const [click, setClick] = useState(0);
  const api = async () => {
    // console.log(user);
    // let url = `${SERVER_IP}/vicky`;

    let url = `https://dropbox-api-nodejs-index-qsr6.onrender.com/vicky`;
    // const query = { searchName: user };
    const res = await axios.post(url);
    if (res.status === 200) {
      console.log("------8888", res.data);
      //   setSearchData(res.data);
    } else {
      console.log("failed");
    }
  };
  //   useEffect(() => {
  //     api();
  //   }, []);

  const filter_button_click = () => {
    setFirst(1);
    setClick(0);
    // alert(first);
  };

  const abdc = () => {
    setClick(1);

    setFirst(0);
    console.log(first, click);
  };

  return (
    <>
      <div className="container m-3">
        <div className="dropdown float-end">
          <button
            className="bg-secondary"
            onClick={filter_button_click}
            style={{ width: "10rem" }}
          >
            dfadfa
          </button>

          <span className="float-end">
            <button className="bg-primary" onClick={abdc}>
              <FontAwesomeIcon icon={faXmark} size="xl" />
            </button>
          </span>
          {first ? (
            <div className="card mt-3" style={{ width: "10rem" }}>
              {/* {setFirst(false)} */}
              <div className="card-body">
                <button
                  className="m-2"
                  // onClick={filter_btn_folder}
                  style={{ width: "7rem" }}
                >
                  Folder
                </button>
                <br></br>
                <button className="m-2" style={{ width: "7rem" }}>
                  Files
                </button>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
}
