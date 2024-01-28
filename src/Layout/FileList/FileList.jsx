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
  const dispatch = useDispatch();

  const handleToggle = (id) => {
    if (id === visibleDropdown) {
      setVisibleDropdown(null);
    } else {
      setVisibleDropdown(id);
    }
  };

  const copyToClipboard = (link) => {
    navigator.clipboard.writeText(link).then(
      () => {
        alert("Successfully copied to clipboard");
      },
      (err) => {
        console.error("Unable to copy to clipboard", err);
        alert("Failed to copy link");
      }
    );
  };

  const handleDelete = (id, name) => {
    dispatch(deleteFiles({ id, name }));
    setVisibleDropdown(null);
  };

  return (
    <div className="fileTable">
      <table className="table">
        <tbody>
          {foldersD?.map((el) => (
            <tr className="folder" key={el.id}>
              <td>
                <Link to={`/home/folder/${el.id}`} style={{ width: "100%" }}>
                  <FontAwesomeIcon icon={faFolder} /> {el.name}
                </Link>
              </td>
              <td> {moment(el.date.toDate()).format("L, LT")}</td>
            </tr>
          ))}
          {filesD?.map((el) => (
            <tr className="file" key={el.id}>
              <td>
                <FontAwesomeIcon icon={faFile} /> {el.filename}
              </td>
              <td>
                <span className="elipsis" onClick={() => handleToggle(el.id)}>
                  <FontAwesomeIcon icon={faEllipsis} />
                </span>
                <div
                  className={`icons ${
                    visibleDropdown === el.id ? "active" : ""
                  }`}
                >
                  <a href={el?.url} target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faDownload} /> Download
                  </a>
                  <span onClick={() => copyToClipboard(el?.url)}>
                    <FontAwesomeIcon icon={faCopy} />
                    Copy Link
                  </span>
                  <span onClick={() => handleDelete(el.id, el.name)}>
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


