/** @format */

import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./layot/components/Navbar/Navbar";
import Sidebar from "./layot/components/Sidebar/Sidebar";
import Login from "./layot/pages/Auth/Login/Login";
import Register from "./layot/pages/Auth/Register/Register";
import Main from "./layot/pages/Main/Main";
import User from "./layot/pages/User/User";
import Layout from "./layot/Layout";
import { auth } from "./redux/api";
import { useState } from "react";
// import
function App() {
  const [localUser, setLocalUser] = useState(
    JSON.parse(localStorage.getItem("local"))
  );
  const isAuth = [
    { id: 1, element: <Login />, path: "/" },
    { id: 2, element: <Register />, path: "/sign" },
  ];

  const Auth = [
    { id: 1, element: <Main />, path: "/" },
    { id: 2, element: <Main />, path: "/folder/:id" },
    { id: 3, element: <User user={localUser}/>, path: "/profile" },
  ];
  auth.onAuthStateChanged((user) => {
    localStorage.setItem("currentUser", JSON.stringify(user));
    setLocalUser(user);
  });
  return (
    <div className='container'>
      <Routes>
        {!localUser ? (
          <>
            {isAuth.map((route) => (
              <Route path={route.path} element={route.element} key={route.id} />
            ))}
          </>
        ) : (
          <>
            {Auth.map((route) => (
              <Route path={route.path} element={route.element} key={route.id} />
            ))}
          </>
        )}
      </Routes>
    </div>
  );
}

export default App;
