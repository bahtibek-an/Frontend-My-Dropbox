import React, { useEffect, useState } from 'react'
import './CreateFolder.css'
import CloseIcon from '@mui/icons-material/Close';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import {createFolder} from '../../redux/CreatorsAction/FileFolderActionCreator'


const CreateFolder = ({setIsCreatedFolderModal}) => {
  const [folderName,setFolderName] = useState("");
  const [userName,setUserName] = useState("");
  const [success,setSuccess] = useState(false);

const { userFolders, currentFolder,user} = useSelector(
    (state) => ({
        userFolders: state.FileFoldersReducer?.userFolders || [],
        currentFolder: state.FileFoldersReducer?.currentFolder || "root",
        user:state.auth.user
    }),
    shallowEqual,
);

const {currentFolderData} = useSelector(
    (state) => ({
        currentFolderData: state.FileFoldersReducer?.userFolders.find(
            (folder) => folder.id === currentFolder
        ) === undefined ? [] : [],
}))

useEffect(() => {
  console.log("current folder data",currentFolderData);
  console.log("current folder ",currentFolder);
},[currentFolderData,userFolders,currentFolder])

const chekFolderArleadyPresent =  (name) => {
  try {
    const folderPresent =  userFolders
      .filter((folder) => folder.parent === currentFolder)
      .find((folder) => folder.name === name);

    if (folderPresent) {
      return true;
    } else {  
      return false;
    }
  } catch (error) {
    console.error("Error checking folder existence:", error.message);
    return false;
  }
};


  const dispatch = useDispatch();

  const handleSumbit = async(e) => {
    e.preventDefault();

    if(folderName){
      if(folderName.length > 3){
        if(!chekFolderArleadyPresent(folderName)){
          try {
            if(!user.uid || !user){
              console.log('User not available');
              return;
            }
            
            const data = {
              CreatedAt:new Date(),
              name:folderName,
              userId:user.uid,
              createdBy:user.email,
              path:
              currentFolder === "root"
              ? [] 
              : [...(currentFolderData?.path || []), currentFolder],
              parent:currentFolder,
              lastAccessed:null,
              updated: new Date(),
            }
              
            dispatch(createFolder(data))
          } catch (error) {
            console.log(error);
          }

          }else{
            alert("Folder arleady present!");
          }
        }else{
          alert("Folder name must be at 3+ characters!")
        }
      }else{
        alert("Folder name cannot empty!")
      }

    }



  return (
    <>

        <div className='folder-create-modal'>
        <h5>Create Folder</h5>
        <CloseIcon className='icon' onClick={() => setIsCreatedFolderModal(false)}/>
          <form className='create-folder-form' onSubmit={handleSumbit}>
              <input type="text" placeholder='Folder Name' className='create-folder-input' onChange={(e) => setFolderName(e.target.value)}/>
          </form>
          <button className='sumbit_btn' onClick={handleSumbit}>Create</button>
      </div>
    </>
 
  )
}

export default CreateFolder