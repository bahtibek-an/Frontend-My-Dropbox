import React, { useRef, useState } from "react";
import "./Modal.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { publishPost } from "../../redux/extraReducer";


function UploadFileModal({ visible, setVisible, folderID }) {
  const { postLoading } = useSelector((state) => state.files);
  const user = JSON.parse(localStorage.getItem("localUser"));
  const inputRef = useRef();
  const dispatch = useDispatch();
  const [file, setFile] = useState();
  const [selectedFile, setSelectedFile] = useState("");

  const handleChange = (e) => {
    const uploadedFile = e.target.files[0];
    setFile(uploadedFile);

    const reader = new FileReader();
    reader.onload = (e) => {
      setSelectedFile(e.target.result);
    };

    reader.readAsDataURL(uploadedFile);
  };

  const handleGet = () => {
    inputRef.current.click();
  };

  const handlePublish = (e) => {
    e.preventDefault();
    dispatch(publishPost({ file, userId: user.uid, folderId: folderID }));
  };

  const closeModal = () => {
    setVisible(false);
    setFile("");
    setSelectedFile("");
  };

  return (
    <div className={`modal ${visible ? "active" : ""}`}>
      <div className="modal-inner">
        <div className="close-modal" onClick={closeModal}>
          <FontAwesomeIcon icon={faClose} />
        </div>
        <div className="content upload-file">
          {selectedFile ? (
            <>
              <button
                style={{ width: "100%", marginBottom: "20px" }}
                onClick={handlePublish}
              >
                public
              </button>
              <div className="img__container">
                <img src={selectedFile} alt="Uploaded File" />
                <p>{file?.name}</p>
              </div>
            </>
          ) : (
            <>
              <input type="file" ref={inputRef} onChange={handleChange} />
              <button onClick={handleGet}>download</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default UploadFileModal;
