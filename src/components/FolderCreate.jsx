import React, { useState } from "react"
import { Button, Modal, Form } from "react-bootstrap"
import { database } from "../config/firebase.jsx"
import { useAuth } from "../config/AuthConfig.jsx"
import { ROOT_FOLDER } from "./useFolder.jsx"
// import "../../style.css"

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
      <Button onClick={openModal} variant="outline-primary" className="btn btn-outline-primary btn-sm m-0 mr-2" style={{fontSize:20, color:"blue"}}>
        Create Folder
      </Button>
      <Modal show={open} onHide={closeModal}>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
              <label>Folder Name</label>
              <input className="input" type="text" required value={name}onChange={e => setName(e.target.value)}/>
              <Modal.Footer>
              <Button  onClick={closeModal}>
                Close
              </Button>
              <Button   type="submit">
                Add Folder
              </Button>
            </Modal.Footer>
          </Modal.Body>
        </Form>
      </Modal>
    </>
  )
}
