import React from "react"
import { Link } from "react-router-dom"
import { Button } from "react-bootstrap"

export default function Folder({ folder }) {
  return (
    <>Folder
    <Button
      to={{
        pathname: `/folder/${folder.id}`,
        state: { folder: folder },
      }}
      variant="outline-primary"
      className="btn btn-outline-light w-100" style={{color:"white", backgroundColor: 'blue'}}
      as={Link}
    >
      {folder.name}
    </Button>
    </>
  )
}
