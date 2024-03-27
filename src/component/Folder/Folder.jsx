import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClose,
  faLeftLong,
  faRightLong,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllUserFiles,
  getUserFolder,
} from "../../redux/extraReducer";
import Header from "../Header/Header";
import Navbar from "../Navbar/Navbar";
import CreateFolder from "../Modals/CreateFolder";
import UploadFileModal from "../Modals/UploadFileModal";
import FileList from "../FileList/FileList";
import Loader from "../Loader/Loader";
import "../Home/Home.css";

const Folder = () => {
  const user = JSON.parse(localStorage.getItem("localUser"));
  const { filesData, foldersData, postLoading } = useSelector(
    (state) => state.files
  );
  const [visibleUploadModal, setVisibleUploadModal] = useState(false);
  const [visibleCreateFolderModal, setVisibleCreateFolderModal] =
    useState(false);
  const params = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserFolder(user?.uid));
    dispatch(getAllUserFiles(user?.uid));
  }, [postLoading]);

  const foldersD = foldersData?.filter((x) => x.folderId == params.id);
  const filesD = filesData.filter((x) => x.folderId == params.id);
  const navigate = useNavigate();

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
            <span>
              <FontAwesomeIcon
                icon={faLeftLong}
                style={{ fontSize: "30px" }}
                onClick={() => navigate(-1)}
              />
            </span>
            <span
              style={{ marginLeft: "30px", fontSize: "30px" }}
              onClick={() => navigate(1)}
            >
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
