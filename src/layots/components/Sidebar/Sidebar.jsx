/** @format */

import React, { useEffect, useState } from "react";
import "./Sidebar.scss";
import { Button, Modal } from "antd";
import Create from "../../../components/Create/Create";
import {
  DownloadOutlined,
  FolderOpenOutlined,
  LoginOutlined,
  PlusCircleOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css";
import { auth } from "../../redux/firebase";
import { useDispatch, useSelector } from "react-redux";
import { closeTheModal } from "../../redux/folderSlice/folderSlice";
import { useParams } from "react-router-dom";
const Sidebar = () => {
  const dispatch = useDispatch();
  const [createModal, setCreateModal] = useState(false);
  const [user, setUser] = useState();
  const param = useParams();
  useEffect(() => {
    auth.onAuthStateChanged((user)=>{
      setUser(user)
    })
  }, []);
  const logout = () => {
    confirmAlert({
      title: "Confirm to submit",
      message: "Are you sure to do this.",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            localStorage.removeItem("local");
            auth.signOut();
            window.location.reload();
          },
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  };
  return (
    <>
      <div className='sidebar'>
        <ul>
          <a href='/'>
            {" "}
            <li>
              <FolderOpenOutlined />
              Home
            </li>
          </a>
          <li
            onClick={() => (
              setCreateModal("create"), dispatch(closeTheModal("create"))
            )}>
            <PlusCircleOutlined />
            Create
          </li>

          <li
            onClick={() => (
              setCreateModal("upload"), dispatch(closeTheModal("upload"))
            )}>
            <DownloadOutlined />
            Upload
          </li>
          <a href='/user'>
            {" "}
            <li>
              {" "}
              <SettingOutlined />
              Setting
            </li>
          </a>
        </ul>
        <ul>
          <li>{user?.displayName}</li>
          <li className='logout' onClick={logout}>
            <LoginOutlined />
            Logout
          </li>
        </ul>
      </div>
      <div style={{ position: "absolute" }}>
        {createModal ? (
          <Create
            createModal={createModal}
            folderId={param.id ? param.id : 1}
            setCreateModal={setCreateModal}
          />
        ) : null}
      </div>
    </>
  );
};

export default Sidebar;
