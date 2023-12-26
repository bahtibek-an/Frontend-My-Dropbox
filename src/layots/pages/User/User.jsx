/** @format */

import React from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import "./User.scss";
import { Button, Form, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { changeUser } from "../../redux/extraReducer";
const User = ({ localUser }) => {
  const { deleteFolderOrFile } = useSelector((state) => state.files);
  const dispatch = useDispatch();
  const onFinish = (values) => {
    console.log(values);
    dispatch(changeUser(values));
  };
  return (
    <>
      {deleteFolderOrFile ? (
        <h1>Loading..</h1>
      ) : (
        <>
          <div className='user'>
            <Sidebar />
            <div className='user__container'>
              <Navbar />
              <div className='form'>
                <Form
                  title='USERNAME'
                  onFinish={onFinish}
                  initialValues={{ username: localUser?.displayName }}>
                  <p>Username</p>
                  <Form.Item name='username'>
                    <Input />
                  </Form.Item>
                  <Button htmlType='submit'>Submit</Button>
                </Form>
              </div>
            </div>
          </div>
        </>
      )}
      <></>
    </>
  );
};

export default User;
