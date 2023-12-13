import React from "react";
import { faCopy, faEllipsisV, faFile, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { database } from "../../firebase";

function File(props) {
  const { file } = props;

  function copy() {
    const el = document.createElement("input");
    el.value = file.url;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
  }

  const deleteDocument = async (id) => {
    try {
       await database.files.doc(id).delete();
       alert("File successfully deleted!");
    } catch (error) {
       alert("Error removing file: ", error);
    }
   };
  return (
    <>
      <div className="d-flex justify-content-between align-items-center">
        <div className="file-icon text-success d-flex justify-content-around align-items-center">
          <FontAwesomeIcon icon={faFile} className="mt-1" />
          <div className="file-name ms-2">
            <a href={file.url} target="_blank" className="text-decoration-none text-success">{file.name}</a>
          </div>
        </div>
        <div className="file-open text-center">
          <a href={file.url} target="_blank" className="text-muted">Open file <span className="ms-2"><ion-icon name="open-outline"></ion-icon></span></a>
        </div>
        <div className="file-delete">
          <div class="dropdown">
            <span class="" type="button" data-bs-toggle="dropdown" aria-expanded="false">
              <FontAwesomeIcon icon={faEllipsisV} />
            </span>
            <ul class="dropdown-menu">
              <button onClick={copy} className="btn btn-success w-100 mb-1">Copy Link <FontAwesomeIcon icon={faCopy} className="ms-1" /></button>
              <button onClick={() => deleteDocument(file.id)} className="btn btn-danger w-100">Delete <FontAwesomeIcon icon={faTrash} /></button>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default File;