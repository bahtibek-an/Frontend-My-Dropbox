import React from "react";
import Navbar from "./Sidebar/Navbar";
import File from "./FolderAndFile/File";
import Folder from "./FolderAndFile/Folder";
import { useFolder } from "../hooks/useFolder";
import { useParams, useLocation } from "react-router-dom";
import AddFileButton from "./FolderAndFile/AddFileButton";
import AddFolderButton from "./FolderAndFile/AddFolderButton";
import FolderBreadcrumbs from "./FolderAndFile/FolderBreadcrumbs";

const Dashboard = () => {
  const { folderId } = useParams();
  const { state = {} } = useLocation(); 
  const { folder, childFolders, childFiles } = useFolder(folderId, state.folder);

  return (
    <main>
      <Navbar />
      <div className="dashboard">
        <div className="container container0 mb-3 mt-4 p-2 d-flex justify-content-between align-items-center">
          <FolderBreadcrumbs currentFolder={folder} />
          <div className="d-flex">
            <AddFolderButton currentFolder={folder} />
            <AddFileButton currentFolder={folder} />
          </div>
        </div>
        <div className="container container1 mb-4">
        {childFolders.length > 0 && <h3 className="card-title text-light p-3">Folders</h3>}
          <div className="peer-folder">
            {childFolders.length > 0 && (
              <div className="peer-folder">
                <div className="row row-cols-1 row-cols-md-4 p-3">
                  {childFolders.map((childFolder) => (
                    <div 
                      key={childFolder.id} 
                      className="cards">
                      <Folder folder={childFolder} />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="peer-file mb-4 mt-1">
            {childFiles.length > 0 && <h3 className="card-title text-light p-3">Files</h3>}
            {childFiles.length > 0 && (
              <div className="card mb-3">
                {childFiles.map((childFile) => (
                  <div key={childFile.id} className="p-3">
                    <File file={childFile} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;