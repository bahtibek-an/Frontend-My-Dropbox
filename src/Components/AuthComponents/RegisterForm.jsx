import { useEffect, useState } from 'react'
import React from 'react'
import {useDispatch} from  'react-redux'
import './Form.css'
import { Link, useNavigate } from 'react-router-dom'
import {signUpUser}  from '../../redux/CreatorsAction/AuthActionCreator'
const RegisterForm = () => {
    const [email,setEmail] = useState("")
    const [name,setName] = useState("")
    const [passwordConfirm,setPasswordConfirm] = useState("")
    const [password,setPassword] = useState("")
    const [success,setSuccess] = useState(false)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleSumbit = (e) => {
        e.preventDefault();

        if(!email || !password || !passwordConfirm){
            alert("Please enter in all fields")
            return;
        }

        if(password !== passwordConfirm){
            alert("Password not confirmed!")
            return;
        }
        dispatch(signUpUser(name,email,password,setSuccess))
    }

    useEffect(() => {
        if(success === true){
            navigate('/dashboard')
        }
    },[success,navigate])
    return (
        <form onSubmit={handleSumbit} className='form'>
            <h2 style={{ marginTop: '10px' }}>
                Register
            </h2>
            <div className="form-wrape">                
                <input type="text" placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} />
                <input type="text" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                <input type="password" placeholder='Confirm password' value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)} />
                <p>Arleady member ? <Link to={'/login'}>Login</Link></p>
            </div>

            <button className="sumbit_btn">
                Register
            </button>
        </form>
    )
}

export default RegisterForm