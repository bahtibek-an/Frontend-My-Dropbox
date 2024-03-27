/** @format */

import React from "react";
import { Route, Routes } from "react-router-dom";
import Main from "./pages/Main/Main";
import User from "./pages/User/User";
import "../App.css";
import Sidebar from "./components/Sidebar/Sidebar";
import Navbar from "./components/Navbar/Navbar";

const Layout = ({ user }) => {
  const Auth = [
    { id: 1, element: <Main user={user} />, path: "/" },
    { id: 2, element: <Main user={user} />, path: "/folders" },
    { id: 3, element: <User user={user} />, path: "/profile" },
    { id: 4, element: <Main user={user} />, path: "/folder/:id" },

  ];
  return (
    <>
      <Sidebar />
      <div style={{width:"100%"}}>
        <div className='pages'>
          <Navbar user={user}/>
        </div>
        <Routes>
          {Auth.map((route) => (
            <Route path={route.path} element={route.element} key={route.id} />
          ))}
        </Routes>
      </div>
    </>
  );
};

export default Layout;
