import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { db, storage } from "./firebase";
import {
  doc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
  addDoc,
  deleteDoc,
} from "firebase/firestore";
import './file.css'
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

function addFile() {
  const { folderId } = useParams();
  const [folderData, setFolderData] = useState(null);
  const [childrenFolders, setChildrenFolders] = useState([]);
  const [newFolderName, setNewFolderName] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [folderPath, setFolderPath] = useState([]);
  const [fileUploadProgress, setFileUploadProgress] = useState(0);
  const [uploadedFileUrl, setUploadedFileUrl] = useState("");
  const [folderFiles, setFolderFiles] = useState([]);

  const getFolderFiles = async () => {
    const filesRef = collection(db, "files");
    const q = query(filesRef, where("folderId", "==", folderId));

    try {
      const querySnapshot = await getDocs(q);
      const filesData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setFolderFiles(filesData);
    } catch (error) {
      console.error("Error fetching folder files:", error);
    }
  };
  const deleteFile = async (fileId) => {
    try {
      const fileRef = doc(db, "files", fileId);
      await deleteDoc(fileRef);

      setFolderFiles((prevFiles) => prevFiles.filter((file) => file.id !== fileId));
    } catch (error) {
      console.error("Error deleting file:", error);
    }
  };
  const deleteChildFolder = async (childFolderId) => {
    try {
      const folderRef = doc(db, "folders", childFolderId);
      await deleteDoc(folderRef);

      setChildrenFolders((prevFolders) => prevFolders.filter((folder) => folder.id !== childFolderId));
    } catch (error) {
      console.error("Error deleting child folder:", error);
    }
  };
  const getChildrenFolders = async () => {
    const foldersRef = collection(db, "folders");
    const q = query(foldersRef, where("parentId", "==", folderId));

    try {
      const querySnapshot = await getDocs(q);
      const childrenFoldersData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setChildrenFolders(childrenFoldersData);
    } catch (error) {
      console.error("Error fetching children folders:", error);
    }
  };

  const getFolderPath = async (folderId, path = []) => {
    try {
      const folderDocRef = doc(db, "folders", folderId);
      const folderDocSnapshot = await getDoc(folderDocRef);

      if (folderDocSnapshot.exists()) {
        const folder = folderDocSnapshot.data();
        folder.id = folderId;
        path.unshift(folder);
        if (folder.parentId) {
          return await getFolderPath(folder.parentId, path);
        } else {
          return path.reverse();
        }
      } else {
        console.log("Folder not found.");
        return path;
      }
    } catch (error) {
      console.error("Error fetching folder data:", error);
      return path;
    }
  };

  const handleFileUpload = async () => {
    if (!selectedFile) {
      return;
    }
  
    const storageRef = ref(storage, `files/${selectedFile.name}`);
    const uploadTask = uploadBytesResumable(storageRef, selectedFile);
  
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFileUploadProgress(progress);
      },
      (error) => {
        console.error("Error uploading file:", error);
      },
      async () => {
        try {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          setUploadedFileUrl(downloadURL);
          addFileMetadataToFirestore(selectedFile.name, downloadURL);
  
          setFolderFiles((prevFiles) => [
            ...prevFiles,
            { id: 'newlyGeneratedId', name: selectedFile.name, url: downloadURL },
          ]);
        } catch (error) {
          console.error("Error getting download URL:", error);
        }
      }
    );
  };
  

  const addFileMetadataToFirestore = async (fileName, fileUrl) => {
    try {
      const filesRef = collection(db, "files");
      const newFile = {
        name: fileName,
        url: fileUrl,
        folderId: folderId,
      };

      await addDoc(filesRef, newFile);
    } catch (error) {
      console.error("Error adding file metadata to Firestore:", error);
    }
  };

  useEffect(() => {
    const getFolderData = async () => {
      try {
        const folderDocRef = doc(db, "folders", folderId);
        const folderDocSnapshot = await getDoc(folderDocRef);

        if (folderDocSnapshot.exists()) {
          setFolderData(folderDocSnapshot.data());
          const path = await getFolderPath(folderId);
          setFolderPath(path);
        } else {
          console.log("Folder not found.");
        }
      } catch (error) {
        console.error("Error fetching folder data:", error);
      }
    };

    getFolderData();
    getChildrenFolders();
    getFolderFiles(); 
    }, [folderId]);

  const handleCreateFolder = async () => {
    if (newFolderName.trim() === "") {
      return;
    }

    try {
      const foldersRef = collection(db, "folders");
      const newFolder = {
        name: newFolderName,
        parentId: folderId,
        userId: folderData.userId,
      };

      await addDoc(foldersRef, newFolder);

      setNewFolderName("");
      getChildrenFolders();
    } catch (error) {
      console.error("Error creating folder:", error);
    }
  };

  return (
    <div>
      <h2 className="text">Folder Detail</h2>
      {folderData ? (
        <div>
          <p>Folder Name: {folderData.name}</p>
        </div>
      ) : (
        <p>Loading folder data...</p>
      )}
      <div className="display p-3 m-6">
        <h2 className="text link">Folder Path</h2>
        <Link to='/dashboard'> Folders</Link>
        <p className="text"><span> / </span>
          {folderPath.map((folder, index) => (
            <span key={index}>
              <Link to={`/fldr/${folder.id}`}>{folder.name}</Link>
              {index < folderPath.length - 1 && " / "}
            </span>
          ))}
        </p>
      </div>
      <div className="row">
      <div className="col-12 text-center file-4 mx-auto mt-3">
        <h2 className="text">Upload File</h2>
        <input
          className="inputs"
          type="file"
          onChange={(e) => setSelectedFile(e.target.files[0])}
        />
        <button className="button" onClick={handleFileUpload}>Upload File</button>
        <ul>
        {folderFiles.map((file) => (
          <li key={file.id} style={{margin:10}} className="file-s">
            <a className="links" href={file.url} target="_blank" rel="noopener noreferrer">
              {file.name}
            </a>
            <button className="buttons" onClick={() => deleteFile(file.id)}>Delete</button>
          </li>
        ))}
      </ul>

        {uploadedFileUrl && (
          <p>
            File uploaded successfully! <a href={uploadedFileUrl}>Download</a>
          </p>
        )}
        </div>
      </div>
    </div>
  );
}

export default addFile;
