/** @format */

import { Button, Form, Input } from "antd";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../../../../redux/api";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);
  var navigate = useNavigate()
  const onFinish = async (value) => {
    try {
      setLoader(true); // Set loading to true when login starts
      const user = await signInWithEmailAndPassword(
        auth,
        value.email,
        value.password
      );
      return user;
    } catch (e) {
      setError(e);
    } finally {
      navigate("/")
      setLoader(false); // Set loading to false when login completes (either success or error)
    }
  };

  return (
    <div className='form'>
      <div className='form__container'>
        {/* <span>{error ? error : null}</span> */}
        <Form onFinish={onFinish}>
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
          <Button loading={loader} htmlType='submit' type='primary'>
            Login
          </Button>
        </Form>  
        <p>
          Don't have an account <a href='/sign'>Sign up</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
