import React, { useEffect } from 'react'
import './ShowFiles.css'
import FolderIcon from '@mui/icons-material/Folder';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteFile, setFolder } from '../../redux/CreatorsAction/FileFolderActionCreator';
import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from '@mui/icons-material/Download';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

const ShowFiles = ({title,items,type}) => {

    console.log("items",items);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const handleDoubleClick = (folderId) => {
        if(type === "folder"){
            navigate(`/dashboard/folder/${folderId}`)
            dispatch(setFolder(folderId))
        }else{
            alert('file clicked')
        }

        useEffect(() => {
            console.log(items);
        },[items])
    }


    const handleDownload = (item) => {
        navigate(item)
        
    }

    const handleCopy = (item) => {
        navigator.clipboard.writeText(item)
    }

    const handleDeleteFile = (userId) => {
        dispatch(deleteFile(userId))
    }
        


  return (
    <div className='files-wrape'>
        <h4 className='filew-wrape-title'>{title}</h4>
        <div className="files">
            
            {
                items.map((item,index) => {
                    return (
                        <p className='file' key={index ** 55} onDoubleClick={() => handleDoubleClick(item.id)}>
                            {
                                type === "folder" ? (
                                    <FolderIcon className='folder-icon' fontSize='30px'/>
                                ): (
                                    <InsertDriveFileIcon className='file-icon' fontSize='30px'/>
                                )
                            }
                            {item.name}
                            {
                                title === "Upload files" ? (
                                    <div className='bts-wrape' style={{display:'flex', alignItems:'center',padding:"13px",gap:"15px"}}>
                                        <Button style={{fontSize:"10px"}} onClick={() => handleCopy(item.url)}>
                                           <ContentCopyIcon/>
                                        </Button>
                                        <a href={item.url} style={{fontSize:"10px",background:"#3EDE46",color:'white',textAlign:'center',textDecoration:'none'}}>
                                            <DownloadIcon />
                                        </a>
                                        <Button onClick={() => handleDeleteFile(item.userId)} style={{fontSize:"10px",background:"#DD0B0B",color:'white',textAlign:'center'}}><DeleteIcon/></Button>
                                    </div>
                                ): null
                            }
                        </p>
                    )
                })
            }
        </div>
    </div>
  )
}

export default ShowFiles