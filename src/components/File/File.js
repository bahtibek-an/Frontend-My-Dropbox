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
        <button
          className="file-con-btn"
          onClick={() => {
          navigator.clipboard.writeText(file.url);
           }}
          >
            copylink
        </button>
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
