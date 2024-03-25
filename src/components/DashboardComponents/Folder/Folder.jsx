import React, { useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ShowItems from "../ShowItems/ShowItems";

const Folder = () => {
  const { folderId } = useParams();
  // console.log("folderId", folderId);

  const { currentFolder, childFolders, userFiles } = useSelector(
    (state) => ({
      currentFolder: state.fileFolders.userFolders.find(
        (folder) => folder.id === folderId
      ),
      childFolders: state.fileFolders.userFolders.filter(
        (folder) => folder?.data.parent === folderId
      ),
      userFiles: state.fileFolders?.userFiles || [],
    }),
    shallowEqual
  );

  useEffect(() => {

  },[userFiles,childFolders])

  const file = userFiles.filter(
    (file) => file.data === null && file.path[0] === currentFolder.id
  );
  console.log("filee", file);
  return (
    <>
      {childFolders.length > 0 ? (
        <>
          <ShowItems
            title={"Created folders"}
            type={"folder"}
            items={childFolders}
          />
          <ShowItems
            title={"Created Files"}
            type={"upload-files"}
            items={userFiles.filter((file) => file?.url == null)}
          />
          <ShowItems
            title={"Uploaded Files"}
            type={"upload-files"}
            items={userFiles.filter((file) => file.data === null && file.path[0] === currentFolder.id)}
          />
        </>
      ) : (
        <>
          <ShowItems
            title={"Uploaded Files"}
            type={"upload-files"}
            items={userFiles.filter(
              (file) => file.data === null && file.path[0] === currentFolder.id
            )}
          />
          Folder is empty
        </>
      )}
    </>
  );
};

export default Folder;
