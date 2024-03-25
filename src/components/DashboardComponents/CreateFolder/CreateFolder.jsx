import { useState } from "react";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { createFolder } from "../../../redux/actionCreators/fileFoldersActionCreator";

const CreateFolder = ({ setIsCreateFolderModalOpen }) => {
  const [folderName, setFolderName] = useState("");

  const { userFolders, user, currentFolder, currentFolderData } = useSelector(
    (state) => ({
      userFolders: state.filefolders.userFolders,
      user: state.auth.user,
      currentFolder: state.filefolders.currentFolder,
      currentFolderData: state.filefolders.userFolders.find(
        (folder) => folder.docId == state.filefolders?.currentFolder
      ),
    }),
    shallowEqual
  );

  const dispatch = useDispatch();

  const checkFolderAlreadyPresent = (name) => {
    const folderPresent = userFolders
      .filter((folder) => folder.data.parent == currentFolder)
      .find((fldr) => fldr.data.name == name);
    if (folderPresent) {
      return true;
    } else {
      return false;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (folderName) {
      if (folderName.length > 3) {
        if (!checkFolderAlreadyPresent(folderName)) {
          const data = {
            createdAt: new Date(),
            name: folderName,
            userId: user.uid,
            createdBy: user.displayName,
            path:
              currentFolder == "root"
                ? []
                : [...currentFolderData?.data.path, currentFolder],
            parent: currentFolder,
            lastAccessed: null,
            updateAt: new Date(),
          };
          dispatch(createFolder(data));
        } else {
          alert("Folder already present");
        }
      } else {
        alert("Folder name must be least 3 characters");
      }
    } else {
      alert("Folder name connot be empty");
    }
  };

  return (
    <div
      className="col-md-12  position-fixed top-0 left-0 w-100 h-100"
      style={{ background: "rgba(0, 0, 0, 0.4)", zIndex: 9999 }}
    >
      <div className="row align-items-center justify-content-center">
        <div style={{ width: "400px" }}>
          <div className="mt-5 bg-white  rounded p-4">
            <div className="d-flex justify-content-between">
              <h4>Create Folder</h4>
              <button
                className="btn"
                onClick={() => setIsCreateFolderModalOpen(false)}
              >
                <FontAwesomeIcon
                  icon={faTimes}
                  className="text-black"
                  size="sm"
                />
              </button>
            </div>
          </div>
          <div className="d-flex flex-column align-items-center">
            <form className="mt-3  w-100" onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  id="folderName"
                  placeholder="Folder Name"
                  value={folderName}
                  onChange={(e) => setFolderName(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary mt-5 form-control"
              >
                Create Folder
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateFolder;

// import { useState } from "react";
// import { faTimes } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { shallowEqual, useDispatch, useSelector } from "react-redux";
// import { createFolder } from "../../../redux/actionCreators/fileFoldersActionCreator";
// import { useEffect } from "react";

// const CreateFolder = ({ setIsCreateFolderModalOpen }) => {
//   const [folderName, setFolderName] = useState("");
//   const [userName, setUserName] = useState("");
//   const [success, setSuccess] = useState(false);

//   const { userFolders, currentFolder, user } = useSelector(
//     (state) => ({
//       userFolders: state.FileFoldersReducer?.userFolders || [],
//       currentFolder: state.FileFoldersReducer?.currentFolder || "root",
//       user: state.auth.user,
//     }),
//     shallowEqual
//   );

//   const { currentFolderData } = useSelector((state) => ({
//     currentFolderData:
//       state.FileFoldersReducer?.userFolders.find(
//         (folder) => folder.id === currentFolder
//       ) === undefined
//         ? []
//         : [],
//   }));

//   useEffect(() => {
//     console.log("current folder data", currentFolderData);
//     console.log("current folder ", currentFolder);
//   }, [userFolders, currentFolder]);

//   const chekFolderArleadyPresent = (name) => {
//     try {
//       const folderPresent = userFolders
//         .filter((folder) => folder.parent === currentFolder)
//         .find((folder) => folder.name === name);

//       if (folderPresent) {
//         return true;
//       } else {
//         return false;
//       }
//     } catch (error) {
//       console.error("Error checking folder existence:", error.message);
//       return false;
//     }
//   };

//   const dispatch = useDispatch();

//   const handleSumbit = async (e) => {
//     e.preventDefault();

//     if (folderName) {
//       if (folderName.length > 3) {
//         if (!chekFolderArleadyPresent(folderName)) {
//           try {
//             if (!user.uid || !user) {
//               console.log("User not available");
//               return;
//             }

//             const data = {
//               CreatedAt: new Date(),
//               name: folderName,
//               userId: user.uid,
//               createdBy: user.email,
//               path:
//                 currentFolder === "root"
//                   ? []
//                   : [...(currentFolderData?.path || []), currentFolder],
//               parent: currentFolder,
//               lastAccessed: null,
//               updated: new Date(),
//             };

//             dispatch(createFolder(data));
//           } catch (error) {
//             console.log(error);
//           }
//         } else {
//           alert("Folder arleady present!");
//         }
//       } else {
//         alert("Folder name must be at 3+ characters!");
//       }
//     } else {
//       alert("Folder name cannot empty!");
//     }
//   };

//   return (
//     <div
//       className="col-md-12  position-fixed top-0 left-0 w-100 h-100"
//       style={{ background: "rgba(0, 0, 0, 0.4)", zIndex: 9999 }}
//     >
//       <div className="row align-items-center justify-content-center">
//         <div style={{ width: "400px" }}>
//           <div className="mt-5 bg-white  rounded p-4">
//             <div className="d-flex justify-content-between">
//               <h4>Create Folder</h4>
//               <button
//                 className="btn"
//                 onClick={() => setIsCreateFolderModalOpen(false)}
//               >
//                 <FontAwesomeIcon
//                   icon={faTimes}
//                   className="text-black"
//                   size="sm"
//                 />
//               </button>
//             </div>
//           </div>
//           <div className="d-flex flex-column align-items-center">
//             <form className="mt-3  w-100" onSubmit={handleSumbit}>
//               <div className="form-group">
//                 <input
//                   type="text"
//                   className="form-control"
//                   id="folderName"
//                   placeholder="Folder Name"
//                   value={folderName}
//                   onChange={(e) => setFolderName(e.target.value)}
//                 />
//               </div>
//               <button
//                 type="submit"
//                 className="btn btn-primary mt-5 form-control"
//               >
//                 Create Folder
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CreateFolder;

// /* // onSubmit={handleSubmit}
