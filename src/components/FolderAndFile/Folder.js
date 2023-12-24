import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { database } from "../../firebase";
import { faEllipsisV, faFolder, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Folder = ({ folder }) => {
  const deleteDocument = async (id) => {
    try {
       await database.folders.doc(id).delete();
       alert("Folder successfully deleted!");
    } catch (error) {
       alert("Error removing folder: ", error);
    }
   };
  return (
    <>
      <Card
        variant="success"
        className="card-body text-muted text-decoration-none">
          <div className="d-flex justify-content-between align-items-center me-3" style={{marginTop: "-25px", }}>
            <FontAwesomeIcon icon={faFolder} className="text-success w-50 h-50" />
            <div class="dropdown dropstart">
              <span class="" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                <FontAwesomeIcon icon={faEllipsisV} />
              </span>
              <ul class="dropdown-menu dropdown-menu-end dropdown-menu-lg-start">
                <button onClick={() => deleteDocument(folder.id)} className="btn btn-danger w-100">Delete <FontAwesomeIcon icon={faTrash} /></button>
              </ul>
            </div>
          </div>
        <Link to={{ pathname: `/folder/${folder.id}`, state: { folder } }} className="text-success">{folder.name}</Link>
      </Card>
    </>
  );
};

export default Folder;