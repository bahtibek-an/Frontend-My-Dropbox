import React, { useState, useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import Navbar from "../../components/DashboardComponents/Navbar/Navbar";
import SubBar from "../../components/DashboardComponents/SubBar/SubBar";
import {
  getFiles,
  getFolders,
} from "../../redux/actionCreators/fileFoldersActionCreator";
import HomeComponent from "../../components/DashboardComponents/HomeComponent/HomeComponent";
import CreateFolder from "../../components/DashboardComponents/CreateFolder/CreateFolder";
import FolderComponent from "../../components/DashboardComponents/FolderComponent/FolderComponent";
import CreateFile from "../../components/DashboardComponents/CreateFile/CreateFile";
import FileComponent from "../../components/DashboardComponents/FileComponent/FileComponent";
import UploadFile from "../../components/DashboardComponents/UploadFile/UploadFile";
// import { UploadFile } from "@mui/icons-material";

const DashboardPage = () => {
  const [isCreateFolderModalOpen, setIsCreateFolderModalOpen] = useState(false);
  const [isCreateFileModalOpen, setIsCreateFileModalOpen] = useState(false);
  const [isFileUploadModalOpen, setIsFileUploadModalOpen] = useState(false);

  const [showSubBar, setShowSubBar] = useState(true);
  const { pathname } = useLocation();

  const { isLoggedIn, isLoading, userId } = useSelector(
    (state) => ({
      isLoggedIn: state.auth.isAuthenticated,
      isLoading: state.filefolders?.isLoading,
      userId: state.auth.user.uid,
    }),
    shallowEqual
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/dashboard");
    }
  }, []);
  useEffect(() => {
    // console.log(isLoading);
    if (isLoading && userId) {
      dispatch(getFolders(userId));
      dispatch(getFiles(userId));
    }
  }, [isLoading, userId, dispatch]);

  useEffect(() => {
    if (pathname.includes("/file/")) {
      console.log("pathname", pathname);
      setShowSubBar(false);
    }
    console.log("working");
  }, [pathname]);

  return (
    <>
      {isCreateFolderModalOpen && (
        <CreateFolder setIsCreateFolderModalOpen={setIsCreateFolderModalOpen} />
      )}
      {isCreateFileModalOpen && (
        <CreateFile setIsCreateFileModalOpen={setIsCreateFileModalOpen} />
      )}
      {isFileUploadModalOpen && (
        <UploadFile setIsFileUploadModalOpen={setIsFileUploadModalOpen} />
      )}
      <Navbar />
      {showSubBar && (
        <SubBar
          setIsCreateFolderModalOpen={setIsCreateFolderModalOpen}
          setIsCreateFileModalOpen={setIsCreateFileModalOpen}
          setIsFileUploadModalOpen={setIsFileUploadModalOpen}
        />
      )}
      <Routes>
        <Route path="" element={<HomeComponent />} />
        <Route path="folder/:folderId" element={<FolderComponent />} />
        <Route path="file/:fileId" element={<FileComponent />} />
      </Routes>
    </>
  );
};

export default DashboardPage;

// const DashboardPage = () => {
//   const dispatch = useDispatch();
//   const [folders, setFolders] = useState([]);
//   const params = useParams();
//   const { isLogged, isLoading, userId } = useSelector((state) => ({
//     isLogged: state.auth,
//     isLoading: state.FileFoldersReducer?.isLoading || [],
//     userId: state.auth.user?.uid || null,
//   }));

//   const [isCreatedFolderModel, setIsCreatedFolderModal] = useState(false);
//   const [isCreatedFileModel, setIsCreatedFileModal] = useState(false);
//   const [isUploadFileModel, setIsUploadFileModal] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!isLogged) {
//       navigate("/");
//     }
//     if (isLogged && userId !== null && userId !== undefined) {
//       dispatch(getFolders(userId, setFolders));
//       // dispatch(getFiles(userId));
//       dispatch(setFolders(params));
//     }
//   }, [userId, isCreatedFileModel, isUploadFileModel, isCreatedFolderModel]);

//   return (
//     <div style={{ background: "#000", height: "100vh" }}>
//       {isCreatedFolderModel && (
//         <CreateFolder setIsCreatedFolderModal={setIsCreatedFolderModal} />
//       )}
//       {isCreatedFileModel && (
//         <CreateFile setIsCreatedFileModal={setIsCreatedFileModal} />
//       )}
//       {isUploadFileModel && (
//         <UploadFile setIsUploadFileModal={setIsUploadFileModal} />
//       )}
//       <Navbar />
//       <SubBar
//         setIsCreatedFolderModal={setIsCreatedFolderModal}
//         setIsCreatedFileModal={setIsCreatedFileModal}
//         setIsUploadFileModal={setIsUploadFileModal}
//       />
//       <HomeComponent />
//       {/* <Routes>
//         <Route path="" element={<HomeComponent />} />
//         <Route path="/folder/:folderId" element={<FolderComponent />} />
//       </Routes> */}
//     </div>
//   );
// };

// export default DashboardPage;
