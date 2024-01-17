import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './authentication/login';
import Register from './authentication/register';
import { NotFound } from './notFound/notFound';
import Index from './profile/loyout';
import DeleteContext from './profile/context/deleteContext';
import SettingsContext from './profile/context/settings';
import HomeContext from './profile/context/upload';
import ForgotPassword from './authentication/forgotPassword';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const AuthUserRoutes = [
    { id: 1, path: '/', element: isAuthenticated ? <Index /> : <Navigate to="/login" replace /> },
    { id: 2, path: '/login', element: <Login setIsAuthenticated={setIsAuthenticated} /> },
    { id: 3, path: '/register', element: <Register setIsAuthenticated={setIsAuthenticated} /> },
    { id: 4, path: '/forgotPassword', element: <ForgotPassword /> },
    { id: 5, path: '*', element: <NotFound /> },
  ];  

  const LayoutRoutes = [
    { id: 1, path: '/delete', element: <DeleteContext /> },
    { id: 2, path: '/settings', element: <SettingsContext /> },
    { id: 3, path: 'upload', element: <HomeContext /> }
  ]
  
  return (
    <div>
      <Router>
        <Routes>
          {AuthUserRoutes.map(route => (
            <Route key={route.id} path={route.path} element={route.element} />
          ))}
          {LayoutRoutes.map(route => (
            <Route path='/' element={<Index />}>
              <Route key={route.id} path={route.path} element={route.element} />
            </Route>
          ))}
        </Routes>
      </Router>
    </div>
  );
};

export default App;
