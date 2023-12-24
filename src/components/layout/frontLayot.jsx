import { Fragment } from "react";
import { Outlet } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/firebase";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  LogoutOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, theme } from "antd";
import { Link, useNavigate, useParams } from "react-router-dom";

import "../styles/home.css";

const { Header, Sider } = Layout;

const FrontLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const [user] = useAuthState(auth);
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (user) {
      setEmail(user.email);
    }
  }, [user]);

  const { userId } = useParams();
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log("Logging out...");
    auth.signOut();
    navigate("/");
  };

  return (
    <Fragment>
      <Layout style={{ height: "100vh" }}>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="demo-logo-vertical" />
          <Menu
            className="home-menu"
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["1"]}
          >
            <Menu.Item key="1" icon={<UserOutlined />}>
              <Link to={`/login/${userId}`}>Home</Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<DeleteOutlined />}>
              <Link to={`/login/${userId}/delete_file`}>Delete file</Link>
            </Menu.Item>
            <Menu.Item key="3" icon={<LogoutOutlined />} onClick={handleLogout}>
              Logout
            </Menu.Item>
          </Menu>
        </Sider>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            display: "flex",
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
          <h1 className="home-title">Hello {email ? email : "none"}</h1>
        </Header>
      </Layout>
      <Layout style={{ height: "100vh" }}>
        <Outlet />
      </Layout>
    </Fragment>
  );
};

export default FrontLayout;
