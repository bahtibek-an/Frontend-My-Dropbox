import React, { useEffect } from 'react'
import './HomePage.css'
import ShowFiles from '../../ShowFiles/ShowFiles';
import { shallowEqual, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const HomePage = () => {
    const params = useParams();
    console.log("params",params);
    const { isLoading, userFolders ,userFiles,childFolders} = useSelector((state) => ({
      userFolders: state.FileFoldersReducer.userFolders.filter((folder) => folder.parent === "root"),
      userFiles: state.FileFoldersReducer?.userFiles || [],
      // childFolders:state.FileFoldersReducer.userFolders
      // isLoading: state.FileFoldersReducer.isLoading,
    }));

    useEffect(() => {
      
    },[userFolders,isLoading])
  return (
    <div style={{display:"flex"}}>
        <ShowFiles title={"Files"} type={'files'} items={userFiles.filter((file) => file.url === null)}/>
        <ShowFiles title={"Folders"} type={'folder'} items={userFolders}/>
        <ShowFiles title={"Uploaded Files"} type={'files'} items={userFiles.filter((file) => file.data === null && file.path.length == 0)}/>
    </div>
  )
}

export default HomePage