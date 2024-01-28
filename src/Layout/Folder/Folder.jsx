import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUserFiles, getUserFolder } from "../../redux/extraReducer";
import FileList from "../FileList/FileList";
import Navbar from "../Navbar/Navbar";
import Header from "../Header/Header";
import CreateFolder from "../Modals/CreateFolder";
import Loader from "../Loader/Loader";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLeftLong, faRightLong } from "@fortawesome/free-solid-svg-icons";
import UploadFileModal from "../Modals/UploadFIleModal"; 

const Folder = () => {
  const user = JSON.parse(localStorage.getItem("localUser"));
  const { filesData, foldersData, postLoading } = useSelector(
    (state) => state.files
  );
  const [visibleUploadModal, setVisibleUploadModal] = useState(false);
  const [visibleCreateFolderModal, setVisibleCreateFolderModal] = useState(false);
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getUserFolder(user?.uid));
    dispatch(getAllUserFiles(user?.uid));
  }, [postLoading]);

  const foldersD = foldersData?.filter((x) => x.folderId === params.id);
  const filesD = filesData.filter((x) => x.folderId === params.id);

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
          <div className="container">
            <span style={{ fontSize: "30px" }} onClick={() => navigate(-1)}>
              <FontAwesomeIcon icon={faLeftLong} />
            </span>
            <span style={{ marginLeft: "30px", fontSize: "30px" }} onClick={() => navigate(1)}>
              <FontAwesomeIcon icon={faRightLong} />
            </span>
          </div>

          <div className="HomePage container">
            <FileList filesD={filesD} foldersD={foldersD} />
          </div>

          <CreateFolder
            folderID={params.id}
            visible={visibleCreateFolderModal}
            setVisible={setVisibleCreateFolderModal}
          />
          <UploadFileModal
            folderID={params.id}
            visible={visibleUploadModal}
            setVisible={setVisibleUploadModal}
          />
        </>
      )}
    </>
  );
};

export default Folder;
