/** @format */

import { Button, Modal } from "antd";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteFiles } from "../../../redux/folderSlice";

const FileModal = ({ open, setOpen, data }) => {
  const dispatch = useDispatch();
  const { deleteFi } = useSelector((state) => state.bases);
  const handleCancel = () => {
    setOpen(false);
  };
  const [link, setLink] = useState(false);
  const copyLink = async (link) => {
    try {
      await navigator.clipboard.writeText(link);
      setLink(true);
      alert("Succsesfuly copiyed");
    } catch (err) {
      console.error("Failed to copy link: ", err);
      setLink(false);
    }
  };
  const deleteFile = async (id, name) => {
    await dispatch(deleteFiles({ name: name, id: data.id }));
    await handleCancel();
  };

  
  return (
    <Modal
      open={open}
      footer={null}
      onCancel={handleCancel}>
      <p>{data.filename}</p>
      <div
        className='details'
        style={{ display: "flex", justifyContent: "space-between" }}>
        <Button
          loading={deleteFi}
          danger
          onClick={() => deleteFile(data?.id, data?.name)}>
          DELETE
        </Button>
        <Button type='primary'>
          <a href={data.url}>Download</a>
        </Button>
        <Button type='primary' onClick={() => copyLink(data.url)}>
          Copy Link
        </Button>
      </div>
    </Modal>
  );
};

export default FileModal;
