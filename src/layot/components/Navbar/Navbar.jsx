/** @format */

import React, { useEffect, useState } from "react";

import "./Navbar.scss";
import { Button, Dropdown, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";
import Creater from "../../../components/Creater/Creater";
import { auth } from "../../../redux/api";
import { useParams } from "react-router-dom";

const Navbar = () => {
  const [user, setUser] = useState("")
  useEffect(()=>{
    auth.onAuthStateChanged((user)=>{
      setUser(user)
    })
  },[])
  var param = useParams()
  const [items, setItems] = useState([
    { id: 1, label: <a href='/profile'>Profile</a>, key: 1 },
    {
      id: 2,
      label: <Button onClick={() => auth.signOut()}>Logout</Button>,
      key: 2,
    },
  ]);
  console.log(param)
  const [modal, setModal] = useState(false);
  return (
    <>
      <div className='navbar'>
        <div className='buttons'>
          <Button onClick={() => setModal("upload")}>Upload</Button>
          <Button onClick={() => setModal("create")}>Create</Button>
        </div>
        <div className='user'>
          <Dropdown menu={{ items }} trigger={["click"]}>
            <a onClick={(e) => e.preventDefault()}>
              <span>{user?.displayName}</span>
              <DownOutlined />
            </a>
          </Dropdown>
        </div>
      </div>
      {modal ? <Creater  folderId={param.id ? param.id : 1} modal={modal} setModal={setModal} /> : null}
    </>
  );
};

export default Navbar;
