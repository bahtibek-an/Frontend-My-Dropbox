import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Routes, useNavigate, useParams } from 'react-router-dom';
import Navbar from '../../Components/DashboardComponents/Navbar';
import SupBar from '../../Components/SupBar/SupBar';
import HomePage from '../../Components/DashboardComponents/HomePage';
import CreatedFolder from '../../Components/DashboardComponents/CreateFolder';
import { getFiles, getFolders, setFolder } from '../../redux/CreatorsAction/FileFolderActionCreator';
import Folder from '../../Components/DashboardComponents/Folder';
import CreateFile from '../../Components/DashboardComponents/CreateFile';
import UploadFile from '../../Components/DashboardComponents/UploadFile';

const Dashboard = () => {
  const dispatch = useDispatch();
  const [folders,setFolders] = useState([]);
  const params = useParams();
  const {isLogged,isLoading,userId} = useSelector((state) => ({
    isLogged:state.auth,
    isLoading:state.FileFoldersReducer?.isLoading || [],
    userId:state.auth.user?.uid || null
  })
  );

  const [isCreatedFolderModel,setIsCreatedFolderModal] = useState(false)
  const [isCreatedFileModel,setIsCreatedFileModal] = useState(false)
  const [isUploadFileModel,setIsUploadFileModal] = useState(false)
  const navigate = useNavigate();

  useEffect(() => {
    if(!isLogged){
      navigate('/');
    }
    if(isLogged && userId !== null && userId !== undefined){
      dispatch(getFolders(userId,setFolders))
      dispatch(getFiles(userId))
      dispatch(setFolder(params))
    }
  },[dispatch,userId,setFolders])
  
  return (
    <div>

      {
        isCreatedFolderModel && (
          <CreatedFolder setIsCreatedFolderModal={setIsCreatedFolderModal} />
        )
      }
            {
        isCreatedFileModel && (
          <CreateFile setIsCreatedFileModal={setIsCreatedFileModal} />
        )
      }
      {
        isUploadFileModel && (
          <UploadFile setIsUploadFileModal={setIsUploadFileModal} />
        )
      }
      <Navbar/>
      <SupBar setIsCreatedFolderModal={setIsCreatedFolderModal} setIsCreatedFileModal={setIsCreatedFileModal} setIsUploadFileModal={setIsUploadFileModal}/>
      <Routes>
        <Route path='' element={<HomePage/>}/>
        <Route path='/folder/:folderId' element={<Folder/>}/>
      </Routes>
    </div>
  )
}

export default Dashboard