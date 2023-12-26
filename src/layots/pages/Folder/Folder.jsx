/** @format */

import React from "react";
import "./Folder.scss";
import folderIcon from "../../../assets/images/folderIcon.png";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
const Folder = ({ data }) => {
  const navigate = useNavigate();
  const navigator = (event, type) => {
    event.preventDefault();
    if (type == "back") {
      navigate(-1);
    } else {
      navigate(+1);
    }
  };
  return (
    <>
      {window.location.href.includes("home") ? (
        <div className='navigators'>
          <LeftOutlined
            style={{ fontSize: "30px" }}
            onClick={(e) => navigator(e, "back")}
          />
          <RightOutlined
            style={{ fontSize: "30px" }}
            onClick={(e) => navigator(e, "next")}
          />
        </div>
      ) : null}
      <div className='folders'>
        {data?.map((f) => {
          return (
            <ul className='ul' key={f.id}>
              <a href={`/home/folder/${f.id}`}>
                <div className='span'>
                  <div className='icon_con'>
                    <img src={folderIcon} alt='' />
                  </div>
                  {f.name}
                </div>
              </a>
            </ul>
          );
        })}
      </div>
    </>
  );
};

export default Folder;
