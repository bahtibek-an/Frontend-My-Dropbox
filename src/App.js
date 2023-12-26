
import { useEffect, useState } from 'react';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import './App.css';
import Folder from './componets/Folder';
import Home from './componets/homePage/Home';
import LoginPage from './componets/homePage/LoginPage';
import Main from './componets/mainPage/Main';

function App() {

  const [login, setLogin] = useState(localStorage.getItem("login"))
  const [id, setId] = useState(localStorage.getItem("id"))


  const enter = (Id) => {
    setLogin(true)
    localStorage.setItem("login", true)
    setId(Id)
    localStorage.setItem("id", Id)
  }

  const signOut = () => {
    setLogin(false)
    localStorage.setItem("login", false)
    
  }

  


  const routes = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<Home login={login} />}>
        <Route index element = {<LoginPage enter={enter} setId={setId} login={login}/>} />
        <Route path="home" element={<Main id={id} signOut = {signOut}/>}>
        </Route>
        <Route path="folder" element={<Folder/>}/>
      </Route>
    )
  )

  return (
    <div className="App">
      <RouterProvider router={routes}/>
    </div>
  );
}

export default App;
