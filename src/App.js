/** @format */

import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./layots/pages/Home/Home";
import Login from "./layots/pages/Auth/Login/Login";
import Register from "./layots/pages/Auth/Register/Register";
import User from "./layots/pages/User/User";
import { auth } from "./layots/redux/firebase";
import { useEffect, useState } from "react";

function App() {
  const [localUser, setLocalUser] = useState(
    JSON.parse(localStorage.getItem("local"))
  );
  let nonAuthRoutes = [
    { id: 1, element: <Login />, path: "/login" },
    { id: 2, element: <Login />, path: "/" },
    { id: 3, element: <Register />, path: "/register" },
  ];
  let authRoutes = [
    { id: 1, element: <Home />, path: "/" },
    { id: 2, element: <Home />, path: "/home/folder/:id" },
    { id: 3, element: <User localUser={localUser} />, path: "/user" },
  ];

  auth.onAuthStateChanged((user) => {
    localStorage.setItem("local", JSON.stringify(user));
    setLocalUser(user);
  });

  return (
    <Routes>
      {localUser
        ? authRoutes.map((route, index) => (
            <Route path={route.path} element={route.element} key={index} />
          ))
        : nonAuthRoutes.map((route, index) => (
            <Route path={route.path} element={route.element} key={index} />
          ))}
      <Route path='*' element={<h1>Page not found </h1>} />
    </Routes>
  );
}

export default App;
