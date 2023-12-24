import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { db, storage } from "../firebase/firebase";
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
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

function KrPapka() {
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

      setFolderFiles((prevFiles) =>
        prevFiles.filter((file) => file.id !== fileId)
      );
    } catch (error) {
      console.error("Error deleting file:", error);
    }
  };
  const deleteChildFolder = async (childFolderId) => {
    try {
      const folderRef = doc(db, "folders", childFolderId);
      await deleteDoc(folderRef);

      setChildrenFolders((prevFolders) =>
        prevFolders.filter((folder) => folder.id !== childFolderId)
      );
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
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
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
            {
              id: "newlyGeneratedId",
              name: selectedFile.name,
              url: downloadURL,
            },
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
      const newFile = { name: fileName, url: fileUrl, folderId: folderId };
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
      {folderData ? (
        <div className="bg-danger">
          <div className="container-all">
            <div className="create-folder-box">
              <h3 className="text-center p-0">
                Folder Name: {folderData.name}
              </h3>
              <h2>Folder Path</h2>
              <div className="folder-arrov">
                <Link className="text-white" to="/dash">
                  Folder
                </Link>
                <span> > </span>
                <p>
                  {folderPath.map((folder, index) => (
                    <span key={index}>
                      <Link className="text-white" to={`/fldr/${folder.id}`}>
                        {folder.name}
                      </Link>
                      {index < folderPath.length - 1 && " < "}
                    </span>
                  ))}
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading folder data...</p>
      )}
      <div className="container-all">
        <center>
          <div>
            <div className="name-funtction">
              <h2 className="text-center text-white">Create Folder</h2>
              <h2 className="text-center text-white">Upload File</h2>
            </div>
            <input
              className="inputs"
              type="text"
              placeholder="Folder Name"
              value={newFolderName}
              onChange={(e) => setNewFolderName(e.target.value)}
            />
            <button className="btn btn-primary" onClick={handleCreateFolder}>
              Create Folder
            </button>
            <table
              className="table table-bordered table-1"
              style={{ width: "50%" }}
            >
              <thead>
                <tr>
                  <th>Name</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {childrenFolders.map((childFolder) => (
                  <tr key={childFolder.id}>
                    <td>
                      <Link className="links" to={`/fldr/${childFolder.id}`}>
                        {childFolder.name}
                      </Link>
                    </td>
                    <td>
                      <center>
                        <button
                          className="btn btn-danger"
                          onClick={() => deleteChildFolder(childFolder.id)}
                        >
                          Delete
                        </button>
                      </center>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <input
              className="inputs text-white"
              type="file"
              onChange={(e) => setSelectedFile(e.target.files[0])}
            />
            <button className="btn btn-primary" onClick={handleFileUpload}>
              Upload File
            </button>
            <ul
              style={{
                backgroundColor: "#2f4c65",
              }}
            >
              {folderFiles.map((file) => (
                <span key={file.id}>
                  <a
                    className="links text-white"
                    href={file.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {file.name}
                  </a>
                  <button
                    className="btn btn-danger m-5"
                    onClick={() => deleteFile(file.id)}
                  >
                    Delete
                  </button>
                </span>
              ))}
            </ul>
            {fileUploadProgress > 0 && (
              <p className="text-white">
                File upload progress: {fileUploadProgress.toFixed(2)}%
              </p>
            )}

            {uploadedFileUrl && (
              <p className="text-white">
                File uploaded successfully!{" "}
                <a href={uploadedFileUrl}>Download</a>
              </p>
            )}
          </div>
        </center>
      </div>
    </div>
  );
}

export default KrPapka;
