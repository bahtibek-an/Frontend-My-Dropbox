import React from "react";
import { Button } from "react-bootstrap";
import { useAuth } from "../config/AuthConfig";
import { storage, database } from "../config/firebase";
import "../styles/File.css";

const File = ({ file }) => {
  const { currentUser } = useAuth();

  const handleCopyClick = () => {
    navigator.clipboard.writeText(file.url);
    alert("File URL copied to clipboard!");
  };

  const handleDeleteClick = async () => {
    try {
      const fileRef = storage.ref(`/files/${currentUser.uid}/${file.name}`);
      // Use deleteObject method directly
      await fileRef.delete();
  
      // Delete file entry from Firestore
      await database.files.doc(file.id).delete();
  
      alert("File deleted successfully!");
    } catch (error) {
      console.error("Error deleting file:", error);
      alert("An error occurred while deleting the file.");
    }
  };
  

  return (
    <div className="file-container">
      <span className="file-icon">&#128196;</span>
      <a
        href={file.url}
        className="file-link btn btn-outline-light text-dark w-75"
      >
        {file.name}
      </a>
      <div className="file-buttons">
        <Button variant="outline-primary" size="sm" onClick={handleCopyClick}>
          Copy
        </Button>
        <Button variant="outline-danger" size="sm" onClick={handleDeleteClick}>
          Delete
        </Button>
      </div>
    </div>
  );
};

export default File;
