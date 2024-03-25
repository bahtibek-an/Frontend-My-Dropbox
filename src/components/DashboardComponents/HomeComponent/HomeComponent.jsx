import { shallowEqual, useSelector } from "react-redux";
import "./HomeComponent.css";
import ShowItems from "../ShowItems/ShowItems";
import { useEffect } from "react";

const HomeComponent = () => {
  const { isLoading, userFolders, userFiles } = useSelector(
    (state) => ({
      isLoading: state.filefolders?.isLoading,
      userFolders: state.filefolders?.userFolders.filter((folder) => folder.data.parent == "root"),
      userFiles: state.filefolders.userFiles.filter((folder) => folder.parent === "root") || [],
    }),
    shallowEqual
  );

  useEffect(() => {

  },[userFolders,isLoading,userFiles])  

  // console.log(userFolders);

  return (
    <div className="col-md-12 w-100">
      {isLoading ? (
        <h1 className="display-1 my-5 text-center">Loading ...</h1>
      ) : (
        <>
          <ShowItems
            title={"Created Folders"}
            type={"folder"}
            items={userFolders}
          />
          <ShowItems
            title={"Created Files"}
            type={"files"}
            items={userFiles.filter((file) => file?.url == null)}
          />
          <ShowItems
            title={"Uploaded Files"}
            type={"upload-files"}
            items={userFiles.filter((file) => file.data === null && file.path.length == 0)}
          />
        </>
      )}
    </div>
  );
};

export default HomeComponent;
