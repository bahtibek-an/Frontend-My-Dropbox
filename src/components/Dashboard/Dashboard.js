import React from "react"
import { useFolder } from "../../hooks/useFolder"
import AddFolderButton from "../AddFolderButton/AddFolderButton"
import AddFileButton from "../AddFileButton/AddFileButton"
import Folder from "../Folder/Folder"
import File from "../File/File"
import './Dashboard.css'
import Navbar from "../Navbar/Navbar"
import { useParams, useLocation } from "react-router-dom"

export default function Dashboard() {
  const { folderId } = useParams()
  const { state = {} } = useLocation()
  const { folder, childFolders, childFiles } = useFolder(folderId, state.folder);


  return (
    <>
      <Navbar />
      <div>
        <div className="dashboard-container">
          <AddFolderButton currentFolder={folder} />
          <AddFileButton currentFolder={folder} />
        </div>
        {childFolders.length > 0 && (
          <div className="dashboard-folder-container">
            {childFolders.map(childFolder => (
              <div key={childFolder.id}  className="dashboard-folder">
                <Folder folder={childFolder} />
              </div>
            ))}
          </div>
        )}
        {childFolders.length > 0 && childFiles.length > 0 && <hr />}
        {childFiles.length > 0 && (
          <div className="dashboard-file-container">
            {childFiles.map(childFile => (
              <div key={childFile.id} className="dashboard-file">
                <File file={childFile} />
              </div>
            ))}
          </div>
        )}
      </div>
      </>
  )
}

