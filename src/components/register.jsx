import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import './register.css';
import { auth } from './firebase'; 

function Registration() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegistration = async () => {
    const authInstance = getAuth();
    
    try {
      await createUserWithEmailAndPassword(authInstance, email, password);
      navigate('/dashboard'); 
    } catch (error) {
      console.error('Error registering:', error);
    }
  };

  return (
    <div className='cards_2'>
    <div className='card-2'>
      <h1 className='text-2'>Register</h1>
      <input className='input' type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input className='input' type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <button className='button' onClick={handleRegistration}>Register</button>
      <p className='text-2'>
        Already have an account? <Link className='link' to="/login">Login</Link>
      </p>
    </div>
    </div>
  );
}

export default Registration;
