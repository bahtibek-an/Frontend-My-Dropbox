import React from "react";
import { Container } from "react-bootstrap";
import { ACTIONS, useFolder } from "../../hooks/useFolder";
import AddFolderButton from "./AddFolderButton";
import AddFileButton from "./AddFileButton";
import Folder from "./Folder";
import File from "./File";
import Navbar from "./Navbar";
import FolderBreadcrumbs from "./FolderBreadcrumbs";
import { useParams, useLocation } from "react-router-dom";
import { doc, deleteDoc, getDoc } from "firebase/firestore";
import { firestore, database, storage } from "../../firebase";

export default function Dashboard() {
  const { folderId } = useParams();
  const { state = {} } = useLocation();
  const { state: { folder, childFolders, childFiles }, dispatch } = useFolder(
    folderId,
    state.folder
  );

  const handleDelete = async (fileToDelete) => {
    const updatedFiles = childFiles.filter((file) => file.id !== fileToDelete.id)
    dispatch({
            type: ACTIONS.DELETE_FILES,
            payload: { folder: updatedFiles },
          });
        console.log(fileToDelete)
    // const document = await getDoc(firestore, "files", fileToDelete.id);
    database.files
      .doc(fileToDelete.id)
      .get()
      .then((snapshot) => {
        snapshot.ref.delete()
      })
      
    console.log(document)
    console.log(`Deleting file: ${fileToDelete.name}`);
    console.log("fileToDelete", fileToDelete);
    const del = childFiles.filter((file) => console.log(file));
    console.log(`Deleting file: ${del}`);
  };


  return (
    <>
      <Navbar />
      <Container fluid>
        <div className="d-flex align-items-center">
          <FolderBreadcrumbs currentFolder={folder} />
          <AddFolderButton currentFolder={folder} />
          <AddFileButton currentFolder={folder} />
        </div>
        {childFolders.length > 0 && (
          <div className="d-flex flex-column">
            {childFolders.map((childFolder) => (
              <div
                key={childFolder.id}
                style={{ maxWidth: "200px" }}
                className="p-2"
              >
                <Folder folder={childFolder} />
              </div>
            ))}
          </div>
        )}
        {childFolders.length > 0 && childFiles.length > 0 && <p>Files</p>}
        {childFiles.length > 0 && (
          <div className="d-flex flex-wrap">
            {childFiles.map((childFile) => (
              <div
                key={childFile.id}
                style={{ maxWidth: "250px" }}
                className="p-2"
              >
                <File file={childFile} onDelete={handleDelete}/>
              </div>
            ))}
          </div>
        )}
      </Container>
    </>
  );
}
