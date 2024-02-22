import { faFile, faCopy, faDeleteLeft, faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { deleteDoc, doc } from "firebase/firestore";
import React, { useState } from "react"
import { database } from "../../firebase";

export default function File({ file }) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(file.url);
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
    alert("File url copied to clipboard")
  };

  const deleteFile = async () => {
    await deleteDoc(doc(database.files, file.id));
    window.location.reload();
  }

  return (
    <div className="d-flex justify-content-between align-items-center">
      <a
        href={file.url}
        target="_blank"
        className="btn btn-outline-dark text-truncate w-75"
      >
        <FontAwesomeIcon icon={faFile} className="mr-2"/>
        {file.name}
      </a>
      <button
        className="btn btn-outline-dark text-truncate btn-primary"
        onClick={copyToClipboard}
        disabled={copied}
      >
        <FontAwesomeIcon icon={faCopy} />
      </button>
      <button
        className="btn btn-outline-dark text-truncate btn-primary"
        onClick={deleteFile}
      >
        <FontAwesomeIcon icon={faTrash} />
      </button>
    </div>
  )
}
