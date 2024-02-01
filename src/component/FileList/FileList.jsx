import React, { useState } from "react";
import "./FileList.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDownload,
  faEye,
  faFile,
  faFolder,
  faTrash,
  faEllipsis,
  faCopy,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteFiles } from "../../redux/extraReducer";
import moment from "moment";

function FileList({ filesD, foldersD }) {
  const [visibleDropdown, setVisibleDropdown] = useState(null);
  const [copySuccess, setCopySuccess] = useState(false);
  const dispatch = useDispatch();

  const handleToggle = (id) => {
    setVisibleDropdown((prev) => (prev === id ? null : id));
  };

  const copyToClipboard = async (link) => {
    try {
      await navigator.clipboard.writeText(link);
      setCopySuccess(true);
      alert("Successfully copied. Validity Period is 2 days");
    } catch (err) {
      console.error("Failed to copy link: ", err);
      setCopySuccess(false);
    }
  };

  return (
    <div className="fileTable">
      <table className="table">
        <tbody>
          {foldersD?.map((folder) => (
            <tr className="folder" key={folder.id}>
              <td>
                <Link
                  to={`/home/folder/${folder.id}`}
                  className="folder-link"
                >
                  <FontAwesomeIcon icon={faFolder} /> {folder.name}
                </Link>
              </td>
              <td className="date-column">
                {moment(folder.date.toDate()).format("L, LT")}
              </td>
            </tr>
          ))}
          {filesD?.map((file) => (
            <tr className="file" key={file.id}>
              <td>
                <a
                  href={file?.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="file-link"
                >
                  <FontAwesomeIcon icon={faFile} /> {file.filename}
                </a>
              </td>
              <td>
                <span className="ellipsis" onClick={() => handleToggle(file.id)}>
                  <FontAwesomeIcon icon={faEllipsis} />
                </span>
                <div
                  className={`icons ${visibleDropdown === file.id ? "active" : ""}`}
                >
                  <a
                    href={file?.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FontAwesomeIcon icon={faDownload} /> Download
                  </a>
                  <span onClick={() => copyToClipboard(file?.url)}>
                    <FontAwesomeIcon icon={faCopy} />
                    Copy Link
                  </span>
                  <span onClick={() => dispatch(deleteFiles({ name: file.name, id: file.id }))}>
                    <FontAwesomeIcon icon={faTrash} />
                    Delete
                  </span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default FileList;
