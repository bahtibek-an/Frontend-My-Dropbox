import './dashboard.css'
import logo from "../../public/favicon.ico";
import { auth, db, storage } from "./firebase";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import {
  collection,
  query,
  where,
  getDocs,
  onSnapshot,
  deleteDoc,
  addDoc,
  doc,
} from "firebase/firestore";
import FoyFolderList from "./folder";

function Dashboard() {
  const [user, setUser] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadedFileUrl, setUploadedFileUrl] = useState(null);
  const [userFiles, setUserFiles] = useState([]);
  const [folderName, setFolderName] = useState("");
  const [parentFolderId, setParentFolderId] = useState("");
  const navigate = useNavigate();

  const handleFileUpload = async () => {
    if (!selectedFile) {
      return;
    }

    const storageRef = ref(
      storage,
      `userFiles/${user.uid}/${selectedFile.name}`
    );
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
          setSelectedFile(null);

          await addFileMetadataToFirestore(selectedFile.name, downloadURL);

          fetchUserFiles(user.uid);
        } catch (error) {
          console.error("Error getting download URL:", error);
        }
      }
    );
  };
  const handleYtPapka = async () => {
    const user = auth.currentUser;

    if (!user) {
      console.log("No user is logged in.");
      return;
    }

    try {
      const foldersRef = collection(db, "folders");

      const newFolder = {
        name: folderName,
        parentId: parentFolderId || null,
        userId: user.uid,
      };

      await addDoc(foldersRef, newFolder);

      console.log("Folder created successfully:", newFolder);
      setFolderName("");
      setParentFolderId("");
    } catch (error) {
      console.error("Error creating folder:", error);
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
        fetchUserFiles(authUser.uid);
      } else {
        setUser(null);
        setUserFiles([]);
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchUserFiles = async (userId) => {
    const filesRef = collection(db, "files");
    const q = query(filesRef, where("userId", "==", userId));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const filesData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUserFiles(filesData);
    });

    return unsubscribe;
  };

  const addFileMetadataToFirestore = async (fileName, fileUrl) => {
    try {
      const filesRef = collection(db, "files");
      const newFile = {
        name: fileName,
        url: fileUrl,
        userId: user.uid,
      };

      await addDoc(filesRef, newFile);
    } catch (error) {
      console.error("Error adding file metadata to Firestore:", error);
    }
  };

  const handleDeleteFile = async (fileId) => {
    try {
      const fileDocRef = doc(db, "files", fileId);
      await deleteDoc(fileDocRef);
      fetchUserFiles(user.uid);
    } catch (error) {
      console.error("Error deleting file:", error);
    }
  };

  return (
    <div>
      {user ? (
        <div className="hm-page">
          <div className='nav'>
            <h2>Hello, {user.email}</h2>
            <Link className='link' to="/edit-profile">Edit Account</Link>
          </div>
          <div className="empty">

          </div>
          <div className="re">
            <div className="col-12 text-center mx-auto mt-3 card-folder">
              <h2 className="text">Create Folder</h2>
              <input
                className="inputs"
                type="text"
                placeholder="Folder Name"
                value={folderName}
                onChange={(e) => setFolderName(e.target.value)}
              />
              <button className="button-2" onClick={handleYtPapka}>Create Folder</button>
              <FoyFolderList /> 
            </div>
            
            <div className="col-12 text-center mx-auto card-folder">
              <h2 className="text">Upload File</h2>
              <input
              className="inputs"
                type="file"
                onChange={(e) => setSelectedFile(e.target.files[0])}
              />
              <button className="button-2" onClick={handleFileUpload}>Upload File</button>
              <ul>
                {userFiles.map((file) => (
                  <li key={file.id}>
                    <a className="links" href={file.url} target="_blank" rel="noopener noreferrer">
                      {file.name}
                    </a>
                    <button className="buttons" onClick={() => handleDeleteFile(file.id)}>
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ) : (
        <div className='cards'>
          <div className='p-3 pre'>
            <img src={logo} width={400} alt="" />
            <p className='text-2'>
              Don't have an account? <Link className='link' to="/register">Register</Link>
            </p>
            <p className='text-2'>
              Already have an account? <Link className='link' to="/login">Login</Link>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
