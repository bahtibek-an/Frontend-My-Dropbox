/** @format */

import React from "react";
import "./Register.scss";
import { Button, Col, Form, Input } from "antd";
import { useDispatch } from "react-redux";
import { userRegister } from "../../../redux/extraReducer";
const Register = () => {
  const dispatch = useDispatch();
  const onFinish = (values) => {
    console.log(values)
    dispatch(userRegister(values))
  };
  return (
    <div>
      <div className='form__container'>
        <h1>Register</h1>
        <Form onFinish={onFinish}>
          <p>Username:</p>
          <Form.Item
            name='username'
            rules={[
              { required: true, message: "Please input your username!" },
            ]}>
            <Input />
          </Form.Item>
          <p>Email:</p>
          <Form.Item
            name='email'
            rules={[
              {
                required: true,
                type: "email",
                message: "Please enter a valid email!",
              },
            ]}>
            <Input />
          </Form.Item>
          <p>Password:</p>
          <Col xs={24} sm={24} md={24}>
            <Form.Item
              name='password'
              rules={[
                {
                  required: true,
                  message: "Password cannot be Empty",
                },
              ]}>
              <Input.Password />
            </Form.Item>
          </Col>

          <Button type='primary' htmlType='submit'>
            Register
          </Button>
        </Form>
        <p>
          Do you have an account <a href='/'>Login</a>
        </p>
      </div>
    </div>
  );
};

export default Register;
