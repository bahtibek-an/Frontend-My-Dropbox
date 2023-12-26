/** @format */

import { Button, Form, Input } from "antd";
import React from "react";
import "./Login.scss";
import { useDispatch } from "react-redux";
import { userSign } from "../../../redux/extraReducer";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onFinish =  (values) => {
     dispatch(userSign(values));
     navigate("/");
  };
  return (
    <div>
      <div className='form__container'>
        <h1>Login</h1>
        <Form onFinish={onFinish}>
          <p>Email</p>
          <Form.Item
            name='email'
            rules={[{ required: true, message: "Email cannot be Empty" }]}>
            <Input />
          </Form.Item>
          <p>Password</p>
          <Form.Item
            name='password'
            rules={[{ required: true, message: "Password is required" }]}>
            <Input.Password />
          </Form.Item>
          <Button type='primary' htmlType='submit'>
            Login
          </Button>
        </Form>
        <p>
          Don`t have an account <a href='/register'>Sign up</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
