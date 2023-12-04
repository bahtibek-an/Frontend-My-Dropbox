import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { setFolder } from "../Slices/channel/channelSlice";
import { Folder, Delete } from "@mui/icons-material";
import { deleteFolder } from "../firebase/firebaseAPI";

function FileContainer({ title, id }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSelect = () => {
    if (id) {
      dispatch(setFolder({ folderId: id, folderName: title }));
      navigate(`/folder/${id}`);
    }
  };

  const handleDelete = async (e) => {
    e.stopPropagation();
    try {
      await deleteFolder(id);
      dispatch(setFolder({ folderId: null, folderName: null }));
    } catch (error) {
      console.error("Error deleting folder:", error);
    }
  };

  return (
    <Container onClick={handleSelect}>
      <Folder />
      <span>{title}</span>
      <DeleteButton onClick={handleDelete}>
        <Delete />
      </DeleteButton>
    </Container>
  );
}

export default FileContainer;

const Container = styled.div`
  width: 200.5px;
  height: 48px;
  display: flex;
  align-items: center;
  border: 1px solid rgba(0, 0, 0, 0.35);
  border-radius: 4px;
  margin-top: 20px;

  svg {
    height: 24px;
    width: 24px;
    color: rgba(95, 99, 104);
    margin-left: 20px;
  }
  
  span {
    font-size: 13px;
    margin-left: 20px;
  }
`;

const DeleteButton = styled.button`
  margin-top: 10%;
  margin-left: 20%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  outline: none;

  svg {
    color: red;
    width: 20px;
    height: 20px;
  }
`;