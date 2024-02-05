import React, { useEffect } from 'react'
import './SupBar.css'
import UploadFileIcon from '@mui/icons-material/UploadFile';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { shallowEqual, useSelector } from 'react-redux';
import { setFolder } from '../../redux/CreatorsAction/FileFolderActionCreator';
const SupBar = ({ setIsCreatedFolderModal, setIsCreatedFileModal ,setIsUploadFileModal}) => {
    
    const navigate = useNavigate();
    const dispatch = useDispatch();


    const { userFolders, currentFolder} = useSelector(
        (state) => ({
            userFolders: state.FileFoldersReducer?.userFolders || [],
            currentFolder: state.FileFoldersReducer?.currentFolder || '',    
        }),
        shallowEqual,
    );

     const {currentFolderData} = useSelector(
        (state) => ({
            currentFolderData: state.FileFoldersReducer?.userFolders.find(
                (folder) => folder.id === currentFolder
            ),
    }))
    
    
    useEffect(()  =>{
       dispatch(setFolder(currentFolder,currentFolderData?.userId));
       console.log("data",currentFolderData);
    }, [currentFolderData]);




    return (
        <header className='sup-header'>

            <div className="nav-root">
                <Link to={'/dashboard'}>
                    Root
                </Link>
                {/* {
                    currentFolder !== "root" ? (
                        <>
                            <Link onClick={() => handleNavigate('/dashboard')}>
                                Root
                            </Link>/
                            {
                                currentFolderData?.path.map((folder, index) => (
                                    <Link key={index}
                                        onClick={() => handleNavigate(`/dashboard/folder/${userFolders.find((fldr) => folder === fldr.id).id
                                            }`,
                                            userFolders.find((fldr) => folder === fldr.id).id
                                        )
                                        }

                                    >
                                        {
                                            userFolders.find((fldr) => folder === fldr.id)?.data.name
                                        
                                        }
                                    </Link>
                                ))
                            }
                            <b>
                                {
                                    currentFolderData?.name
                                }
                            </b>
                        </>
                    ) : (
                        <>

                        </>
                    )
                } */}
            </div>

            <div className="navbar-sup-header">
                <div className="sup-header-btn" onClick={() => setIsUploadFileModal(true)}>
                    <UploadFileIcon />
                    <p>Upload file</p>
                </div>
                <div className="sup-header-btn" onClick={() => setIsCreatedFolderModal(true)}>
                    <CreateNewFolderIcon />
                    <p>Create folder</p>
                </div>
                <div className="sup-header-btn" onClick={() => setIsCreatedFileModal(true)}>
                    <NoteAddIcon />
                    <p>Create file</p>
                </div>
            </div>
        </header>
    )
}

export default SupBar