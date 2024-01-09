import { useState, useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { auth } from "./config/firebase";
import Mainpage from "./Layout/mainpage/mainpage";
import Signin from "./Layout/authentic/signin";
import Signup from "./Layout/authentic/signup";
import Directory from "./Layout/directory/directory";
import Edit from "./Layout/edit/edit";
import "./App.css";

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
        element={user ? <Mainpage /> : <Navigate to="/login" replace />}
      />
      <Route
        path="/register"
        element={user ? <Navigate to="/" replace /> : <Signup />}
      />
      <Route
        path="/login"
        element={user ? <Navigate to="/" replace /> : <Signin />}
      />
      <Route
        path="/home"
        element={user ? <Mainpage /> : <Navigate to="/login" replace />}
      />
      <Route
        path="/home/user/:id"
        element={user ? <Edit /> : <Navigate to="/login" replace />}
      />
      <Route
        path="/home/folder/:id"
        element={user ? <Directory /> : <Navigate to="/login" replace />}
      />
    </Routes>
  );
}

export default App;
