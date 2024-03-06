import React, { useEffect } from 'react'
import Home from '../src/Pages/Home/Home'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Login from './Pages/AuthPages/Login'
import Register from './Pages/AuthPages/Register'
import Dashboard from './Pages/Dashboard/Dashboard'
import {useDispatch } from 'react-redux'
import { checkIsLogged } from './redux/CreatorsAction/Auth/AuthActionCreator'
function App() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(checkIsLogged(navigate));
  }, [])

  return (
    <div>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/dashboard/*' element={<Dashboard/>}/>
      </Routes>
    </div>
  )
}

export default App
