import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/register/Register';
import Login from './components/login/Login';
import Dash from './components/dash/Dash';
import EditPro from './components/editpro/EditPro';
import Create from './components/create/create';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dash" element={<Dash />} />
        <Route path="/fldr/:folderId" element={<Create />} />
        <Route path="/edit-pro" element={<EditPro />} /> 
        <Route path="/" element={<Dash />} />
      </Routes>
    </Router>
  );
}

export default App;
