import React, { useState } from "react";
import styled from "styled-components";
import {
  Delete,
  FileCopy,
  GetApp,
} from "@mui/icons-material";
import {
  deleteDoc,
  doc,
  getFirestore,
} from "firebase/firestore";
import {
  deleteObject,
  getStorage,
  ref,
  getDownloadURL,
} from "firebase/storage";
import { useDispatch } from "react-redux";
import { setPhotoDisplay } from "../Slices/photodisplay/photoSlice";

function FileList({ img, title, id, file }) {
  const dispatch = useDispatch();
  const storage = getStorage();
  const firestore = getFirestore();
  const [isDeleted, setIsDeleted] = useState(false);

  const handleCopyLink = async () => {
    try {
      const imagesRef = ref(storage, `post/${id}/image`);
      const fileUrl = await getDownloadURL(imagesRef);
      await navigator.clipboard.writeText(fileUrl);
      alert("File link copied to clipboard!");
    } catch (error) {
      console.error("Error copying file link to clipboard:", error);
      alert("Error copying file link to clipboard. Please try again.");
    }
  };

  const downloadFile = async (url, fileName) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const blobURL = window.URL.createObjectURL(blob);
      const aTag = document.createElement("a");
      aTag.href = blobURL;
      aTag.setAttribute("download", fileName);
      document.body.appendChild(aTag);
      document.body.removeChild(aTag);
      aTag.click();

      alert("Image download started!");
    } catch (error) {
      alert("Error initiating image download:", error);
    }
  };

  const handleDelete = async (e) => {
    e.stopPropagation();
    try {
      const imagesRef = ref(storage, `post/${id}/image`);
      await deleteObject(imagesRef);

      const fileRef = doc(firestore, "post", id);
      await deleteDoc(fileRef);

      alert("Image and document deleted successfully!");

      dispatch(setPhotoDisplay({ photo: null, title: null }));
      setIsDeleted(true);
    } catch (error) {
      alert("Error deleting image and document:", error);
    }
  };

  const handleDownload = async () => {
    try {
      window.open(img, file, "_blank");
    } catch (error) {
      alert("Error retrieving file URL:", error);
      console.log(error);
    }
  };

  const handleButtonClick = () => {
    try {
      window.open(img, "_blank");
    } catch (error) {
      alert("Error opening file in a new window:", error);
      console.log(error);
    }
  };

  return (
    <Container isDeleted={isDeleted}>
      <Button onClick={handleButtonClick}>
        <img src="./img/file.png" alt={title}/>
      </Button>
      <ContentContainer>
        <FileTitle>{title}</FileTitle>
        <ActionButtonContainer>
          <DownloadButton onClick={handleDownload}>
            <GetApp />
          </DownloadButton>
          <CopyLinkButton onClick={handleCopyLink}>
            <FileCopy />
          </CopyLinkButton>
          <DeleteButton onClick={handleDelete}>
            <Delete />
          </DeleteButton>
        </ActionButtonContainer>
      </ContentContainer>
    </Container>
  );
}

export default FileList;

const Button = styled.button`
  background: 0;
  border: 0;
`
const Container = styled.div`
  position: relative;
  width: 250px;
  height: 120px;
  display: flex;
  align-items: center;
  border: 1px solid rgba(0, 0, 0, 0.35);
  border-radius: 4px;
  margin-top: 20px;

  img {
    width: 100px;
  }
`;

const ContentContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 10px;
`;

const FileTitle = styled.span`
  font-size: 13px;
  color: rgba(0, 0, 0, 0.72);
`;

const ActionButtonContainer = styled.div`
  display: flex;
  margin-top: 10px;
`;

const CopyLinkButton = styled.button`
  background-color: #f5f5f5;
  border: none;
  border-radius: 4px;
  padding: 4px;
  margin-left: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s;

  &:hover {
    background-color: #e0e0e0;
  }

  svg {
    font-size: 20px;
  }
`;

const DownloadButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5f5f5;
  color: #fff;
  border: none;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  cursor: pointer;
  margin-left: 10px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #45a049;
  }

  &:focus {
    outline: none;
  }
`;

const DeleteButton = styled.button`
  background-color: #f5f5f5;
  border: none;
  border-radius: 4px;
  padding: 4px;
  margin-left: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s;

  &:hover {
    background-color: #e0e0e0;
  }

  svg {
    font-size: 20px;
    color: red;
  }
`;
