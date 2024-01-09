import React, { useEffect, useState } from "react";
import Navbar from "../menubar/menubar";
import Header from "../caption/caption";
import CreateFolder from "../menu/addfolder";
import UploadFIleModal from "../menu/addfile";
import "../authentic/authentic.css";
import { auth } from "../../config/firebase";
import { useDispatch, useSelector } from "react-redux";
import { changeUserProfile } from "../../recovery/Reducer";
import Loader from "../aniload/aniload";
import { useNavigate } from "react-router-dom";

const Edit = () => {
  const { postLoading } = useSelector((state) => state.files);
  const [visibleUploadModal, setVisibleUploadModal] = useState(false);
  const [visibleCreateFolderModal, setVisibleCreateFolderModal] =
    useState(false);
  const [user, setUser] = useState();
  useEffect(() => {
    auth.onAuthStateChanged((ll) => {
      setUser(ll);
      setData((prev) => ({ ...prev, username: ll.displayName }));
    });
  }, []);
  const [data, setData] = useState({
    username: user?.displayName,
  });
  const dispatch = useDispatch();
  const handleSubmit = () => {
    dispatch(changeUserProfile(data));
  };
  const navigate = useNavigate();
  return (
    <>
      {postLoading ? (
        <Loader />
      ) : (
        <>
          <Navbar />
          <Header
            navigationsState={false}
            setVisibleUploadModal={setVisibleUploadModal}
            setVisibleCreateFolderModal={setVisibleCreateFolderModal}
          />
          <div className='HomePage '>
            <div className='container'>
              <span className='close__icon' style={{color: "#000", cursor: "pointer"}} onClick={() => navigate(-1)}>
                back
              </span>
              <div class='auth'>
                <form class='form-1' onSubmit={handleSubmit}>
                  <h1>edit username</h1>
                  <label style={{color: "#000"}}for='email'>userName</label>
                  <input value={data?.username} type='text' required onChange={(e) =>
                      setData((prev) => ({ ...prev, username: e.target.value }))}/>
                  <button type='submit'>Update</button>
                </form>
              </div>
            </div>
          </div>
          <CreateFolder
            folderID={1}
            visible={visibleCreateFolderModal}
            setVisible={setVisibleCreateFolderModal}
          />
          <UploadFIleModal
            folderID={1}
            visible={visibleUploadModal}
            setVisible={setVisibleUploadModal}
          />
        </>
      )}
    </>
  );
};

export default Edit;
