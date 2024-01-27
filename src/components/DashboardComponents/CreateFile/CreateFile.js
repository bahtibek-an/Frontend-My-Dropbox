import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useState } from "react";
import { createFile } from "../../../redux/actionCreators/fileFolderActionCreator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

const CreateFile = ({setIsCreateFileModalOpen}) => {
    const [ filename, setFilename ] = useState("");
    const [ extension, setExtension ] = useState("txt");
    const [ success, setSuccess] = useState(false);

    const { userFiles, user, currentFolder, currentFolderData } = useSelector((state) => ({
        userFiles: state.filefolders.userFiles,
        user: state.auth.user,
        currentFolder: state.filefolders.currentFolder,
        currentFolderData: state.filefolders.userFolders
        .find(folder => 
            folder.docId === state.filefolders.currentFolder
        ), 
    }), shallowEqual);

    const dispatch = useDispatch();

    useEffect(() => {
        if(success){
            setFilename("");
            setSuccess(false);
            setIsCreateFileModalOpen(false);
        }
    },[success])

    const setTypeFile = (name) => {
        let typeExists = name.lastIndexOf(".");
        if(typeExists===-1) {
            return;
        }

        let fileType=name.substring(typeExists + 1, name.length);
        if(fileType) setExtension(fileType);
        return fileType;
    }

    // if file exists then add file's name indexed number like name(0)
    const setFileName = (name) => {
        let typeExists = name.lastIndexOf("."),
            fileTitle,
            existFile,
            index=0,
            updatedName;

        if(typeExists===-1) {
            fileTitle = name;
            updatedName = `${fileTitle}.${extension}`;
        }
        else {
            fileTitle = name.substring(0, name.lastIndexOf("."));
            updatedName = name;
        }

        existFile = userFiles.filter((folder) => folder.data.parent === currentFolder)
        .find((file) => file.data.name === updatedName);
        console.log(existFile,updatedName,fileTitle,name,filename);
        while(existFile) {
            fileTitle = `${name}(${index++})`;
            updatedName = `${fileTitle}.${extension}`
            console.log(fileTitle,updatedName);
            existFile = userFiles.filter((folder) => folder.data.parent === currentFolder)
            .find((file) => file.data.name === updatedName);
        }
        return updatedName;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if(filename){
            if(filename.length > 3){
                let type = setTypeFile(filename);
                let updatedName = setFileName(filename);
                console.log(extension);
                const data = {
                    createdAt: new Date(),
                    createdBy: user.displayName,
                    lastAccessed: null,
                    name: updatedName,
                    parent: currentFolder,
                    path: currentFolder === "root" ? []: [...currentFolderData?.data.path, currentFolder],
                    updateAt: new Date(),
                    userId: user.uid,
                    extension: type,
                    data: "",
                    url: null,
                };
                dispatch(createFile(data, setSuccess));
            }else{
                alert("File name must be at least 3 characters!");
            }
        }else{
            alert("File name can't be empty! ");
        }
    }

    return (
        <div className="col-md-12 position-fixed top-0 left-0 w-100 h-100" style={{background: "rgba(0,0,0,0.4)", zIndex: 9999 }}>
            <div className="row align-items-center justify-content-center">
                <div className="col-md-4 mt-5 bg-white rounded p-4">
                    <div className="d-flex justify-content-between">
                        <h4>Create File</h4>
                        <button className="btn" onClick={() => setIsCreateFileModalOpen(false)}>
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
                                id="filename"
                                placeholder="File Name e,g. file.txt, index.php, index.ts, index.js"
                                value={filename}
                                onChange={(e) => setFilename(e.target.value)} />
                            </div>
                            <button type='submit' className="btn btn-primary mt-5 form-control">
                                Create File
                            </button>
                        </form>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default CreateFile;