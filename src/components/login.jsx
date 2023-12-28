import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import './login.css'
import { auth } from './firebase'; 

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    const authInstance = getAuth();
    
    try {
      await signInWithEmailAndPassword(authInstance, email, password);
      navigate('/dashboard'); 
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <div className='cards_2'>
      <div className='card-2'>
        <h1 className='text-2'>Login</h1>
        <input className='input' type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        <input className='input' type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
        <button className='button' onClick={handleLogin}>Login</button>
        <p className='text-2'>
          Don't have an account? <Link className='link' to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
