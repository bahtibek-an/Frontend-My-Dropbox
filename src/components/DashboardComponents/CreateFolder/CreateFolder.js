import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react";
import { createFolder } from "../../../redux/actionCreators/fileFolderActionCreator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

const CreateFolder = ({setIsCreateFolderModalOpen}) => {
    const [ foldername, setFoldername ] = useState("");

    const { userFolders, user, currentFolder, currentFolderData } = useSelector((state) => ({
        userFolders: state.filefolders.userFolders,
        user: state.auth.user,
        currentFolder: state.filefolders.currentFolder,
        currentFolderData: state.filefolders.userFolders
        .find(folder => 
            folder.docId === state.filefolders.currentFolder
        ), 
    }), shallowEqual);

    const dispatch = useDispatch();

    const setUpdatedName = (name) => {
        let folderPresent = userFolders.filter((folder) => folder.data.parent === currentFolder)
            .find((folder) => folder.data.name === name),
            updatedName=name,
            index=0;
        
        while(folderPresent) {
            updatedName = `${name}(${index++})`;
            console.log(name);
            folderPresent = userFolders.filter((folder) => folder.data.parent === currentFolder)
            .find((folder) => folder.data.name === updatedName);
        }
        return updatedName;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if(foldername){
            if(foldername.length > 3){
                let updatedName = setUpdatedName(foldername);
                const data = {
                    createdAt: new Date(),
                    createdBy: user.displayName,
                    lastAccessed: null,
                    name: updatedName,
                    parent: currentFolder,
                    path: currentFolder === "root" ? []: [...currentFolderData?.data.path, currentFolder],
                    updateAt: new Date(),
                    userId: user.uid,
                };
                dispatch(createFolder(data));
            }else{
                alert("Folder name must be at least 3 characters!");
            }
        }else{
            alert("Folder name can't be empty! ");
        }
    }

    return (
        <div className="col-md-12 position-fixed top-0 left-0 w-100 h-100" style={{background: "rgba(0,0,0,0.4)", zIndex: 9999 }}>
            <div className="row align-items-center justify-content-center">
                <div className="col-md-4 mt-5 bg-white rounded p-4">
                    <div className="d-flex justify-content-between">
                        <h4>Create Folder</h4>
                        <button className="btn" onClick={() => setIsCreateFolderModalOpen(false)}>
                            <FontAwesomeIcon
                                icon={faTimes}
                                className="text-block"
                                size="sm" />
                        </button>
                    </div>
                    <hr />
                    <div className="d-flex flex-column align-items-center">
                        <form className="mt-3 w-100" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <input type="text"
                                className="form-control"
                                id="folderName"
                                placeholder="Folder Name"
                                value={foldername}
                                onChange={(e) => setFoldername(e.target.value)} />
                            </div>
                            <button type='submit' className="btn btn-primary mt-5 form-control">
                                Create Folder
                            </button>
                        </form>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default CreateFolder;