import React from "react";
import "./caption.css";
function Caption({
  setVisibleUploadModal,
  setVisibleCreateFolderModal,
  navigationsState,
}) {
  return (
    <div>
      <div className="main_header container">
        <div className="buttons">
          <button
            className="folder"
            onClick={() => setVisibleCreateFolderModal(true)}
          >
            add folder
          </button>
          <button
            className="file"
            onClick={() => setVisibleUploadModal(true)}
          >
            add file
          </button>
        </div>
      </div>
      <hr style={{ marginTop: "10px" }} />
      {navigationsState ? <></> : <></>}
    </div>
  );
}

export default Caption;
