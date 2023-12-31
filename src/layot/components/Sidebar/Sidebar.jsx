/** @format */

import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../../../assets/icons/logo.svg";
import homeIcon from "../../../assets/icons/Home.svg";
import folder from "../../../assets/icons/folder.svg";
import "./Sidebar.scss"
const Sidebar = () => {
  const [active, setActive] = useState(false);
  const [navLinks, setNavLinks] = useState([
    { id: 1, path: "/", name: "home", icon: homeIcon },
    { id: 2, path: "/file", name: "My Folder", icon: folder },
    { id: 3, path: "/folders", name: "My Files", icon: folder },
  ]);
  return (
    <div className='sidebar'>
      <img src={logo} alt='' />
      <div className='list'>
        {navLinks?.map((link) => (
          <NavLink
            className={active == link.id ? "active" : ""}
            key={link.id}
            to={link.path}>
            <img src={link.icon} alt='' />
            {link.name}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
