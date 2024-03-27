import { useState, useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import Login from "./component/Authorization/Login";
import Home from "./component/Home/Home";
import Register from "./component/Authorization/Register";
import Folder from "./component/Folder/Folder";
import UserPage from "./component/UserPage/UserPage";
import { auth } from "./api/firebase";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        localStorage.setItem("localUser", JSON.stringify(authUser));
        setUser(authUser);
      } else {
        localStorage.removeItem("localUser");
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <Routes>
      <Route
        path="/"
        element={user ? <Home /> : <Navigate to="/login" replace />}
      />
      <Route
        path="/register"
        element={user ? <Navigate to="/" replace /> : <Register />}
      />
      <Route
        path="/login"
        element={user ? <Navigate to="/" replace /> : <Login />}
      />
      <Route
        path="/home"
        element={user ? <Home /> : <Navigate to="/login" replace />}
      />
      <Route
        path="/home/user/:id"
        element={user ? <UserPage /> : <Navigate to="/login" replace />}
      />
      <Route
        path="/home/folder/:id"
        element={user ? <Folder /> : <Navigate to="/login" replace />}
      />
    </Routes>
  );
}

export default App;
