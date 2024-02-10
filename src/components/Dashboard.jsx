import React, { useEffect, useState } from "react";
import { auth, db, storage } from "./firebase";
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
import FoyFolderList from "./FoyFolderList";

function Dashboard() {
  const [user, setUser] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileUploadProgress, setFileUploadProgress] = useState(0);
  const [uploadedFileUrl, setUploadedFileUrl] = useState(null);
  const [userFiles, setUserFiles] = useState([]);
  const [folderName, setFolderName] = useState("");
  const [parentFolderId, setParentFolderId] = useState("");
  const navigate = useNavigate();

  const copyLink = (url) => {
    navigator.clipboard.writeText(url).then(() => {
      alert("Link copied!");
    });
    // location.href = url
  };

  const downloadFile = (url, filename) => {
    // fetch(url)
    //   .then((response) => response.blob())
    //   .then((blob) => {
    //     const link = document.createElement("a");
    //     link.href = window.URL.createObjectURL(blob);
    //     link.download = filename;
    //     document.body.appendChild(link);
    //     link.click();
    //     document.body.removeChild(link);
    //     alert("File downloaded!");
    //   })
    //   .catch((error) => console.error("Download error:", error));
    window.open(url);
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
        <>
          <div className="panel">
            <div className="nav bg-light">
              <h3>Welcome, {user.email}</h3>
              <div className="nav bg-light">
                <button className="button" onClick={handleLogout}>
                  Logout
                </button>
                <button className="button">
                  <Link className="link" to="/edit-profile">
                    Edit Account
                  </Link>
                </button>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="foldersdiv">
              <h2 className="text">Create Folder</h2>
              <input
                className="inputs"
                type="text"
                placeholder="Folder Name"
                minLength={2}
                value={folderName}
                onChange={(e) => setFolderName(e.target.value)}
              />
              <button className="button" onClick={handleYtPapka}>
                Create Folder
              </button>
              <FoyFolderList />
            </div>

            <div className="foldersdiv">
              <h2 className="text">Upload File</h2>
              <label for="filedow" className="inputen">
                File img
              </label>
              <input
                className="inputss"
                type="file"
                id="filedow"
                onChange={(e) => setSelectedFile(e.target.files[0])}
              />
              <button className="button" onClick={handleFileUpload}>
                Upload File
              </button>
              <ol className="table">
                {userFiles.map((file) => (
                  <li key={file.id} className="list">
                    <div className="nav bg-light">
                      <a
                        className="links"
                        href={file.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        download={MediaKeyMessageEvent.jpg}
                      >
                        {file.name}
                      </a>
                      <div className="nav bg-light">
                        <button
                          className="download"
                          onClick={() => downloadFile(file.url)}
                        >
                          Download
                        </button>
                        <button
                          className="copy"
                          onClick={() => copyLink(file.url)}
                        >
                          Copy
                        </button>
                        <button
                          className="buttons"
                          onClick={() => handleDeleteFile(file.id)}
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
        </>
      ) : (
        <div className="cards_3">
          <div className="bg-dark p-3">
            <h2 className="text">Please log in to access the dashboard.</h2>
            <p className="ggc">
              Don't have an account?{" "}
              <Link className="link" to="/register">
                Register
              </Link>
            </p>
            <p className="gg">
              Already have an account?{" "}
              <Link className="link" to="/login">
                Login
              </Link>
            </p>
          </div>
        </div>
      )}
      {fileUploadProgress > 0 && (
        <p className="progresstext">
          File upload progress: {fileUploadProgress.toFixed(2)}%
        </p>
      )}
    </div>
  );
}

export default Dashboard;
