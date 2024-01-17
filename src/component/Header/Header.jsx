import React from "react";
import "./Header.css";

function Header({
  setVisibleUploadModal,
  setVisibleCreateFolderModal,
  navigationsState,
}) {
  return (
    <div>
      <div className="header-side container">
        <div className="buttons">
          <button
            className="create" 
            onClick={() => setVisibleCreateFolderModal(true)}
          >
            Create
          </button>
          <button
            className="upload" 
            onClick={() => setVisibleUploadModal(true)}
          >
            Upload
          </button>
        </div>
      </div>
      <hr style={{ marginTop: "10px" }} />
      {navigationsState ? <></> : <></>}
    </div>
  );
}

export default Header;
