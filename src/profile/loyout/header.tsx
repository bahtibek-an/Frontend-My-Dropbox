import React, { useEffect, useState } from 'react';
import { db } from '../../firebase/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { useParams } from 'react-router-dom';

interface UserData {
  fullName: string;
}

const Header: React.FC = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const { userId: userIdParam } = useParams<{ userId?: string }>();
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const authInstance = getAuth();
    const unsubscribe = onAuthStateChanged(authInstance, (user: User | null) => {
      if (user) {
        setUserId(user.uid);
      } else {
        setUserId(null);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (userId || userIdParam) {
          const userDoc = await getDoc(doc(db, 'users', userId || userIdParam || ''));
          const userData = userDoc.data() as UserData | undefined;
          setUserData(userData || null);
        }
      } catch (error) {
        console.error('user error:', error);
      }
    };

    fetchUserData();
  }, [userId, userIdParam]);

  return (
    <div className='bg-gray-800 text-white p-4'>
      <div>
        {userData?.fullName && (
          <p className='text-2xl text-center'>Welcome to {userData.fullName} Dropbox</p>
        )}
      </div>
    </div>
  );
};

export default Header;
