import React from 'react'
import { shallowEqual, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import ShowFiles from './ShowFiles';
const Folder = () => {
  const { folderId } = useParams();
  console.log("folderId",folderId);
  
  const { currentFolder,childFolders } = useSelector(state =>({ 
    currentFolder: state.FileFoldersReducer.userFolders.find((folder) => folder.id === folderId),
    childFolders:state.FileFoldersReducer.userFolders.filter((folder) => folder.parent === folderId)
  }), shallowEqual)

  console.log("childFolder",childFolders);
  return (
    <>
    {
      childFolders.length > 0 ? (
        <>
            <ShowFiles title={"Created folders"} type={'folder'} items={childFolders}/>
        </>
      ):(
        <p>
          Empty folder
        </p>
      )
    }
    </>
  )
}

export default Folder