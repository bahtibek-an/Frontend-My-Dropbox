import React, { useEffect, useState } from 'react';
import { auth, db } from './firebase';
import { collection, query, where, getDocs, onSnapshot, doc, deleteDoc } from 'firebase/firestore';
import { Link } from 'react-router-dom';

function FoyFolderList() {
  const [userFolders, setUserFolders] = useState([]);
  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setAuthUser(user);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!authUser) {
      return; 
    }

    const foldersRef = collection(db, 'folders');
    const q = query(foldersRef, where('userId', '==', authUser.uid), where('parentId', '==', null));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const foldersData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setUserFolders(foldersData);
    });

    return () => unsubscribe();
  }, [authUser]);

  const handleDeleteFolder = async (folderId) => {
    try {
      const folderRef = doc(db, 'folders', folderId);
      await deleteDoc(folderRef);

      console.log('Folder deleted successfully:', folderId);
    } catch (error) {
      console.error('Error deleting folder:', error);
    }
  };

  return (
    <div>
      <ul>
        {userFolders.map((folder) => (
          <li key={folder.id} style={{margin:10}}>
            <Link className='links' to={`/fldr/${folder.id}`}>{folder.name}</Link>
            <button className='buttons' onClick={() => handleDeleteFolder(folder.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FoyFolderList;
