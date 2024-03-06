import React, { useEffect, useState } from 'react'
import './CreateFolder.css'
import CloseIcon from '@mui/icons-material/Close';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { uploadFile } from '../../../redux/CreatorsAction/File/FileFolderActionCreator';


const UploadFile = ({ setIsUploadFileModal }) => {
  const [file, setFile] = useState(null);
  const [success, setSuccess] = useState(true);
  const { userFiles, user, currentFolder } = useSelector(
    (state) => ({
      userFiles: state.FileFoldersReducer?.userFiles || [],
      user: state.auth.user,
      currentFolder: state.FileFoldersReducer?.currentFolder || 'root'
    }),
    shallowEqual,
  );

  const { currentFolderData } = useSelector(
    (state) => ({
      currentFolderData: state.FileFoldersReducer?.userFolders.find(
        (folder) => folder.id === currentFolder
      ) === undefined ? [] : [],
    }))



  const dispatch = useDispatch();

  const handleSumbit = async (e) => {
    e.preventDefault();

    if (file) {
      console.log("fileCreator:", file);
      if (!checkFileArleadyPresent(file)) {
        const userId = user.uid

        if (!userId || !user.uid) {
          console.log('User not available');
          return;
        }

        const pathArray = Array.isArray(currentFolderData.path) ? currentFolderData.path : [];

        const data = {
          CreatedAt: new Date(),
          name: file.name,
          userId: userId,
          createdBy: user.email,
          path:
            currentFolder === 'root'
              ? []
              : [...(currentFolderData?.path || []), currentFolder],
          parent: currentFolder,
          lastAccessed: null,
          updated: new Date(),
          data: null,
          url: ""
        }
        dispatch(uploadFile(data, file, currentFolder))
      } else {
        alert("Folder arleady present!");
      }

    } else {
      alert("Folder name cannot empty!")
    }

  }

  const checkFileArleadyPresent = (name) => {
    const filePresent = userFiles.find((file) => file.name === name);

    if (filePresent) {
      return true
    } else {
      return false
    }
  }

  return (
    <>
      <div className='folder-create-modal' style={{ padding: "30px" }}>
        {console.log("current folder ", currentFolder)}
        <h5 style={{ color: "white" }}>Create Folder</h5>
        <form className='create-folder-form' onSubmit={handleSumbit}>
          <input type="file" placeholder='File Name' className='create-folder-input' onChange={(e) => setFile(e.target.files[0])} />
        </form>
        <div className="btns_wrape">
          <button style={{ background: 'white', padding: "10px", border: "none", borderRadius: '10px' }} className='btn' onClick={handleSumbit}>Upload file</button>
          <button className='btn' onClick={() => setIsUploadFileModal(false)} style={{ background: "red", padding: "10px", border: "none", borderRadius: '10px', cursor: "pointer" }}>Close</button>
        </div>
      </div>
    </>

  )
}

export default UploadFile