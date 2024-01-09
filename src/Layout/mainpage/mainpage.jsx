import React, { useEffect, useState } from "react";
import Filetable from "../file_table/filetable";
import "./mainpage.css";
import Caption from "../caption/caption";
import Menubar from "../menubar/menubar";
import Addfile from "../menu/addfile";
import Addfolder from "../menu/addfolder";
import { useDispatch, useSelector } from "react-redux";
import { getAllUserFiles, getUserFolder } from "../../recovery/Reducer";
import Aniload from "../aniload/aniload";

function Mainpage() {
  let user = JSON.parse(localStorage.getItem("localUser"));
  const { filesData, foldersData, postLoading } = useSelector(
    (state) => state.files
  );
  const [visibleAddfileModal, setVisibleAddfileModal] = useState(false);
  const [visibleAddfolderModal, setVisibleAddfolderModal] =
    useState(false);

  var dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserFolder(user?.uid));
    dispatch(getAllUserFiles(user?.uid));
  },);
  const foldersD = foldersData?.filter((x) => x.folderId === 1);
  const filesD = filesData.filter((x) => x.folderId === 1);
  return (
    <> {postLoading ? ( <Aniload /> ) : (
        <>
          <Menubar />
          <Caption
            navigationsState={false}
            setVisibleUploadModal={setVisibleAddfileModal}
            setVisibleCreateFolderModal={setVisibleAddfolderModal}
          />
          <div className='HomePage '>
            <div className='container'>
              <Filetable filesD={filesD} foldersD={foldersD} />
            </div>
          </div>
          <Addfolder
            folderID={1}
            visible={visibleAddfolderModal}
            setVisible={setVisibleAddfolderModal}
          />
          <Addfile
            folderID={1}
            visible={visibleAddfileModal}
            setVisible={setVisibleAddfileModal}
          />
        </>
      )}
    </>
  );
}

export default Mainpage;
