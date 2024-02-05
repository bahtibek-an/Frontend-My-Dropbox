import React, { useEffect, useState } from 'react'
import './Form.css'
import {useDispatch} from  'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { signInUser } from '../../redux/CreatorsAction/AuthActionCreator'
const LoginForm = () => {
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const navigate = useNavigate();
    const [success,setSuccess] = useState(false);
    const dispatch = useDispatch();

    const handleSumbit = (e) => {
        e.preventDefault();

        if(!email || !password ){
            alert("Please enter in all fields")
            return;
        }

        dispatch(signInUser(email,password,setSuccess))
    }

    useEffect(() => {
        if(success === true){
            navigate('/dashboard')
        }
    },[success,navigate])
  return (
    <form onSubmit={handleSumbit} className='form'>
        <h2 style={{marginTop:'10px'}}>
            Login
        </h2>
        <div className="form-wrape">
            <input type="text" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)}/>
            <input type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)}/>
            <p>Arleady member ? <Link to={'/register'}>Register</Link></p>
        </div>

        <button className="sumbit_btn">
            Login
        </button>
    </form>
  )
}

export default LoginForm