import React, { useState } from "react";
import { faFile, faCopy, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAuth } from "../../AuthContext";
import { storage, database } from "../../firebase";

export default function File({ file }) {
  const [isCopied, setIsCopied] = useState(false);
  const { currentUser } = useAuth();

  const copyFileAddress = () => {
    navigator.clipboard.writeText(file.url);
    setIsCopied(true);

    // Reset the "Copied" state after a short delay
    setTimeout(() => {
      setIsCopied(false);
    }, 1500);
  };

  const deleteFile = () => {
    // Add logic to delete the file from both storage and database
    const storageRef = storage.ref(`/files/${currentUser.uid}/${file.path}`);
    storageRef
      .delete()
      .then(() => {
        console.log(`File ${file.name} deleted from storage.`);
      })
      .catch((error) => {
        console.error("Error deleting file from storage:", error);
      });

    database.files
      .doc(file.id)
      .delete()
      .then(() => {
        console.log(`File ${file.name} deleted from database.`);
      })
      .catch((error) => {
        console.error("Error deleting file from database:", error);
      });
  };

  return (
    <div className="d-flex justify-content-between align-items-center">
      <a href={file.url} className="btn btn-outline-success text-truncate w-100">
        <FontAwesomeIcon icon={faFile} className="mr-2" />
        {file.name}
      </a>

      <div className="btn-group">
        <button className="btn btn-outline-secondary" onClick={copyFileAddress}>
          <FontAwesomeIcon icon={faCopy} />
          {isCopied && <span className="ml-1">Copied!</span>}
        </button>
        <button className="btn btn-outline-danger" onClick={deleteFile}>
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>
    </div>
  );
}
