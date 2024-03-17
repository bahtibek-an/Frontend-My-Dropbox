import React, { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  addDoc,
  doc,
  deleteDoc,
  getFirestore,
} from "firebase/firestore";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  getStorage,
} from "firebase/storage";
import { db } from "../firebase/firebase";

import file from "../../public/file.svg";
import file2 from "../../public/file2.svg";
import folder from "../../public/folder.svg";
import folder2 from "../../public/folder2.svg";
import close from "../../public/close.svg";
import { Link } from "react-router-dom";

interface File {
  name: string;
  url: string;
  id: string;
}

interface Folder {
  name: string;
  id: string;
}

const Home: React.FC = () => {
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [selectedFileName, setSelectedFileName] = useState<string>("");

  const [, setUploadedFileName] = useState<string>("");
  const [files, setFiles] = useState<File[]>([]);
  const [folders, setFolders] = useState<Folder[]>([]);
  const [folderName, setFolderName] = useState<string>("");
  const [isFolderModalOpen, setIsFolderModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const filesRef = collection(db, "files");
        const foldersRef = collection(db, "folders");
        const filesSnapshot = await getDocs(filesRef);
        const foldersSnapshot = await getDocs(foldersRef);
        const fileList: File[] = [];
        const folderList: Folder[] = [];
        filesSnapshot.forEach((doc) => {
          fileList.push({ id: doc.id, ...doc.data() } as File);
        });
        foldersSnapshot.forEach((doc) => {
          folderList.push({ id: doc.id, ...doc.data() } as Folder);
        });
        setFiles(fileList);
        setFolders(folderList);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [files, folders]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const fileName = e.target.files[0].name;
      setSelectedFileName(fileName);
      setSelectedFiles(e.target.files);
    }
  };

  const handleFileUpload = async () => {
    if (selectedFiles) {
      const storage = getStorage();
      const firestore = getFirestore();
      for (let i = 0; i < selectedFiles.length; i++) {
        const file = selectedFiles[i];
        const storageRef = ref(storage, `files/${file.name}`);
        try {
          const uploadTask = uploadBytesResumable(storageRef, file);
          const snapshot = await uploadTask;
          const downloadURL = await getDownloadURL(snapshot.ref);

          const docRef = await addDoc(collection(firestore, "files"), {
            name: file.name,
            url: downloadURL,
          });

          setUploadedFileName(file.name);
          setFiles((prevFiles) => [
            ...prevFiles,
            { id: docRef.id, name: file.name, url: downloadURL },
          ]);
        } catch (error) {
          console.error("Error uploading file:", error);
        }
      }
      setSelectedFiles(null);
      setSelectedFileName("");
    }
  };

  const handleCopy = (url: string) => {
    navigator.clipboard.writeText(url);
    alert("Link copied to clipboard!");
  };

  const handleDeleteFile = async (url: string, id: string) => {
    const confirmed = window.confirm("Are you sure you want to delete it?");
    if (confirmed) {
      try {
        setFiles((prevFiles) => prevFiles.filter((file) => file.url !== url));
        await deleteDoc(doc(db, "files", id));
      } catch (error) {
        console.error("Error deleting file:", error);
      }
    }
  };

  const handleDeleteFolder = async (id: string) => {
    try {
      await deleteDoc(doc(db, "folders", id));
      setFolders((prevFolders) =>
        prevFolders.filter((folder) => folder.id !== id)
      );
    } catch (error) {
      console.error("Error deleting folder:", error);
    }
  };

  const createFolder = async () => {
    if (folderName.trim() === "") {
      return;
    }

    try {
      const foldersRef = collection(db, "folders");
      await addDoc(foldersRef, { name: folderName });
      setIsFolderModalOpen(false);
      setFolderName("");
    } catch (error) {
      console.error("Error creating folder:", error);
    }
  };

  const handleFolderNameChange = (e: { target: { value: string } }) => {
    setFolderName(e.target.value);
  };

  const openFile = (url: string) => {
    window.open(url, "_blank");
  };

  const openFolderModal = () => {
    setFolderName("");
    setIsFolderModalOpen(true);
  };

  return (
    <header>
      <div className="container-home flex justify-between">
        <div>
          <h3 className="text-xl font-bold text-center py-5">Upload File</h3>
          <label className="custum-file-upload" htmlFor="file">
            <div className="icon">
              <img src={file} alt="file" />
            </div>
            <input type="file" id="file" onChange={handleFileChange} />
            {selectedFileName && (
              <h3 className="font-bold flex items-center pr-2">
                {selectedFileName}
              </h3>
            )}
          </label>
          <div className="flex justify-between items-center">
            <button
              onClick={handleFileUpload}
              className="rounded-full bg-blue-500 text-white px-3 py-2 m-3 hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            >
              Upload
            </button>
          </div>
        </div>
        <div>
          <h3 className="text-xl font-bold text-center py-5">Create Folder</h3>
          <button onClick={openFolderModal} className="custum-file-upload">
            <div className="icon">
              <img src={folder} alt="folder" />
            </div>
          </button>
        </div>

        {isFolderModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
            <div className="bg-white relative p-8 rounded-lg">
              <button
                className="absolute top-1 right-1 text-red-500"
                onClick={() => setIsFolderModalOpen(false)}
              >
                <img src={close} alt="close" />
              </button>
              <input
                type="text"
                placeholder="Enter Folder Name"
                value={folderName}
                onChange={handleFolderNameChange}
                className="border border-gray-300 rounded px-3 py-2 mb-3"
              />
              <button
                onClick={createFolder}
                className="rounded-full bg-blue-500 text-white px-3 py-2 m-3 hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
              >
                Create Folder
              </button>
            </div>
          </div>
        )}
      </div>
      <hr className="mt-8 border-2" />

      <div className="flex justify-center file-list mt-5">
        <table className="border-collapse ml-5 bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-200 text-gray-700">
            <tr className="border-b-2 border-gray-400">
              <th className="px-4 py-2  text-left">File Name</th>
            </tr>
          </thead>
          <tbody>
            {files.map((file, index) => (
              <tr
                key={index}
                className="flex justify-between items-center border-b border-gray-300"
              >
                <td className="flex items-center  px-4 py-2">
                  <img className="mr-2" src={file2} alt="file2" />
                  <button
                    onClick={() => openFile(file.url)}
                    className="text-blue-500 hover:underline cursor-pointer"
                  >
                    <p className="font-bold text-sm">{file.name}</p>
                  </button>
                </td>
                <td className="px-4 py-2">
                  <button
                    className="px-3 py-1 bg-teal-400 text-white rounded hover:bg-teal-500"
                    onClick={() => handleCopy(file.url)}
                  >
                    Copy
                  </button>
                  <button
                    className="px-3 py-1 ml-3 bg-red-600 text-white rounded hover:bg-red-700"
                    onClick={() => handleDeleteFile(file.url, file.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <table className="border-collapse ml-5 bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-200 text-gray-700">
            <tr className="border-b-2 border-gray-400">
              <th className="px-4 py-2 text-left">Folder Name</th>
            </tr>
          </thead>
          <tbody>
            {folders.map((folder, index) => (
              <tr
                key={index}
                className="flex items-center justify-between border-b border-gray-300"
              >
                <td className="flex items-center px-4 py-2">
                  <img className="mr-2" src={folder2} alt="folder2" />
                  <Link to={`/folder/${folder.id}`}>
                    <h3 className="font-bold text-yellow-500">{folder.name}</h3>
                  </Link>
                </td>
                <td className=" flex items-center px-4 py-2">
                  <button
                    className="px-3 py-1 ml-3 bg-red-600 text-white rounded hover:bg-red-700"
                    onClick={() => handleDeleteFolder(folder.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </header>
  );
};

export default Home;
