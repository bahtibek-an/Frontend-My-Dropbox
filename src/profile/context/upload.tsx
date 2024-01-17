import React, { useState } from 'react';
import { uploadBytes, getStorage, ref } from 'firebase/storage';
import { auth } from '../../firebase/firebase';
import ListOther from '../others/list';
import CreateFolder from '../others/createFolder';

const HomeContext: React.FC = () => {
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFiles(e.target.files);
    }
  };

  const handleUpload = async () => {
    if (selectedFiles) {
      const storage = getStorage();
      const user = auth.currentUser;

      if (user) {
        const userId = user.uid;
        const storageRef = ref(storage, `users/${userId}/upload`);

        for (let i = 0; i < selectedFiles.length; i++) {
          const file = selectedFiles[i];
          const fileRef = ref(storageRef, file.name);

          try {
            await uploadBytes(fileRef, file);
            
          } catch (error) {
            console.error('Error uploading file:', error);
          }
        }
        setSelectedFiles(null);
      }
      window.location.reload();
    }
  };

  return (
    <div className='my-4'>
      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
        Upload multiple files
      </label>
      <div className='flex'>
        <input
          className="block w-full p-2 text-sm text-gray-900 border border-blue-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-900 focus:outline-none dark:bg-gray-100 dark:border-blue-600 dark:placeholder-gray-400"
          type="file"
          multiple
          onChange={handleFileChange}
        />
        <button
          type="button"
          onClick={handleUpload}
          className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg cursor-pointer hover:bg-blue-600 focus:outline-none"
        >
          Upload
        </button>
        <CreateFolder />
      </div>
      <ListOther />
    </div>
  );
};

export default HomeContext;
