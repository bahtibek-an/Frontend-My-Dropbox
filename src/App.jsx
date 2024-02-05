import React, { useEffect } from 'react'
import Home from './Pages/Home'
import { Route, Routes } from 'react-router-dom'
import Login from './Pages/AuthPages/Login'
import Register from './Pages/AuthPages/Register'
import Dashboard from './Pages/DashboardPages/Dashboard'
import {useDispatch } from 'react-redux'
import { checkIsLogged } from './redux/CreatorsAction/AuthActionCreator'
function App() {

  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(checkIsLogged());
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
