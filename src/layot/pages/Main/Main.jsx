/** @format */

import React, { useEffect } from "react";
import Folder from "../Folder/Folder";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import { getAllFolders, getAllUserFiles } from "../../../redux/folderSlice";
import { useParams } from "react-router-dom";
import File from "../File/File";

const Main = ({ user }) => {
  const { foldersData, fileLoader,deleteFi, files } = useSelector((state) => state.bases);
  const dispatch = useDispatch();
  const paramId = useParams();
  const local = JSON.parse(localStorage.getItem("currentUser"));
  useEffect(() => {
    dispatch(getAllFolders(local?.uid));
    dispatch(getAllUserFiles(local?.uid))
}, [fileLoader, deleteFi]);

const filtredData = foldersData?.filter((x) =>
paramId.id ? x.folderId === paramId.id : x.folderId == 1
);
const filtredFiles = files?.filter((x) =>
paramId.id ? x.folderId === paramId.id : x.folderId == 1
);
console.log(filtredFiles);
  return (
    <>
      <Sidebar />
      <div style={{ width: "100%" }}>
        <div className='pages'>
          <Navbar user={user} />
          <Folder data={filtredData} />
          <File data={filtredFiles} />
        </div>
      </div>
    </>
  );
};

export default Main;
