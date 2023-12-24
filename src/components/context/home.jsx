import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/firebase";
import { UploadOutlined, FolderAddOutlined } from "@ant-design/icons";
import { Layout, Button, theme, message, List } from "antd";
import { Link } from "react-router-dom";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
} from "firebase/storage";
import "../styles/home.css";

const { Content } = Layout;

const Home = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const [user] = useAuthState(auth);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [createdFileName, setCreatedFileName] = useState("");
  const [selectedFolder, setSelectedFolder] = useState("AllFile");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handleFileUpload = async () => {
    try {
      if (!selectedFile || !selectedFile.name) {
        throw new Error("Invalid file or file name is missing.");
      }

      const storage = getStorage();
      const storageRef = ref(storage, `${selectedFolder}/${selectedFile.name}`);

      await uploadBytes(storageRef, selectedFile);

      const downloadURL = await getDownloadURL(storageRef);

      setUploadedFiles((prevUploadedFiles) => [
        ...prevUploadedFiles,
        { name: selectedFile.name, downloadURL },
      ]);

      message.success(`${selectedFile.name} has been uploaded`);
    } catch (error) {
      console.error("Error uploading file:", error);
      message.error(`File upload failed: ${error.message}`);
    }
  };

  const handleFileView = (file) => {
    window.open(file.downloadURL, "_blank");
  };

  const handleCreateFile = async () => {
    if (!createdFileName) {
      message.error("Enter a file name!");
      return;
    }

    const fileContent = "This is the text of the file";
    const blob = new Blob([fileContent], { type: "text/plain" });
    const file = new File([blob], createdFileName);

    const storage = getStorage();
    const storageRef = ref(storage, `${selectedFolder}/${file.name}`);

    try {
      await uploadBytes(storageRef, file);
      message.success(`${file.name} created successfully`);

      setUploadedFiles((prevUploadedFiles) => [
        ...prevUploadedFiles,
        { name: file.name, downloadURL: URL.createObjectURL(file) },
      ]);
    } catch (error) {
      console.error("An error occurred while creating the file:", error);
      message.error(`An error occurred while creating the file: ${error.message}`);
    }
  };

  const handleFileNameChange = (e) => {
    setCreatedFileName(e.target.value);
  };

  const handleFolderChange = (folderName) => {
    setSelectedFolder(folderName);
    refreshFilesList(folderName);
  };

  const refreshFilesList = async (folderName) => {
    const storage = getStorage();
    const folderRef = ref(storage, folderName);
    const filesList = await listAll(folderRef);
    const files = filesList.items;

    const newUploadedFiles = files.map((file) => {
      return { name: file.name, downloadURL: file.fullPath };
    });

    setUploadedFiles(newUploadedFiles);
  };

  return (
    <div>
      <Layout className="home">
        <Layout>
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
              background: colorBgContainer,
            }}
          >
            {user ? (
              <div>
                <div className="box">
                  <div>
                    <input type="file" onChange={handleFileChange} className="home-file-upload-input" />
                    <Button icon={<UploadOutlined />} className="home-upload-button" onClick={handleFileUpload}>
                      Upload File
                    </Button>
                  </div>
                  <div className="addFile">
                    <input
                      type="text"
                      placeholder="Fayl nomini kiriting"
                      value={createdFileName}
                      onChange={handleFileNameChange}
                      className="home-file-name-input"
                    />
                    <Button className="home-create-button" icon={<FolderAddOutlined />} onClick={handleCreateFile}>
                      Add Folder
                    </Button>
                  </div>
                </div>

                <div className="folderButtons">
                  <Button className={`folderButton ${selectedFolder === "AllFile" ? "active" : ""}`} onClick={() => handleFolderChange("AllFile")}>
                    Files
                  </Button>
                  <Button className={`folderButton ${selectedFolder === "Folder1" ? "active" : ""}`} onClick={() => handleFolderChange("Folder1")}>
                    Folders
                  </Button>
                </div>

                <List
                  header={<div>Uploaded</div>}
                  bordered
                  dataSource={uploadedFiles}
                  renderItem={(file) => (
                    <List.Item
                      key={file.name}
                      onClick={() => handleFileView(file)}
                      style={{ cursor: "pointer" }}
                    >
                      <Link
                        to={file.downloadURL}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {file.name}
                      </Link>
                    </List.Item>
                  )}
                />
              </div>
            ) : null}
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};

export default Home;
