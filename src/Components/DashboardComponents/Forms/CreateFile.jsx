import React, { useEffect, useState } from 'react'
import './CreateFolder.css'
import CloseIcon from '@mui/icons-material/Close';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { createFile, createFolder } from '../../../redux/CreatorsAction/File/FileFolderActionCreator';
import { useNavigate } from 'react-router-dom';


const CreateFile = ({ setIsCreatedFileModal }) => {
  const [fileName, setFileName] = useState("");
  const [userName, setUserName] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const { userFiles, user, currentFolder } = useSelector(
    (state) => ({
      userFiles: state.FileFoldersReducer?.userFiles || [],
      user: state.auth.user,
      currentFolder: state.FileFoldersReducer?.currentFolder || null
    }),
    shallowEqual,
  );



  const dispatch = useDispatch();

  const handleSumbit = async (e) => {
    e.preventDefault();

    if (fileName) {
      if (fileName.length > 3) {
        let extension = false;

        if (fileName.split('.').length > 1) {
          extension = true
        }
        if (!checkFileArleadyPresent(fileName)) {
          const userId = await user.uid

          if (!userId || !user.uid) {
            console.log('User not available');
            return;
          }

          const data = {
            CreatedAt: new Date(),
            name: extension ? fileName : `${fileName}.txt`,
            userId: userId,
            createdBy: user.email,
            path: currentFolder === 'root'
              ? []
              : [],
            parent: currentFolder === null ? [] : [],
            lastAccessed: null,
            updated: new Date(),
            data: '',
            url: null
          }

          dispatch(createFile(data, setSuccess, navigate))
        } else {
          alert("Folder arleady present!");
        }
      } else {
        alert("Folder name must be at 3+ characters!")
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
        <h5 style={{ color: "white" }}>Create File</h5>
        {/* <CloseIcon style={{color:"white"}} className='icon' onClick={() => setIsCreatedFileModal(false)}/> */}
        <form className='create-folder-form' onSubmit={handleSumbit}>
          <input type="text" placeholder='File Name' className='create-folder-input' onChange={(e) => setFileName(e.target.value)} />
        </form>
        <div className="btns_wrape">
          <button className='btn' style={{ background: 'white', padding: "10px", border: "none", borderRadius: '10px', cursor: "pointer" }} onClick={handleSumbit}>Create</button>
          <button className='btn' onClick={() => setIsCreatedFileModal(false)} style={{ background: "red", padding: "10px", border: "none", borderRadius: '10px', cursor: "pointer" }}>Close</button>
        </div>
      </div>
    </>

  )
}

export default CreateFile