import { useRef, useState } from "react";
import "./Modal.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faDownload } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { publishPost } from "../../redux/extraReducer";

function UploadFIleModal({ visible, setVisible, folderID }) {
  const { postLoading } = useSelector((state) => state.files);
  let user = JSON.parse(localStorage.getItem("localUser"));
  const inputRef = useRef();
  var dispatch = useDispatch();
  const [file, setFile] = useState();
  const [selectedFile, setSelectedFile] = useState("");
  const handleChange = (e) => {
    setFile(e.target.files[0]);
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      setSelectedFile(e.target.result);
    };

    reader.readAsDataURL(file);
  };
  const handleGet = () => {
    inputRef.current.click();
  };
  const handlePublish = (e) => {
    e.preventDefault();
    dispatch(publishPost({ file: file, userId: user.uid, folderId: folderID }));
  };
  if (postLoading) {
    setVisible(false);
    setFile("");
    setSelectedFile("");
  }
  return (
    <div className={`modal ${visible ? "active" : ""}`}>
      <div className="modal-inner">
        <div
          className="close-modal"
          onClick={() =>
            setVisible(false) || setFile("") || setSelectedFile("")
          }
        >
          <FontAwesomeIcon icon={faClose} />
        </div>
        <div className="content upload-file">
          {selectedFile ? (
            <>
              <button
                className="form-btn"
                style={{ width: "100%", marginBottom: "20px" }}
                onClick={handlePublish}
              >
                Publish
              </button>
              <div className="img__container">
                <img src={selectedFile ? selectedFile : null} />
                <h3>
                  <b>{file?.name}</b>
                </h3>
              </div>
            </>
          ) : (
            <>
              <input type="file" ref={inputRef} onChange={handleChange} />
              <h2>Upload Files</h2>
              <button className="form-btn" onClick={handleGet}>
                <FontAwesomeIcon icon={faDownload} /> Upload
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default UploadFIleModal;
