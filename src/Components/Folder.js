import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {Link, useNavigate, useParams} from "react-router-dom";
import styled from "styled-components";
import db from "../firebase/firebase";
import { setBoolean } from "../Slices/Bool/boolSlice";
import { selectFolderId, selectFolderName } from "../Slices/channel/channelSlice";
import FileList from "./FileList";
import { where } from "firebase/firestore";
import FileContainer from "./FileContainer";

function Folder() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { title, id } = useParams();
  const folderId = useSelector(selectFolderId);
  const folderName = useSelector(selectFolderName);
  const [filePhoto, setFilePhoto] = useState([]);
  const [folder, setFolder] = useState([]);

  useEffect(() => {
    if (!folderId) {
      navigate("/");
      window.location.reload();
    }
  }, [folderId, navigate]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, "folder", folderId, "folderTree"),
      orderBy("timestamp", "asc")),
      (snapshot) => {
        setFilePhoto(snapshot.docs);
      }
    );

    return () => unsubscribe();
  }, [folderId]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, "folder"),
      where("parentId", "==", folderId)),
      (snapshot) => {
        setFolder(snapshot.docs);
      }
    );

    return () => unsubscribe();
  }, [folderId]);

  const handleSelect = () => {
    if (id) {
      dispatch(setFolder({ folderId: id, folderName: title }));
      navigate(`/folder/${id}`);
    }
  };


  return (
    <Container onClick={() => dispatch(setBoolean({ modelBools: false }))}>
      <Navigation>
        <Link to="/">Home</Link>
        <Separator>&gt;</Separator>
        {folderName && 
          <Link 
            to={`/folder/${folderId}`}>{folderName}
          </Link>}
      </Navigation>
      <GridContainer>
        {filePhoto?.map((data) => (
          <FileList 
            key={data?.id}
            img={data?.data().Image} 
            title={data?.data().photoTitle} 
          />
        ))}
      </GridContainer>
      <GridContainer>
        {folder?.map((data) => (
          <FileContainer
            id={id}
            key={data?.id} 
            folder={data?.data().folder} 
            title={data?.data().name}
            onClick={handleSelect}
          />
        ))}
          <>
          {console.log(folder.data)}
          </>
      </GridContainer>
    </Container>
  );
}

export default Folder;

const Container = styled.div`
  flex-grow: 1;
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 15px 30px;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  margin: 20px 0;
`;

const Navigation = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  padding-bottom: 13px;

  a {
    color: #0084ff;
    text-decoration: none;
    font-family: Google Sans, Roboto, RobotoDraft, Helvetica, Arial, sans-serif;
    font-weight: 400;
    font-size: 18px;
    margin-right: 5px;
  }

  span {
    font-family: Google Sans, Roboto, RobotoDraft, Helvetica, Arial, sans-serif;
    font-weight: 400;
    font-size: 18px;
    color: #202124;
  }
`;

const Separator = styled.span`
  margin: 0 5px;
  color: #5f6368;
`;