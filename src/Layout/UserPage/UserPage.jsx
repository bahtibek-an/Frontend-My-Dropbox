import { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import Header from "../Header/Header";
import CreateFolder from "../Modals/CreateFolder";
import UploadFIleModal from "../Modals/UploadFIleModal";
import "../Login_Register/Auth.css";
import { auth } from "../../api/firebase";
import { useDispatch, useSelector } from "react-redux";
import { changeUserProfile } from "../../redux/extraReducer";
import Loader from "../Loader/Loader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faLeftLong } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
const UserPage = () => {
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
          <div className="HomePage ">
            <div className="container">
              <span
                className="close__icon"
                style={{ fontSize: "30px", color: "#fff", cursor: "pointer" }}
                onClick={() => navigate(-1)}
              >
                <FontAwesomeIcon style={{marginTop: "15px"}} icon={faLeftLong} />
              </span>
              <center>
                <div className="form-container">
                  <p className="title">Login</p>
                  <div className="auth">
                    <form className="form" onSubmit={handleSubmit}>
                      <input
                        value={data?.username}
                        className="input"
                        type="text"
                        required
                        onChange={(e) =>
                          setData((prev) => ({
                            ...prev,
                            username: e.target.value,
                          }))
                        }
                      />

                      <button className="form-btn" type="submit">
                        Update
                      </button>
                    </form>
                  </div>
                </div>
              </center>
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

export default UserPage;
