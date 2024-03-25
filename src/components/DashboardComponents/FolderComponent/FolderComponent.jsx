import { shallowEqual, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ShowItems from "../ShowItems/ShowItems";

const FolderComponent = () => {
  const { folderId } = useParams();

  const { currentFolderData, childFolders, childFiles } = useSelector(
    (state) => ({
      currentFolderData: state.filefolders.currentFolder,
      childFolders: state.filefolders.userFolders.filter(
        (folder) => folder.data.parent == folderId
      ),
      childFiles: state.filefolders.userFiles.filter(
        (file) => file.parent == folderId
      ),
    }),
    shallowEqual
  );

  console.log(currentFolderData);

  return (
    <div>
      {/* {childFolders.length > 0 ? ( */}
        <>
          {childFolders.length > 0 && (
            <ShowItems
              title={"Created Folders"}
              type={"folder"}
              items={childFolders}
            />
          )}
          {childFiles.length > 0 && (
            <ShowItems
              title={"Created Files"}
              type={"file"}
              items={childFiles.filter((file) => file?.url == null)}
            />
          )}
          {childFiles.length > 0 && (
            <ShowItems
              title={"Uploaded Files"}
              type={"upload-files"}
              items={childFiles.filter((file) => file.data === null && file.path[0] === currentFolderData)}
            />
          )}
        </>
      {/* ) : ( */}
        {/* <p className="text-center my-5">Folder is empty</p> */}
      {/* )} */}
    </div>
  );
};

export default FolderComponent;

// import { shallowEqual, useSelector } from "react-redux";
// import { useParams } from "react-router-dom";
// import ShowItems from "../ShowItems/ShowItems";

// const FolderComponent = () => {
//   const { folderId } = useParams();

//   const { currentFolder, childFolders, userFiles, childFiles } = useSelector(
//     (state) => ({
//       currentFolder: state.fileFoldersReducer?.userFolders?.find(
//         (folder) => folder.id === folderId
//       ),
//       childFolders: state.fileFoldersReducer?.userFolders.filter(
//         (folder) => folder.parent === folderId
//       ),
//       userFiles: state.fileFoldersReducer?.userFiles || [],
//       childFiles: state.filefolders.userFiles.filter(
//         (file) => file.data.parent == folderId
//       ),
//     }),
//     shallowEqual
//   );

//   const file = userFiles.filter(
//     (file) => file.data === null && file.path[0] === currentFolder.id
//   );
//   //   console.log("filee", file);
//   return (
//     <>
//       {childFolders?.length > 0 ? (
//         <>
//           <ShowItems
//             title={"Created folders"}
//             type={"folder"}
//             items={childFolders}
//           />
//           <ShowItems
//             title={"Created Files"}
//             type={"file"}
//             items={childFiles.filter((file) => file.data.url == null)}
//           />
//         </>
//       ) : (
//         <>
//           <p className="text-center my-4">
//             <ShowItems
//               title={"Created folder"}
//               type={"folder"}
//               items={userFiles.filter(
//                 (file) =>
//                   file.data === null && file.path[0] === currentFolder.id
//               )}
//             />
//             <ShowItems
//               title={"Created Files"}
//               type={"file"}
//               items={childFiles.filter((file) => file.data.url == null)}
//             />
//             Folder is empty
//           </p>
//         </>
//       )}
//     </>
//   );
// };

// export default FolderComponent;
