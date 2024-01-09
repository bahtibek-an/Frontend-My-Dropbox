import React, { useEffect, useState } from "react";
import Header from "../caption/caption";
import Navbar from "../menubar/menubar";
import CreateFolder from "../menu/addfolder";
import UploadFIleModal from "../menu/addfile";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllUserFiles, getUserFolder } from "../../recovery/Reducer";
import FileList from "../file_table/filetable";
import "../mainpage/mainpage.css";
import Loader from "../aniload/aniload";

const Directory = () => {
  let user = JSON.parse(localStorage.getItem("localUser"));
  const { filesData, foldersData, postLoading } = useSelector(
    (state) => state.files
  );
  const [visibleUploadModal, setVisibleUploadModal] = useState(false);
  const [visibleCreateFolderModal, setVisibleCreateFolderModal] =
    useState(false);
  const params = useParams();
  var dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserFolder(user?.uid));
    dispatch(getAllUserFiles(user?.uid));
  });
  const foldersD = foldersData?.filter((x) => x.folderId === params.id);
  const filesD = filesData.filter((x) => x.folderId === params.id);
  var navigate = useNavigate();

  return (
    <>
      {postLoading ? (
        <Loader />
      ) : (
        <>
          <Navbar />
          <Header
            navigationsState={true}
            setVisibleUploadModal={setVisibleUploadModal}
            setVisibleCreateFolderModal={setVisibleCreateFolderModal}
          />
          <div className='container'>
            <span style={{ color: "#000", cursor: "pointer"}} onClick={() => navigate(-1)}>
              Back
            </span>
          </div>
          <div className='HomePage '>
            <div className='container'>
              <FileList filesD={filesD} foldersD={foldersD} />
            </div>
          </div>
          <CreateFolder
            folderID={params.id}
            visible={visibleCreateFolderModal}
            setVisible={setVisibleCreateFolderModal}
          />
          <UploadFIleModal
            folderID={params.id}
            visible={visibleUploadModal}
            setVisible={setVisibleUploadModal}
          />
        </>
      )}
    </>
  );
};

export default Directory;
