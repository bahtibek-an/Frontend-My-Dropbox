import React, { useState } from "react";
import { VscChromeClose } from "react-icons/vsc";
import { getAuth } from "firebase/auth";
import { getStorage, ref, uploadString } from "firebase/storage";

const CreateFolder: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [folderName, setFolderName] = useState("");

  const handleCreateFolder = async () => {
    const auth = getAuth();
    const user = auth.currentUser;
  
    if (user) {
      const storage = getStorage();
      const folderPath = `users/${user.uid}/upload/${folderName}/`;
      
      const storageRef = ref(storage, folderPath);
  
      try {
        await uploadString(ref(storageRef), "");
        setShowModal(false);
        window.location.reload();
      } catch (error) {
        console.error("Error creating folder:", error);
      }
    }
  };
  

  return (
    <div>
      {showModal ? (
        <>
          <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-gray-600 bg-opacity-50">
            <div className="relative w-[80%] md:w-1/3 mx-auto">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div
                  className="px-3 pt-3 rounded-full flex justify-end"
                  onClick={() => setShowModal(false)}
                >
                  <VscChromeClose className="w-6 h-6 p-1 rounded-full text-white bg-blue-400 hover:bg-blue-500" />
                </div>
                <div className="relative p-2 md:p-6 flex-auto flex justify-center items-start">
                  <div>
                    <h1 className="text-center mb-0 text-2xl md:text-3xl font-semibold">
                      Create folder
                    </h1>
                    <h1 className="text-center my-1">
                      Type the name of the folder you want to create!
                    </h1>
                  </div>
                </div>
                <div className="w-96 m-auto mb-4">
                  <input
                    type="text"
                    value={folderName}
                    onChange={(e) => setFolderName(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-50 dark:border-blue-400 dark:placeholder-gray-500 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Enter the name of the folder you want to create"
                    required
                  />
                </div>
                <div className="flex items-center justify-center p-2 md:p-6 border-t border-solid gap-4 border-blue Gray-200 rounded-b">
                  <button
                    className="bg-gray-500 text-white active:bg-blue-600 font-bold uppercase text-xs md:text-sm p-2 md:px-8 md:py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    <h1 className="text-xs md:text-sm">Cancel</h1>
                  </button>
                  <button
                    className="bg-blue-700 text-white active:bg-blue-700 font-bold uppercase text-xs md:text-sm p-2 md:px-8 md:py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={handleCreateFolder}
                  >
                    Create
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}

      <button
        type="button"
        onClick={() => setShowModal(true)}
        data-te-ripple-init
        data-te-ripple-color="light"
        className="flex items-center rounded-lg bg-blue-600 ml-2 px-6 pb-4 pt-3 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="mr-1 h-4 w-4"
        >
          <path
            fillRule="evenodd"
            d="M19.5 21a3 3 0 003-3V9a3 3 0 00-3-3h-5.379a.75.75 0 01-.53-.22L11.47 3.66A2.25 2.25 0 009.879 3H4.5a3 3 0 00-3 3v12a3 3 0 003 3h15zm-6.75-10.5a.75.75 0 00-1.5 0v4.19l-1.72-1.72a.75.75 0 00-1.06 1.06l3 3a.75.75 0 001.06 0l3-3a.75.75 0 10-1.06-1.06l-1.72 1.72V10.5z"
            clipRule="evenodd"
          />
        </svg>
        Button
      </button>
    </div>
  );
};

export default CreateFolder;
