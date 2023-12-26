/** @format */

import React, { useEffect } from "react";
import "./Home.scss";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import Folder from "../Folder/Folder";
import File from "../File/File";
import { useDispatch, useSelector } from "react-redux";
import { getAllFolders, getAllUserFiles } from "../../redux/extraReducer";
import { useParams } from "react-router-dom";
const Home = () => {
  const { folders, createLoading, files ,deleteFolderOrFile} = useSelector((state) => state.files);
  const paramId = useParams();
  const user = JSON.parse(localStorage.getItem("local"));
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllFolders(user?.uid));
    dispatch(getAllUserFiles(user?.uid));
  }, [createLoading, deleteFolderOrFile]);

  const filtredData = folders?.filter((x) =>
    paramId.id ? x.folderId === paramId.id : x.folderId == 1
  );
  const filtredFiles = files?.filter((x) =>
    paramId.id ? x.folderId === paramId.id : x.folderId == 1
  );
  return (
    <div className='home'>
      <Sidebar />
      <div style={{ width: "100%" }}>
        <Navbar />
        <div className='home__contents'>
          {/* <p>Folders</p> */}
          <Folder data={filtredData} />
          {/* <p>FIles</p> */}
          {deleteFolderOrFile ? (
            <h1>Loading...</h1>
          ) : (
            <File files={filtredFiles} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
