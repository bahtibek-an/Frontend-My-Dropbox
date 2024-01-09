/** @format */

import React, { useState } from "react";
import "./filetable.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteFiles } from "../../recovery/Reducer";

function Filetable({ filesD, foldersD }) {
  const [visibleDropdown, setVisibleDropdown] = useState(null);
  const handleTogle = (id) => {
    if (id === visibleDropdown) {
      setVisibleDropdown("");
      return;
    }
    setVisibleDropdown(id);
  };
  const [] = useState("https://example.com");
  const [copySuccess, setCopySuccess] = useState(false);
  const dispatch = useDispatch();
  const copyToClipboard = async (link) => {
    try {
      await navigator.clipboard.writeText(link);
      setCopySuccess(true);
      alert("Succsesfuly copiyed  Validity Period is 2 days");
    } catch (err) {
      console.error("Failed to copy link: ", err);
      setCopySuccess(false);
    }
  };
  console.log(copySuccess);
  return (
    <div className="fileTable">
      <table class="table">
        <tbody>
          {foldersD?.map((el) => (
            <tr className="folder">
              <td>
                <Link to={`/home/folder/${el.id}`} style={{ width: "100%", color: "#000" }}>
                  {el.name}
                </Link>
              </td>
            </tr>
          ))}
          {filesD?.map((el) => (
            <tr className="file" key={el.id}>
              <td>
                <a style={{ color: "#000" }} href={el?.url} target="_blank" rel="noopener noreferrer">
                  {el.filename}
                </a>
              </td>
              <td>
                <span className="elipsis" style={{ color: "#000" }} onClick={() => handleTogle(el.id)}>⫶</span>
                <div className={`icons ${visibleDropdown === el.id ? "active" : "" }`}>
                  <span onClick={() => copyToClipboard(el?.url)}>
                    link
                  </span>
                  <span onClick={() => dispatch(deleteFiles({ name: el.name, id: el.id }))}>
                    remove
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

export default Filetable;
