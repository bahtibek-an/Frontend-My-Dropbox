import React, { useState } from "react";
import { faFile, faTrash, faCopy, faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './File.css';

export default function File({file, onDelete, onCopyLink, onUpload }) {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(file.url);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  return (
    <div className="file-container">
      <a href={file.url} className="btn btn-outline-info text-truncate w-100" target="_blank" rel="noopener noreferrer">
        <FontAwesomeIcon icon={faFile} className="mr-2" />
        {file.name}
      </a>
      <div className="file-actions">
        <button className="btn btn-outline-danger" onClick={() => onDelete(file)}>del
          <FontAwesomeIcon icon={faTrash} />
        </button>
        <button className="btn btn-outline-primary" onClick={handleCopyLink}>
          {isCopied ? (
            <span>
              Copied! <FontAwesomeIcon icon={faCopy} />
            </span>
          ) : (
            <FontAwesomeIcon icon={faCopy} />
          )}
        </button>
        <button className="btn btn-outline-success" onClick={() => onUpload && onUpload(file)}>
          <FontAwesomeIcon icon={faUpload} />
        </button>
      </div>
    </div>
  );
}
