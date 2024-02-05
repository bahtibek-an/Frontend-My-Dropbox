import React from "react"
import { Link } from "react-router-dom"
import { Button } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFolder } from "@fortawesome/free-solid-svg-icons"
import './Folder.css'

export default function Folder({ folder }) {
  return (
    <Button
      to={{
        pathname: `/folder/${folder.id}`,
        state: { folder: folder },
      }}
      id="folder-container" 
      as={Link}
    >
      <FontAwesomeIcon icon={faFolder} />
      {folder.name}
    </Button>
  )
}
