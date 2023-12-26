/** @format */

import React, { useState } from "react";
import "../Folder/Folder.scss";
import fileIcon from "../../../assets/images/fileIcon.png";
import { Modal } from "antd";
import FileModal from "./FileModal";
const File = ({ files }) => {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ display: "flex" }} className='folders'>
      {files?.map((f) => {
        return (
          <>
            <ul className='ul' key={f.id}>
              <div className='span' onClick={() => setOpen(f.id)}>
                <div className='icon_con'>
                  <img src={fileIcon} alt='' />
                </div>
                {f.filename?.toString().slice(0, 6)}
              </div>
            </ul>
            {open == f.id ? <FileModal open={open} setOpen={setOpen} data={f}/> : null}
          </>
        );
      })}
    </div>
  );
};

export default File;
