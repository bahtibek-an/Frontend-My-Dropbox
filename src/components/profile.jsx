import { useState, useEffect } from 'react';
import { auth } from './firebase'; // Import your Firebase configuration module
import { getAuth, updateEmail, updatePassword } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import './profile.css'
function EditProfile() {
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [authUser, setAuthUser] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setAuthUser(user);
      if (user) {
        setNewEmail(user.email);
      }
    });

    return () => unsubscribe();
  }, []);
  const handleLogout = async () => {
    try {
      await auth.signOut();
      setUser(null);
      setUserFiles([]);
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };
  const handleEditProfile = async () => {
    try {
      if (authUser) {
        // Update email
        if (newEmail) {
          await updateEmail(authUser, newEmail);
        }

        // Update password
        if (newPassword && newPassword === confirmPassword) {
          await updatePassword(authUser, newPassword);
        }

        // Clear fields
        setNewEmail('');
        setNewPassword('');
        setConfirmPassword('');

        // Redirect or display a success message
        console.log('Profile updated successfully');
        navigate('/dashboard')
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <div className='cards_3'>
      <div className='cards-4'>
        <h2 className='text'>Edit Profile</h2>
        <input className='input' type="email" placeholder="New Email" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} />
        <input className='input' type="password" placeholder="New Password" onChange={(e) => setNewPassword(e.target.value)} />
        <input className='input' type="password" placeholder="Confirm Password" onChange={(e) => setConfirmPassword(e.target.value)} />
        <button className='m-3 btn-save' onClick={handleEditProfile}>Save Changes</button>
        <Link className='links-1' to='/dashboard'>Back</Link>
        <button className="btn-logout" onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}

export default EditProfile;
