/** @format */

import { CloseOutlined, InboxOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, message } from "antd";
import Dragger from "antd/es/upload/Dragger";
import React, { useEffect, useState } from "react";
import "./Create.scss";
import { useDispatch, useSelector } from "react-redux";
import { newFolder, uploadFile } from "../../layots/redux/extraReducer";
import { closeTheModal } from "../../layots/redux/folderSlice/folderSlice";
import { useParams } from "react-router-dom";
import Loader from "../Loader/Loader";
const Create = ({ createModal, setCreateModal, folderId }) => {
  const { createLoading, closeModal } = useSelector((state) => state.files);
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("local"));

  const onFinish = (values) => {
    dispatch(newFolder({ ...values, useruid: user?.uid, folderId: folderId }));
  };

  const handleCancel = (e) => {
    setCreateModal(false);
  };

  useEffect(() => {
    if (closeModal == "open") {
      dispatch(closeTheModal("close"));
    } else if (closeModal == "close") {
      setCreateModal(false);
    } else if (closeModal == "create") {
      setCreateModal("create");
    } else if (closeModal == "upload") {
      setCreateModal("upload");
    }
  }, [closeModal]);

  console.log(createLoading);
  const paramsId = useParams();
  const props = {
    name: "file",
    multiple: true,
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info);
        dispatch(
          uploadFile({
            ...info?.file,
            userUid: user?.uid,
            folderUid: paramsId.id ? paramsId.id : 1,
          })
        );
      }
    },
  };
  return (
    <>
      {createLoading}
      <div className='modals'>
        {createModal == "create" ? (
          <>
            <Modal
              title='Create Folder'
              open={createModal}
              okButtonProps={false}
              footer={null}
              onCancel={handleCancel}>
              <Form onFinish={onFinish}>
                <Form.Item
                  name='folderName'
                  rules={[
                    {
                      required: true,
                      message: "Please fill out of this field",
                    },
                  ]}>
                  <Input placeholder='name...' />
                </Form.Item>
                <div className='modal__buttons'>
                  <Button danger>Cancel</Button>
                  <Button
                    type='primary'
                    htmlType='submit'
                    loading={createLoading}>
                    Ok
                  </Button>
                </div>
              </Form>
            </Modal>
          </>
        ) : (
          <>
            {createLoading ? (
              <Loader />
            ) : (
              <>
                <div className='upload'>
                  <span
                    className='closeIcon'
                    onClick={() => setCreateModal(false)}>
                    <CloseOutlined />
                  </span>

                  <div className='upload__content'>
                    <Dragger {...props}>
                      <p className='ant-upload-drag-icon'>
                        <InboxOutlined />
                      </p>
                      <p className='ant-upload-text'>
                        Click or drag file to this area to upload
                      </p>
                      <p className='ant-upload-hint'>
                        Support for a single or bulk upload. Strictly prohibited
                        from uploading company data or other banned files.
                      </p>
                    </Dragger>
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </div>
      <div className='w-screen'></div>
    </>
  );
};

export default Create;
