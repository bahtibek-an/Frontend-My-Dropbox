/** @format */

import React from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import { Button, Form, Input } from "antd";
import "./User.scss";
import { useForm } from "antd/es/form/Form";
import { useDispatch, useSelector } from "react-redux";
import { UpdateUser } from "../../../redux/folderSlice";

const User = ({ user }) => {
  const { fileLoader } = useSelector((state) => state.bases);
  const localUser = JSON.parse(localStorage.getItem("currentUser"));
  console.log(user);
  const [form] = Form.useForm();
  var dispath = useDispatch();

  // Use setFieldsValue instead of setFieldValue
  form.setFieldsValue({ username: user?.displayName });
  const onFinish = (values) => {
    dispath(UpdateUser(values));
  };
  return (
    <>
      <Sidebar />
      <div className='user__container'>
        <Form form={form} onFinish={onFinish}>
          <Form.Item name='username'>
            <Input />
            <Button type='primary' htmlType='submit' loading={fileLoader}>
              Update
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default User;
