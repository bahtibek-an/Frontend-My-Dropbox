/** @format */

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
import { Link, NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteFiles } from "../../redux/extraReducer";
import moment from "moment";

function FileList({ filesD, foldersD }) {
  const [visibleDropdown, setVisibleDropdown] = useState(null);
  const handleTogle = (id) => {
    if (id === visibleDropdown) {
      setVisibleDropdown("");
      return;
    }
    setVisibleDropdown(id);
  };
  const [link, setLink] = useState("https://example.com");
  const [copySuccess, setCopySuccess] = useState(false);
  const dispatch = useDispatch();
  const copyToClipboard = async (link) => {
    try {
      await navigator.clipboard.writeText(link);
      setCopySuccess(true);
      alert("Succsesfuly copiyed");
    } catch (err) {
      console.error("Failed to copy link: ", err);
      setCopySuccess(false);
    }
  };
  console.log(copySuccess);
  return (
    <div className='fileTable'>
      <table class='table'>
        <tbody>
          {foldersD?.map((el) => (
            <tr className='folder'>
              <td>
                <Link to={`/home/folder/${el.id}`} style={{ width: "100%" }}>
                  <FontAwesomeIcon icon={faFolder} /> {el.name}
                </Link>
              </td>
              <td> {moment(el.date.toDate()).format("L,LT")}</td>
            </tr>
          ))}
          {filesD?.map((el) => (
            <tr className='file'>
              <td>
                <FontAwesomeIcon icon={faFile} /> {el.filename}
              </td>
              <td>
                {/* cherez id set qilinadi va id orqali aniqlanadi */}
                <span className='elipsis' onClick={() => handleTogle(el.id)}>
                  <FontAwesomeIcon icon={faEllipsis} />
                </span>
                <div
                  className={`icons ${
                    visibleDropdown === el.id ? "active" : ""
                  }`}>
                  <a href={el?.url}>
                    <FontAwesomeIcon icon={faDownload} /> Download
                  </a>
                  <span>
                    <FontAwesomeIcon
                      icon={faCopy}
                      onClick={() => copyToClipboard(el?.url)}
                    />{" "}
                    Copy Link
                  </span>
                  <span>
                    <FontAwesomeIcon
                      icon={faTrash}
                      onClick={() =>
                        dispatch(deleteFiles({ name: el.name, id: el.id }))
                      }
                    />{" "}
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
