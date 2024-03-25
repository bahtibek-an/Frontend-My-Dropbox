import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./ShowItems.css";
import { faFolder } from "@fortawesome/free-solid-svg-icons";
import { faFileAlt } from "@fortawesome/free-regular-svg-icons";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { changeFolder, deleteFile } from "../../../redux/actionCreators/fileFoldersActionCreator";
import { FileDownload, Delete, CopyrightOutlined, CopyAll, Spa } from "@mui/icons-material";
import { useEffect } from "react";

const ShowItems = ({ title, items, type }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleDblClick = (itemId) => {
    if (type === "folder") {
      navigate(`/dashboard/folder/${itemId}`);
      dispatch(changeFolder(itemId));
    } else {
      // alert("File clicked!");
    }
  };

  const handleDelete = (userId) => {
    console.log(userId);
    dispatch(deleteFile(userId))
  }

  const handleCopy = (url) => {
    navigator.clipboard.writeText(url)
    alert("Copied to clipboard!")
  }

  useEffect(() => {
    console.log("filllee", items)
  },[items])

  return (
    <div className="w-100 files-wrape" style={{ background: "#fff" }}>
      <h4 className="text-center border-bottom py-2">{title}</h4>
      <div className="row gap-2 p-4 flex-wrap">
        {items?.map((item, index) => {
          return (
            <p
              key={index * 55}
              className="col-md-2 p-3 text-center d-flex flex-column border "
              style={{ cursor: "pointer" }}
              onDoubleClick={() => handleDblClick(item.docId)}
            >
              {type == "folder" ? (
                <FontAwesomeIcon icon={faFolder} size="4x" className="mb-3" />
              ) : type === "upload-files" ? (
                <FontAwesomeIcon icon={faDownload} size="4x" className="mb-3" />
              ) :
                (
                  <FontAwesomeIcon icon={faFileAlt} size="4x" className="mb-3" />
                )}
                {
                  type == 'folder' ? (
                    <span>{item.data?.name}</span>
                  ):(
                    <span>{item.name}</span>
                  )
                }
              {
                type === 'upload-files' ? (
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'center', justifyContent: 'center', marginTop: '30px' }}>
                    <a href={item?.url}>
                      <FileDownload href={item?.url} />
                    </a>
                    <Delete onClick={() => handleDelete(item?.userId)} />
                    <CopyAll onClick={() => handleCopy(item?.url)} />
                  </div>
                ) : null
              }
            </p>
          );
        })}
      </div>
    </div>
  );
};

export default ShowItems;

// import React, { useEffect } from "react";
// import "./ShowItems.css";
// import FolderIcon from "@mui/icons-material/Folder";
// import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import {
//   deleteFile,
//   setFolder,
// } from "../../../redux/actionCreators/fileFoldersActionCreator";
// import { Button } from "@mui/material";
// import DeleteIcon from "@mui/icons-material/Delete";
// import DownloadIcon from "@mui/icons-material/Download";
// import ContentCopyIcon from "@mui/icons-material/ContentCopy";

// const ShowItems = ({ title, items, type }) => {
//   console.log("items", items);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const handleDoubleClick = (folderId) => {
//     if (type === "folder") {
//       navigate(`/dashboard/folder/${folderId}`);
//       dispatch(setFolder(folderId));
//     } else {
//       console.log("file successfully!");
//     }
//   };

//   useEffect(() => {
//     console.log(items);
//   }, [items]);

//   const handleDownload = (item) => {
//     navigate(item);
//   };

//   const handleCopy = (item) => {
//     navigator.clipboard.writeText(item);
//   };

//   const handleDeleteFile = (userId) => {
//     dispatch(deleteFile(userId));
//   };

//   return (
//     <div className="w-100 files-wrape" style={{ background: "#fff" }}>
//       {/* <h4 className='filew-wrape-title'>{title}</h4> */}
//       {/* <div className="files"> */}

//       {items?.map((item, index) => {
//         return (
//           <p
//             className="file"
//             key={index ** 55}
//             onDoubleClick={() => handleDoubleClick(item.id)}
//             style={{ cursor: "pointer" }}
//           >
//             <div className="file-info">
//               {type === "folder" ? (
//                 <FolderIcon
//                   className="folder-icon items-center"
//                   fontSize="50px"
//                 />
//               ) : (
//                 <InsertDriveFileIcon className="file-icon" fontSize="50px" />
//               )}
//               <b className="file-name">{item.name}</b>
//             </div>
//             {title === "Uploaded Files" ? (
//               <div
//                 className="bts-wrape"
//                 style={{
//                   display: "flex",
//                   alignItems: "center",
//                   flexDirection: "column",
//                   padding: "13px",
//                   gap: "15px",
//                 }}
//               >
//                 <Button
//                   style={{ fontSize: "10px" }}
//                   onClick={() => handleCopy(item.url)}
//                 >
//                   <ContentCopyIcon />
//                 </Button>
//                 <a
//                   href={item.url}
//                   style={{
//                     fontSize: "10px",
//                     color: "white",
//                     textAlign: "center",
//                     textDecoration: "none",
//                   }}
//                 >
//                   <DownloadIcon />
//                 </a>
//                 <Button
//                   onClick={() => handleDeleteFile(item.userId)}
//                   style={{
//                     fontSize: "10px",
//                     color: "white",
//                     textAlign: "center",
//                   }}
//                 >
//                   <DeleteIcon />
//                 </Button>
//               </div>
//             ) : null}
//           </p>
//         );
//       })}
//       {/* </div> */}
//     </div>
//   );
// };

// export default ShowItems;

//
