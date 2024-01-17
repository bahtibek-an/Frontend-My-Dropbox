import React, { useEffect, useState } from "react";
import FileList from "../FileList/FileList";
import "./Home.css";
import Header from "../Header/Header";
import Navbar from "../Navbar/Navbar";
import CreateFolder from "../Modals/CreateFolder";
import UploadFileModal from "../Modals/UploadFileModal"; // Fix the import statement
import { useDispatch, useSelector } from "react-redux";
import { getAllUserFiles, getUserFolder } from "../../redux/extraReducer";
import Loader from "../Loader/Loader";

function Home() {
  let user = JSON.parse(localStorage.getItem("localUser"));
  const { filesData, foldersData, postLoading } = useSelector(
    (state) => state.files
  );
  const [visibleUploadModal, setVisibleUploadModal] = useState(false);
  const [visibleCreateFolderModal, setVisibleCreateFolderModal] = useState(false);

  var dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserFolder(user?.uid));
    dispatch(getAllUserFiles(user?.uid));
  }, [postLoading]);

  const foldersD = foldersData?.filter((x) => x.folderId == 1);
  const filesD = filesData.filter((x) => x.folderId == 1);

  return (
    <>
      {postLoading ? (
        <Loader />
      ) : (
        <>
          <Navbar />
          <Header
            navigationsState={false}
            setVisibleUploadModal={setVisibleUploadModal}
            setVisibleCreateFolderModal={setVisibleCreateFolderModal}
          />
          <div className='HomePage '>
            <div className='container'>
              <FileList filesD={filesD} foldersD={foldersD} />
            </div>
          </div>
          <CreateFolder
            folderID={1}
            visible={visibleCreateFolderModal}
            setVisible={setVisibleCreateFolderModal}
          />
          <UploadFileModal
            folderID={1}
            visible={visibleUploadModal}
            setVisible={setVisibleUploadModal}
          />
        </>
      )}
    </>
  );
}

export default Home;
