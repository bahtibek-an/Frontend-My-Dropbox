import React, { Fragment, useEffect, useState, ChangeEvent } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db, storage } from "../firebase/firebase";
import file from "../../public/file.svg";
import file2 from "../../public/file2.svg";
import folder2 from "../../public/folder2.svg";
import {
  ref,
  uploadBytes,
  listAll,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

const FolderPage: React.FC = () => {
  const { folderId } = useParams<{ folderId: string }>(); // Change here

  const [folderName, setFolderName] = useState<string>("");
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [uploadedFiles, setUploadedFiles] = useState<
    { name: string; url: string }[]
  >([]);

  useEffect(() => {
    const fetchFolderName = async () => {
      try {
        if (folderId) {
          const folderDoc = await getDoc(doc(db, "folders", folderId));
          if (folderDoc.exists()) {
            const folderData = folderDoc.data();
            if (folderData) {
              setFolderName(folderData.name);
            }
          } else {
            console.log("Folder not found");
          }
        }
      } catch (error) {
        console.error("Error fetching folder name:", error);
      }
    };

    fetchFolderName();
  }, [folderId]);

  useEffect(() => {
    const fetchUploadedFiles = async () => {
      const storageRef = ref(storage, `${folderId}/uploads`);
      try {
        const filesList = await listAll(storageRef);
        const promises = filesList.items.map(async (item) => {
          const url = await getDownloadURL(item);
          return { name: item.name, url };
        });
        const files = await Promise.all(promises);
        setUploadedFiles(files);
      } catch (error) {
        console.error("Error fetching uploaded files:", error);
      }
    };

    fetchUploadedFiles();
  }, [folderId]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFiles(e.target.files);
    }
  };

  const handleFileUpload = async () => {
    if (selectedFiles) {
      const storageRef = ref(storage, `${folderId}/uploads`);

      for (let i = 0; i < selectedFiles.length; i++) {
        const file = selectedFiles[i];
        const fileRef = ref(storageRef, file.name);

        try {
          await uploadBytes(fileRef, file);
          console.log("File uploaded successfully");
        } catch (error) {
          console.error("Error uploading file:", error);
        }
      }

      const filesList = await listAll(storageRef);
      const promises = filesList.items.map(async (item) => {
        const url = await getDownloadURL(item);
        return { name: item.name, url };
      });
      const files = await Promise.all(promises);
      setUploadedFiles(files);

      setSelectedFiles(null);
    }
  };

  const handleFileDelete = async (fileName: string) => {
    const storageRef = ref(storage, `${folderId}/uploads/${fileName}`);
    try {
      await deleteObject(storageRef);
      console.log("File deleted successfully");
      setUploadedFiles((prevFiles) =>
        prevFiles.filter((file) => file.name !== fileName)
      );
    } catch (error) {
      console.error("Error deleting file:", error);
    }
  };

  const handleCopyLink = (url: string) => {
    navigator.clipboard.writeText(url);
    alert("Link copied to clipboard!");
  };

  return (
    <Fragment>
      <header className="bg-slate-700 py-5">
        <h1 className="text-center text-white text-2xl capitalize font-bold">
          Folder Name: <span>👉</span> {folderName}
        </h1>
      </header>
      <div className="container-home">
        <div>
          <h3 className="text-xl font-bold text-center py-5">Upload File</h3>
          <label
            className="custum-file-upload folder-file-upload"
            htmlFor="file"
          >
            <div className="icon">
              <img src={file} alt="file" />
            </div>
            <input type="file" id="file" onChange={handleFileChange} />
            {selectedFiles && (
              <div className="font-bold flex items-center pr-2">
                {Array.from(selectedFiles).map((file, index) => (
                  <div key={index}>{file.name}</div>
                ))}
              </div>
            )}
          </label>
          <div>
            <button
              onClick={handleFileUpload}
              className="rounded-full bg-blue-500 text-white px-3 py-2 m-3 hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            >
              Upload
            </button>
          </div>

          <div className="uploaded-files">
            <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
              <thead className="bg-gray-200 text-gray-700">
                <tr>
                  <th className="py-2 px-4 font-bold">File Name</th>
                  <th className="py-2 px-4 font-bold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {uploadedFiles.map((file, index) => (
                  <tr
                    className="bg-gray-100 border-b border-gray-200"
                    key={index}
                  >
                    <td className="py-2 px-4 flex items-center">
                      <img src={folder2} alt="folder" className="mr-2" />
                      <h3 className="mr-1 font-bold">+</h3>
                      <img src={file2} alt="file" className="mr-2" />
                      <a
                        className="font-bold text-blue-700"
                        href={file.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {file.name}
                      </a>
                    </td>
                    <td className="py-2 px-4 text-center">
                      <button
                        className="text-blue-500 mr-2 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-2 border border-blue-500 hover:border-transparent rounded"
                        onClick={() => handleCopyLink(file.url)}
                      >
                        Copy Link
                      </button>
                      <button
                        className="text-red-500 bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-1 px-2 border border-red-500 hover:border-transparent rounded"
                        onClick={() => handleFileDelete(file.name)}
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
    </Fragment>
  );
};

export default FolderPage;
