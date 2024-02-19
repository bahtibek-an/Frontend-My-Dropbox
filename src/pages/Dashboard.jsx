import React, { useState, useEffect } from "react";
import { Container, Button } from "react-bootstrap";
import { useFolder } from "../components/useFolder.jsx";
import AddFolderButton from "../components/FolderCreate.jsx";
import AddFileButton from "../components/FileUpload.jsx";
import Folder from "../components/Folder.jsx";
import File from "../components/File.jsx";
import FolderBreadcrumbs from "../components/Breadcrumb.jsx";
import { useParams, useLocation, Link, useHistory } from "react-router-dom";
import { useAuth } from "../config/AuthConfig.jsx";
import "../styles/Dashboard.css";

function Dashboard() {
  const { folderId } = useParams();
  const { state = {} } = useLocation();
  const { folder, childFolders, childFiles } = useFolder(folderId, state.folder);

  const [showDropdown, setShowDropdown] = useState(false);
  const history = useHistory();
  const { currentUser, logout } = useAuth();

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  useEffect(() => {
    // Check if user is not logged in, then navigate to login section
    if (!currentUser) {
      history.push("/login");
    }
  }, [currentUser, history]);

  const handleLogout = async () => {
    try {
      await logout();
      // After successful logout, navigate to login page
      history.push("/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <>
      <div className="navbar">
        <div className="left-content">
          <span className="brand">Dropbox</span>
        </div>
        <div className="right-content">
          <div className="profile-dropdown" style={{ display: 'flex'}} onClick={toggleDropdown}>
             <h4 style={{ fontSize: '22px', marginRight: '5px'}}>Welcome, {currentUser.displayName}</h4>
            <Button variant="success">Profile</Button>
            {showDropdown && (
              <div className="dropdown-content">
                <Link to="/edit-profile">Profile</Link>
                <Button variant="link" onClick={handleLogout}>
                  Logout
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
      <Container fluid>
        <div className="d-flex align-items-center">
          <FolderBreadcrumbs currentFolder={folder} />
          <AddFileButton currentFolder={folder} />
          <AddFolderButton currentFolder={folder} />
        </div>
        {childFolders.length > 0 && (
          <div className="d-flex flex-wrap">
            {childFolders.map((childFolder) => (
              <div key={childFolder.id} style={{ maxWidth: "250px" }} className="p-2">
                <Folder folder={childFolder} />
              </div>
            ))}
          </div>
        )}
        {childFolders.length > 0 && childFiles.length > 0 && <hr />}
        {childFiles.length > 0 && (
          <div className="d-flex flex-wrap">
            {childFiles.map((childFile) => (
              <div key={childFile.id} style={{ maxWidth: "250px" }} className="file p-2">
                <File className='file' file={childFile} />
              </div>
            ))}
          </div>
        )}
      </Container>
    </>
  );
}

export default Dashboard;
