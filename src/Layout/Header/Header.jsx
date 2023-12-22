import "./Header.css";
function Header({
  setVisibleUploadModal,
  setVisibleCreateFolderModal,
  navigationsState,
}) {
  return (
    <div>
      <div className="header-side container">
        <h1>All Files</h1>
        <div className="buttons">
          <button
            className="create"
            onClick={() => setVisibleCreateFolderModal(true)}
          >
            <b>Create</b>
          </button>
          <button
            className="upload"
            onClick={() => setVisibleUploadModal(true)}
          >
            <b>Upload</b>
          </button>
        </div>
      </div>
      <hr style={{ marginTop: "10px" }} />
      {navigationsState ? <></> : <></>}
    </div>
  );
}

export default Header;
