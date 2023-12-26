/** @format */

import { Button, Modal } from "antd";
import moment from "moment";
import React, { useState } from "react";
import { removeFile } from "../../redux/extraReducer";
import { useDispatch } from "react-redux";

const FileModal = ({ open, setOpen, data }) => {
  const dispatch = useDispatch();
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
  const deleteFile = (id, name) => {
    dispatch(removeFile({ name: name, id: data.id }));
  };
  return (
    <Modal
      title={`Created at:${moment(data?.date?.toDate()).format("L,LT")}`}
      open={open}
      footer={null}
      onCancel={handleCancel}>
      <p>{data.filename}</p>
      <div
        className='details'
        style={{ display: "flex", justifyContent: "space-between" }}>
        <Button danger onClick={() => deleteFile(data?.id, data?.name)}>
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
