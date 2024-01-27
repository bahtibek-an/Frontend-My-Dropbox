import { useNavigate, useParams } from "react-router-dom";
import { shallowEqual, useSelector } from "react-redux";
import Header from "./Header";
import CodeEditor from "./CodeEditor";
import { useEffect, useState } from "react";
import firebase from '../../../config/firebase'

const FileComponent = () => {
    const { fileId } = useParams();
    const [fileData, setFileData] = useState("");
    const [prevFileData, setPrevFileData] = useState("");
    const navigate = useNavigate();

    const { currentFile } = useSelector(
        (state) => ({
            currentFile: state.filefolders.userFiles.find(
                (file) => file.docId === fileId
            ),
        }),
        shallowEqual
    );

    useEffect(() => {
        if(currentFile){
            setFileData(currentFile.data.data);
            setPrevFileData(currentFile.data.data);
        }
    }, [currentFile, currentFile?.data.data]);

    const downloadFile = async () => {
        firebase.storage().ref(`files/${currentFile.data.userId}/${currentFile.data.name}`).getDownloadURL()
        .then((url) => {
            // download image directly via url
            var xhr = new XMLHttpRequest();
            xhr.responseType = 'blob';
            xhr.onload = (event) => {
                var blob = xhr.response;
                //create a file from the returned blob

                var file = new File([blob], "image.png", { type: blob.type });

                var file = new File([blob], currentFile.data.name, { type: blob.type });

                console.log(file);
                //set the download attribute of the a tag to the name stored in the file
                //generate a temp url to host the image for download
                const element = document.createElement("a");
                element.setAttribute("target", "_blank");
                element.href = URL.createObjectURL(file);
                element.download = file.name;
                document.body.appendChild(element);
                element.click();
                document.body.removeChild(element);
            };
            xhr.open('GET', url,true);
            xhr.send();
        });
    }

    return (
        <div>
            {
                fileData  ? (
                    <>
                        <Header fileName={currentFile?.data.name} />
                        <CodeEditor fileName={currentFile?.data.name} />
                    </>
                ) : (
                    <div className="position-fixed left-0 top-0 w-100 h-100 bg-black text-white">
                        <div className="d-flex py-4 mt-4 px-5 justify-content-between align-items-center">
                            <p title={currentFile?.data.name} className="my-0">
                                {currentFile?.data.name.length > 40
                                    ? currentFile?.data.name.slice(0, 40) + "... ." + 
                                    currentFile?.data.extension : currentFile?.data.name }
                            </p>
                            <div className="d-flex align-items-center text-white me-5">
                                    <button className="btn btn-sm btn-outline-light mr-2"
                                        onClick={() => navigate(-1)}>
                                            {/* <i className="fas fa-arrow-left"> */}
                                                Go Back
                                            {/* </i> */}
                                    </button>
                                    <button className="btn btn-sm btn-primary" onClick={() => downloadFile()}>Download</button> 
                            </div>
                        </div>
                        <div className="w-100 mt-4" style={{ height: "85%"}}>
                                 {currentFile?.data.extension.includes("png") ||
                                    currentFile?.data.extension.includes("jpg") ||
                                    currentFile?.data.extension.includes("jpeg") ||
                                    currentFile?.data.extension.includes("gif") ? (
                                        <img src={currentFile?.data.url}
                                            alt={currentFile?.data.name}
                                            className="w-100 h-100 img-fluid" />
                                    ) : (
                                        <div className="w-100 h-100 d-flex justify-content-center align-items-center">
                                            <p className="text-center">
                                                File Type not supperted. Please download the file to view it.
                                            </p>
                                        </div>
                                    )
                                }
                        </div>
                    </div>
                )
            }
            
        </div>
    )
};

export default FileComponent;