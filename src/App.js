import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Home from "./components/Home/Home";

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route  path="/home" element={<Home/>}/>
          <Route path="/" element={<Register />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
