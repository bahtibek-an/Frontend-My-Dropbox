import { faFile, faTrashAlt } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from "react"
import './File.css'


export default function File({ file }) {
  const imgs = document.getElementsByClassName("file-container")
  const handleDelete = () => {
    imgs[0].remove('file-container')
  }
  

  return (
    <>
      <ul className="file-container">
        <p className="file-con-txt">{file.url }</p>
        <a
          href={file.url}
          className="file-container-link">
          <FontAwesomeIcon icon={faFile} />
          {file.name}
        </a>
        <button className="file-del-btn" onClick={handleDelete}><FontAwesomeIcon icon={faTrashAlt}/></button>
      </ul>
    </>
  )
}
