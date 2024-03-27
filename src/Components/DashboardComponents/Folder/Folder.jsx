import React from 'react'
import { shallowEqual, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import ShowFiles from '../../ShowFiles/ShowFiles';
const Folder = () => {
  const { folderId } = useParams();
  console.log("folderId",folderId);
  
  const { currentFolder,childFolders ,userFiles} = useSelector(state =>({ 
    currentFolder: state.FileFoldersReducer.userFolders.find((folder) => folder.id === folderId),
    childFolders:state.FileFoldersReducer.userFolders.filter((folder) => folder.parent === folderId),
    userFiles: state.FileFoldersReducer?.userFiles || [],
  }), shallowEqual)

  const file = userFiles.filter((file) => file.data === null && file.path[0] === currentFolder.id);
  console.log("filee",file);
  return (
    <>
    {
      childFolders.length > 0 ? (
        <>
            <ShowFiles title={"Created folders"} type={'folder'} items={childFolders}/>
            <ShowFiles title={"Uploaded Files"} type={'file'} items={userFiles.filter((file) => file.data === null && file.path[0] === currentFolder.id)}/>
        </>
      ):(
        <p>
          <ShowFiles title={"Uploaded Files"} type={'file'} items={userFiles.filter((file) => file.data === null && file.path[0] === currentFolder.id)}/>
          Empty folder
        </p>
      )
    }
    </>
  )
}

export default Folder