import React, { useEffect } from 'react'
import './SupBar.css'
import UploadFileIcon from '@mui/icons-material/UploadFile';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { shallowEqual, useSelector } from 'react-redux';
import { setFolder } from '../../redux/CreatorsAction/File/FileFolderActionCreator';
const SupBar = ({ setIsCreatedFolderModal, setIsCreatedFileModal, setIsUploadFileModal }) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();


    const { userFolders, currentFolder } = useSelector(
        (state) => ({
            userFolders: state.FileFoldersReducer?.userFolders || [],
            currentFolder: state.FileFoldersReducer?.currentFolder || '',
        }),
        shallowEqual,
    );

    const { currentFolderData } = useSelector(
        (state) => ({
            currentFolderData: state.FileFoldersReducer?.userFolders.find(
                (folder) => folder.id === currentFolder
            ),
        }))


    useEffect(() => {
        dispatch(setFolder(currentFolder, currentFolderData?.userId));
        console.log("data", currentFolderData);
    }, [userFolders, currentFolderData]);




    return (
        <header className='sup-header'>
            <div className="navbar-sup-header">
                <div className="sup-header-btn" onClick={() => setIsCreatedFolderModal(true)}>
                    <CreateNewFolderIcon titleAccess='Create folder' style={{ fontSize: "30px" }} />
                </div>
                <div className="sup-header-btn" onClick={() => setIsCreatedFileModal(true)}>
                    <NoteAddIcon titleAccess='Create file' style={{ fontSize: "30px" }} />
                </div>
                <div className="sup-header-btn" onClick={() => setIsUploadFileModal(true)}>
                    <UploadFileIcon titleAccess='Upload file' style={{ fontSize: "30px" }} />
                </div>
            </div>
        </header>
    )
}

export default SupBar