import React, { useState } from "react";
import { database } from "../../firebase";
import { ROOT_FOLDER } from "../../hooks/useFolder";
import { useAuth } from "../../contexts/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolderPlus } from "@fortawesome/free-solid-svg-icons";

export default function AddFolderButton({ currentFolder }) {
  const [name, setName] = useState("");
  const { currentUser } = useAuth();

  function handleSubmit(e) {
    e.preventDefault()

    if (currentFolder == null) return

    const path = [...currentFolder.path]
    if (currentFolder !== ROOT_FOLDER) {
      path.push({ name: currentFolder.name, id: currentFolder.id })
    }

    database.folders.add({
      name: name,
      parentId: currentFolder.id,
      userId: currentUser.uid,
      path: path,
      createdAt: database.getCurrentTimestamp(),
    })
    setName("")
  }

  return (
    <>
      <button type="button" class="btn btn-success me-4" data-bs-toggle="modal" data-bs-target="#createFolderBtn"> <FontAwesomeIcon icon={faFolderPlus} style={{fontSize:35}} /></button>

      <div class="modal fade" id="createFolderBtn" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content text-dark">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">Create Folder</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <form onSubmit={handleSubmit}>
              <div class="modal-body">
                <div className="form-floating mb-3">
                  <input type="text" className="form-control text-dark" id="floatingInput" placeholder="New Folder" value={name} onChange={(e) => setName(e.target.value)} required />
                  <label for="floatingInput">Folder Name</label>
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="submit" class="btn btn-success">Create</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}