import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Registration from "./components/Registration";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import EditProfile from "./components/EditProfile";
import KrPapka from "./components/KrPapka";
import YtPapka from "./components/YtPapka";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/ct-folder" element={<YtPapka />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/fldr/:folderId" element={<KrPapka />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;