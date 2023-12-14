import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import { useUserAuth } from "../context/user";
import React, { useEffect, useState } from 'react';
import { getStorage, ref, uploadBytes, listAll, getDownloadURL } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import firebaseConfig from '../firebas';
import { CiFileOn } from "react-icons/ci";

const Upload = () => {
  const { logOut } = useUserAuth();
  const navigate = useNavigate();
  const [fileUpload, setFileUpload] = useState(null);
  const [todos, setTodos] = useState([]);

  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  const uploadFile = () => {
    if (fileUpload === null) return;
    const storage = getStorage(firebaseConfig);
    const fileName = `${fileUpload.name}@@${uuidv4()}`;
    const fileRef = ref(storage, `files/${fileName}`);
    uploadBytes(fileRef, fileUpload)
      .then(() => {
        alert('Upload was successful');
        setFileUpload(null); // Faylni yuklagandan so'ng inputni tozalash
        fetchPost(); // Yangi yuklangan fayllarni ko'rish uchun fetchPost() chaqirish
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchPost = async () => {
    const storage = getStorage(firebaseConfig);
    const filesRef = ref(storage, 'files/');

    try {
      const res = await listAll(filesRef);
      const fileUrls = await Promise.all(
        res.items.map(async (itemRef) => {
          const url = await getDownloadURL(itemRef);
          return { url, name: itemRef.name.split('@@')[0] };
        })
      );
      setTodos(fileUrls);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPost();
  }, []);

  return (
    <div className="contain">
      <header>
        <div className="navbars">
          <input type="file" onChange={(event) => setFileUpload(event.target.files[0])} />
          <Button onClick={uploadFile}>Upload</Button>
          <Button variant="primary" onClick={handleLogout}>
            Log out
          </Button>
        </div>
      </header>
      <div className="items-container">
        {todos.map((todo, i) => (
          <p key={i}>
            <a href={todo.url} target="_blank" rel="noopener noreferrer">
              <div className="items">
              <CiFileOn className="file-icon"/>
                {todo.name}
              </div>
            </a>
          </p>
        ))}
      </div>
    </div>
  );
};

export default Upload;