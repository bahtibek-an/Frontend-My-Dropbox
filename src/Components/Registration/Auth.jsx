import React from 'react';
import { useState } from 'react';
import "./Auth.css";
import Login from './Login';
import Signup from './Signup';

function Auth() {
  const [ active, setActive ] = useState("login");

   const handleChange = () => {
      setActive(active === "login" ? "signup" : "login");
   }
   return <div className="Auth">
      <div>
      { active === "login" ? <Login /> : <Signup /> }
      </div>
      <div className="extra">
      <span>
         {active === "login" ? (
            <div className="btn1">
            Don't have an account? <button className='btn_signup' onClick={handleChange}>Sign up</button>{" "}
            </div>
         ) : (
            <div className="btn2">
            Have an account? <button className='btn_login' onClick={handleChange}>Login</button>
            </div>
         )}
      </span>
      </div>
   </div>
}

export default Auth;