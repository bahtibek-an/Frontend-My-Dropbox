/** @format */

import React, { useState } from "react";
import foler__logo from "../../../assets/icons/folder.svg";
import "../Folder/Folder.scss";
import dayjs from "dayjs";
import FileModal from "./FileModal";
const File = ({ data }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      {" "}
      <div className='folders'>
        {data.map((el) => (
          <>
            <div className='card' onClick={() => setOpen(el.id)}>
              <div className='card_file'>
                <div className='img__container'>
                  <img src={foler__logo} alt='' />
                </div>
                <span>{el.filename}</span>
              </div>
              <span>{formatTimestamp(el.date)}</span>
            </div>
            {open == el.id ? (
              <FileModal open={open} setOpen={setOpen} data={el} />
            ) : null}
          </>
        ))}
      </div>
    </>
  );
};
const formatTimestamp = (timestamp) => {
  // Convert Firebase Timestamp to JavaScript Date
  const date = timestamp.toDate();

  // Format the Date using Day.js
  return dayjs(date).format("MM.DD.YYYY");
};

export default File;
