import React, { useState, useEffect } from "react";
import {
    ref,
    uploadBytes,
    getDownloadURL,
    listAll,
    deleteObject,
} from "firebase/storage";
import { storage } from "./firebase";
import Header from "./Header";

const NewPost = () => {
    const [imageData, setImageData] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(0);

    const handleImageUpload = async (event) => {
        const file = event.target.files[0];
        setSelectedImage(file);
    };

    const handleImageSubmit = async () => {
        const storageRef = ref(storage, "/" + selectedImage.name);
        await uploadBytes(storageRef, selectedImage);
        await updateImageList();
    };

    const handleFileCreate = async (fileName) => {
        const fileRef = ref(storage, "/" + fileName);
        await uploadBytes(fileRef, new Blob());
        await updateImageList();
    };

    const handleFolderCreate = async (folderName) => {
        const folderRef = ref(storage, folderName + "/");
        await uploadBytes(folderRef, new Blob());
        await updateImageList();
    };

    const updateImageList = async () => {
        const updatedImageData = await listAllImages();
        setImageData(updatedImageData);
    };

    const handleImageDelete = async (image) => {
        const imageRef = ref(storage, image);
        await deleteObject(imageRef);
        await updateImageList();
    };

    useEffect(() => {
        updateImageList();
    }, []);

    const listAllImages = async () => {
        const res = await listAll(ref(storage, `/`));
        const imagePromises = res.items.map((item) => getDownloadURL(item));
        return Promise.all(imagePromises);
    };

    const splitUrl = (url) => {
        const a = url.split("/")[7];
        const b = a.split("?")[0];
        return b;
    };
    function handleCopy(text) {
        console.log(text);
        navigator.clipboard.writeText(text);
        console.log("The link was clicked");
    }
    return (
        <div>
            <Header />
            <div className="d-flex justify-content-between w-100 p-3">
                <div className="w-50">
                    <div className="d-flex gap-2">
                        <button
                            type="submit"
                            className="btn btn-success"
                            onClick={() => handleFileCreate("newFile.txt")}
                        >
                            Create File
                        </button>
                        <br></br>
                        <button
                            type="submit"
                            className="btn btn-success"
                            onClick={() => handleFolderCreate("newFolder")}
                        >
                            Create Folder
                        </button>
                        <br></br>
                    </div>
                    <input
                        type="file"
                        className="mt-4"
                        onChange={handleImageUpload}
                    />
                    {imageData ? (
                        <button
                            type="submit"
                            className="btn btn-primary"
                            onClick={handleImageSubmit}
                        >
                            Upload File
                        </button>
                    ) : (
                        <div></div>
                    )}
                    <br></br>
                </div>

                <div className="w-50 bg-light ">
                    {/* <button onClick={handleClick}>Increment</button> */}

                    {imageData.map((e) => (
                        <div className="bg-light mt-1 p-3" key={e}>
                            <h className="lopy_link_text" href={e}>{splitUrl(e)}</h>{" "}
                            <button
                                className="btn btn-info m-3"
                                onClick={() => handleCopy(e)}
                            >
                                Copy
                            </button>
                            <button
                                className="btn btn-primary me-3"
                                onClick={() => (window.location.href = e)}
                            >
                                {/* {splitUrl(e)} */}
                                Upload
                            </button>
                            <button
                                className="btn btn-danger"
                                onClick={() => handleImageDelete(e)}
                            >
                                Delete
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default NewPost;
