import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Registration from './components/register';
import Login from './components/login';
import Dashboard from './components/Dashboard';
import EditProfile from './components/profile';
import KrPapka from './components/file';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/fldr/:folderId" element={<KrPapka />} />
        <Route path="/edit-profile" element={<EditProfile />} /> 
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
