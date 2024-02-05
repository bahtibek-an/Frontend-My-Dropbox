import React, { useState } from "react"
import { Button, Modal, Form } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFolderPlus } from "@fortawesome/free-solid-svg-icons"
import { database } from "../../Server/firebase"
import { useAuth } from "../../contexts/AuthContext"
import { ROOT_FOLDER } from "../../hooks/useFolder"
import './AddFolderButton.css'

export default function AddFolderButton({ currentFolder }) {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState("")
  const { currentUser } = useAuth()

  function openModal() {
    setOpen(true)
  }

  function closeModal() {
    setOpen(false)
  }

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
    closeModal()
  }

  return (
    <>
      <button onClick={openModal} className="addFolder-container" >
        <FontAwesomeIcon icon={faFolderPlus}className="addFolder-icon" />
      </button>
      <Modal show={open} onHide={closeModal}>
        <Form className="addFolder-alert" onSubmit={handleSubmit}>
          <div>
            <Form.Group className="adFolder-input-name">
              <Form.Label>Folder Name</Form.Label>
              <Form.Control type="text" required value={name}onChange={e => setName(e.target.value)}/>
            </Form.Group>
          </div>
          <Modal.Footer className="addFolder-alert-footer">
            <button className="addFolder-close-btn"  onClick={closeModal} >
              Close
            </button>
            <button  type="submit">
              Add Folder
            </button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  )
}
