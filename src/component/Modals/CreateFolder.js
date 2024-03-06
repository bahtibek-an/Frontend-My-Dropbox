import React, { useState } from "react";
import "./Modal.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { folderCreate } from "../../redux/extraReducer";
function CreateFolder({ visible, setVisible, folderID }) {
  let user = JSON.parse(localStorage.getItem("localUser"));
  var dispatch = useDispatch();
  const [data, setData] = useState({
    folderName: "",
    userId: user?.uid,
    folderId: folderID,
  });
  function handleCreate() {
    if (data.folderName.length <= 0) {
      alert("Please fill it up");
    } else {
      dispatch(folderCreate(data));
    }
  }

  return (
    <div className={`modal ${visible ? "active" : ""}`}>
      <div className="modal-inner">
        <div className="close-modal">
          <FontAwesomeIcon icon={faClose} onClick={() => setVisible(false)} />
        </div>
        <div className="content create-folder">
          <h2>Create new folder</h2>
          <input
            type="text"
            placeholder="Enter Folder Name"
            onChange={(e) =>
              setData((prev) => ({ ...prev, folderName: e.target.value }))
            }
          />
          <button onClick={handleCreate}>Submit</button>
        </div>
      </div>
    </div>
  );
}

export default CreateFolder;
