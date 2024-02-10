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
      {folderData ? (
        <div className="panel">
          <h3>Folder Name: {folderData.name}</h3>
        </div>
      ) : (
        <p></p>
      )}
      <div className="oop">
        <div className="foldersdiv">
          <h2 className="text">Create New Folder</h2>
          <input
            className="inputs"
            type="text"
            placeholder="Folder Name"
            value={newFolderName}
            onChange={(e) => setNewFolderName(e.target.value)}
          />
          <button className="button" onClick={handleCreateFolder}>
            Create Folder
          </button>
          <ol className="table">
            {childrenFolders.map((childFolder) => (
              <li key={childFolder.id} className="list" disabled>
                <div className="nav bg-light">
                  <Link className="links" to={`/fldr/${childFolder.id}`}>
                    {childFolder.name}
                  </Link>
                  <button
                    className="buttons"
                    onClick={() => deleteChildFolder(childFolder.id)}
                  >
                    {" "}
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ol>
        </div>
        <div className="foldersdiv">
          <h2 className="text">Upload File</h2>
          <input
            className="inputs"
            type="file"
            onChange={(e) => setSelectedFile(e.target.files[0])}
          />
          <button className="button" onClick={handleFileUpload}>
            Upload File
          </button>
          <ol className="table">
            {folderFiles.map((file) => (
              <li key={file.id} className="list">
                <div className="nav bg-light">
                  <a
                    className="links"
                    href={file.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {file.name}
                  </a>
                  <div className="nav bg-light">
                    <button className="download">Download</button>
                    <button className="copy">Copy</button>
                    <button
                      className="buttons"
                      onClick={() => deleteFile(file.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}

export default KrPapka;
