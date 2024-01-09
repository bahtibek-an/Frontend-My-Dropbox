import React, { useState } from "react";
import { folderCreate } from "../../recovery/Reducer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import "./menu.css";

function Addfolder({ visible, setVisible, folderID }) {
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
          <FontAwesomeIcon icon={faClose} onClick={() => setVisible(false)}/>
        </div>
        <div className="content create-folder" style={{color: "#000"}}>
          <h2>add folder</h2>
          <input
            type="text"
            placeholder="name"
            onChange={(e) =>
              setData((prev) => ({ ...prev, folderName: e.target.value }))
            }
          />
          <button onClick={handleCreate}>create folder</button>
        </div>
      </div>
    </div>
  );
}

export default Addfolder;