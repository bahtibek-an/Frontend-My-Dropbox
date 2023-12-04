import React, {useEffect, useState} from "react";
import styled from "styled-components";
import Header from "./Components/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dropbox from "./Components/Dropbox";
import Model from "./Components/Model";
import FolderModel from "./Components/FolderModel";
import Folder from "./Components/Folder";
import PhotoModel from "./Components/PhotoModel";
import PhotoDisplay from "./Components/photoDisplay";
import { useSelector, useDispatch } from "react-redux";
import { selectUid, setLogIn, setLogOut } from "./Slices/user/userSlice";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/firebase";
import Auth from "./Components/Registration/Auth";
import Profile from "./Components/Profile";
import "./App.css";

function App() {
  const user = useSelector(selectUid);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setLogIn({ uid: user.uid, photo: user.photoURL }));
      } else {
        dispatch(setLogOut({ uid: null, photo: null }));
      }
      setLoading(false);
    });
  });

  if(loading) {
    return null;
  }

  return (
      <Router>
        {user ? (
          <>
            <Header />
            <Container>
              <Routes>
                <Route path="/" element={<Dropbox />} />
                <Route path="/folder/:id" element={<Folder />} />
                <Route path="/profile" element={<Profile />} />
              </Routes>
            </Container>
            <Model />
            <PhotoModel />
            <FolderModel />
            <PhotoDisplay />
          </>
        ) : (
          <Auth />
        )}
      </Router>
  );
}

export default App;

const Container = styled.div`
  display: flex;
`;