/** @format */

import { Button, Form, Input } from "antd";
import React, { useState } from "react";
import "./Register.scss";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../../../redux/api";
import { useNavigate } from "react-router-dom";
const Register=()=>{
const [loading, setLoading] = useState(false);
const [error, setError] = useState(false)

var navigate = useNavigate()

// const [data, setData ]= useState({
//   username:""
// })
const onFinish = async (values) => {
  console.log(values)
  try {
    setLoading(true); 
    const user = await createUserWithEmailAndPassword(
      auth, values.email, values.password
    );
    await updateProfile(auth.currentUser, { displayName: values.username });
    return user;
  } catch (e) {
    setError(e)
  } finally {
    navigate("/")
    setLoading(false); 
  }
}
  return (
    <div className='form'>
      <div className='form__container'>
        {error?error:null}
        <Form onFinish={onFinish}>
          <p>Full Name</p>
          <Form.Item
            name='username'
            rules={[{ required: true, message: "Full Name cannot be Empty" }]}>
            <Input />
          </Form.Item>
          <p>Email</p>

          <Form.Item
            name='email'
            rules={[{ required: true, message: "Write true email" }]}>
            <Input type='email' />
          </Form.Item>
          <p>Password</p>

          <Form.Item
            name='password'
            rules={[{ required: true, message: "Password cannot be Empty" }]}>
            <Input.Password />
          </Form.Item>
          <Button loading={loading} htmlType='submit' type='primary'>
            Register
          </Button>
        </Form>
        <p>
          ALREADY have an account <a href='/'>Login</a>
        </p>
      </div>
    </div>
  );
};

export default Register;
