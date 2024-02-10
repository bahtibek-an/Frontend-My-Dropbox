import React, { useState } from 'react';
import { auth, db } from './firebase';
import { addDoc, collection } from 'firebase/firestore';
import FoyFolderList from './FoyFolderList';
import { Link } from 'react-router-dom';

function YtPapka() {
  const [folderName, setFolderName] = useState('');
  const [parentFolderId, setParentFolderId] = useState('');

  const handleYtPapka = async () => { 
    const user = auth.currentUser;

    if (!user) {
      console.log('No user is logged in.');
      return;
    }

    try {
      const foldersRef = collection(db, 'folders');

      const newFolder = {
        name: folderName,
        parentId: parentFolderId || null,
        userId: user.uid,
      };

      await addDoc(foldersRef, newFolder);

      console.log('Folder created successfully:', newFolder);

      setFolderName('');
      setParentFolderId('');
    } catch (error) {
      console.error('Error creating folder:', error);
    }
  };

  return (
    <div>
      <h2>Create Folder</h2>
      <Link to='/dashboard'>Dashboard</Link>
      <FoyFolderList /> 
      <input
        type="text"
        placeholder="Folder Name"
        value={folderName}
        onChange={(e) => setFolderName(e.target.value)}
      />
      <button onClick={handleYtPapka}>Create Folder</button>
    </div>
  );
}

export default YtPapka;
