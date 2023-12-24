import './App.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Login from './components/authentication/login';
import Notfound from './notFound';
import Register from './components/authentication/register';
import Home from './components/context/home';
import FrontLayout from './components/layout/frontLayot';
import DeleteFile from './components/context/deleteFile';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/register' element={<Register />} />

          <Route path='/login/:userId' element={<FrontLayout />}>
            <Route path='/login/:userId' element={<Home />} />
            <Route path='/login/:userId/delete_file' element={<DeleteFile />} />
          </Route>

          <Route path='*' element={<Notfound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
