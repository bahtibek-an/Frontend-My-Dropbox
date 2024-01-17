import React, { useState } from 'react';
import { auth, usersCollection } from '../../firebase/firebase';
import { User, updateProfile } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';

const SettingsContext: React.FC = () => {
  const [fullName, setFullName] = useState('');
  const [error, setError] = useState('');

  const handleChangeFullName = async () => {
    if (!fullName.trim()) {
      setError('Please enter a valid full name.');
      return;
    }

    try {
      const user = auth.currentUser as User;

      await updateProfile(user, { displayName: fullName });

      const userId = user?.uid;
      await updateDoc(doc(usersCollection, userId), {
        fullName: fullName,
      });

      setFullName('');
      setError('');

      window.location.reload();
    } catch (error) {
      setError('Error updating full name. Please try again.');
      console.error(error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-8">
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-md p-6">
        <label className="block mb-2 text-xl font-semibold text-gray-800 dark:text-white">
          Change Username
        </label>
        <div className="flex items-center">
          <input
            type="text"
            className="rounded-md bg-gray-50 border-l-0 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-1/2 text-sm border-gray-300 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Change Username"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        <button
          className="mt-4 w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
          onClick={handleChangeFullName}
        >
          Change Username
        </button>
      </div>
    </div>
  );
};

export default SettingsContext;
