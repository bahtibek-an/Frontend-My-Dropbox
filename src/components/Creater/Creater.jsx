/** @format */

import { CloseOutlined, InboxOutlined } from "@ant-design/icons";
import Dragger from "antd/es/upload/Dragger";
import React from "react";
import Loader from "../Loader/Loader";
import { Button, Form, Input, Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import "./Creater.scss";
import { newFolder, uploadFile } from "../../redux/folderSlice";
import { useParams } from "react-router-dom";
const Creater = ({ modal, setModal, folderId, user }) => {
  const { fileLoader } = useSelector((state) => state.bases);
  const localUser = JSON.parse(localStorage.getItem("currentUser"));
  const params = useParams();
  console.log(folderId);
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    await dispatch(
      newFolder({ ...values, folderId: folderId, userId: localUser.uid })
    );
    await handleCancel();
  };
  const handleCancel = () => {
    setModal(false);
  };
  const props = {
    name: "file",
    multiple: true,
    onChange: async (info) => {
      if (info.file.status !== "uploading") {
        await dispatch(
          uploadFile({
            ...info?.file,
            userUid: localUser?.uid,
            folderUid: folderId ? folderId : 1,
          })
        );
        handleCancel();
      }
    },
  };

  return (
    <>
      {/* {createLoading} */}
      <div className='modals'>
        {modal == "create" ? (
          <>
            <Modal
              title='Create Folder'
              open={modal}
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
                <div
                  className='modal__buttons'
                  style={{
                    display: "flex",
                    justifyContent: "end",
                    gap: "10px",
                  }}>
                  <Button danger onClick={handleCancel}>
                    Cancel
                  </Button>
                  <Button type='primary' htmlType='submit' loading={fileLoader}>
                    Ok
                  </Button>
                </div>
              </Form>
            </Modal>
          </>
        ) : modal == "upload" ? (
          <>
            {fileLoader ? (
              <Loader />
            ) : (
              <>
                <div className='upload'>
                  <span className='closeIcon' onClick={() => setModal(false)}>
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
        ) : null}
      </div>
      <div className='w-screen'></div>
    </>
  );
};

export default Creater;
