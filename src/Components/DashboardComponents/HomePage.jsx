import React from 'react'
import './HomePage.css'
import ShowFiles from './ShowFiles';
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

  return (
    <div>
        <ShowFiles title={"Created folders"} type={'folder'} items={userFolders}/>
        <ShowFiles title={"Created files"} type={'files'} items={userFiles.filter((file) => file.url === null)}/>
        <ShowFiles title={"Upload files"} type={'files'} items={userFiles.filter((file) => file.data === null)}/>
    </div>
  )
}

export default HomePage