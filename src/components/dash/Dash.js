import React, { useEffect, useState } from "react";
import { auth, db, storage } from "../firebase/firebase";
import { Link, useNavigate } from "react-router-dom";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {
  collection,
  query,
  where,
  onSnapshot,
  deleteDoc,
  addDoc,
  doc,
} from "firebase/firestore";
import FoyFolderList from "../create/folder";

function Dashboard() {
  const [user, setUser] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileUploadProgress, setFileUploadProgress] = useState(0);
  const [uploadedFileUrl, setUploadedFileUrl] = useState(null);
  const [userFiles, setUserFiles] = useState([]);
  const [folderName, setFolderName] = useState("");
  const [parentFolderId, setParentFolderId] = useState("");

  const navigate = useNavigate();
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
  const handleLogout = async () => {
    try {
      await auth.signOut();
      setUser(null);
      setUserFiles([]);
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };
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
  const addFileMetadataToFirestore = async (fileName, fileUrl) => {
    try {
      const filesRef = collection(db, "files");
      const newFile = { name: fileName, url: fileUrl, userId: user.uid };
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

  const handleClose = () => {
    setFileUploadProgress(0);
  };

  return (
    <div className="mt-5">
      {user ? (
        <div>
          <header className="bg-primary">
            <div className="container-all">
              <nav className="nav-link">
                <div className="nav-link-left">
                  <h3 className="text-dark col-6">Hello, {user.email}</h3>
                </div>
                <div className="nav-link-right">
                  <button className="edit">
                    <Link className="col-5" to="/edit-pro">
                      Manage Profile
                    </Link>
                  </button>
                  <button onClick={handleLogout}>Quit</button>
                </div>
              </nav>
            </div>
          </header>
          <div className="row">
            <div className="container-all">
              <div className="name-funtction">
                <h2 className="text-center text-black">Create Folder</h2>
                <h2 className="text-center text-black">Upload File</h2>
              </div>
              <div className="folder-or-uploading row">
                <div className="col-md-6">
                  <div className="create-folder">
                    <input
                      className="inputs"
                      type="text"
                      placeholder="Folder Name"
                      value={folderName}
                      onChange={(e) => setFolderName(e.target.value)}
                    />
                    <button
                      className="btn btn-primary m-3"
                      onClick={handleYtPapka}
                    >
                      Create Folder
                    </button>
                    <FoyFolderList />
                  </div>
                </div>
                <div className="col-md-6">
                  <input
                    style={{ paddingBottom: "5px" }}
                    className="inputs text-grey "
                    type="file"
                    onChange={(e) => setSelectedFile(e.target.files[0])}
                  />
                  <button
                    className="btn btn-primary m-3 p-1.7 pr-2.7 pl-2.7 border-0"
                    onClick={handleFileUpload}
                  >
                    Upload File
                  </button>
                  {fileUploadProgress > 0 && (
                    <div className="modal-1">
                      <p className="text-dark text-center">
                        File upload progress: {fileUploadProgress.toFixed(2)}%
                      </p>
                      <center>
                        {" "}
                        <button
                          onClick={handleClose}
                          className="badge bg-secondary  close-button p-1 btn btn-warning"
                        >
                          Close
                        </button>
                      </center>
                    </div>
                  )}

                  <table className="table table-bordered table-1 m-0">
                    <thead>
                      <tr>
                        <th scope="col">File Name</th>
                        <th scope="col">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {userFiles.map((file) => (
                        <tr key={file.id}>
                          <td>
                            <a
                              className="links"
                              href={file.url}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {file.name}
                            </a>
                          </td>

                          <td>
                            <button
                              className="btn btn-danger"
                              onClick={() => handleDeleteFile(file.id)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="container mt-40">
          <div className="bg-secondary border border-primary p-3">
            <h2 className="text-center text-dark m-5">
              Please log in to access the dashboard.
            </h2>
            <div className="row d-flex flex-column text-center">
              <p className="text  col-sm-6 w-100 mb-0">
                Are you don't have an account? <br />
                <Link className="link" to="/register">
                  Register{" "}
                </Link>
              </p>
              <p className="text col-sm-5 w-100 mb-0">
                Already have an account? <br />
                <Link className="link" to="/login">
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
