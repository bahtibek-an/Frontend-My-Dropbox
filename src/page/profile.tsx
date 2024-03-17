import { useState, useEffect } from "react";
import { auth } from "../firebase/firebase";

const ProfileEditPage = () => {
  const [email, setEmail] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isEditingEmail, setIsEditingEmail] = useState(false);

  useEffect(() => {
    const userEmail = localStorage.getItem("email");
    if (userEmail) {
      setEmail(userEmail);
      setNewEmail(userEmail);
    } else {
      const unsubscribe = auth.onAuthStateChanged((user) => {
        if (user) {
          setEmail(user.email || "");
          setNewEmail(user.email || "");
        }
      });

      return () => unsubscribe();
    }
  }, []);

  useEffect(() => {
    const userEmail = localStorage.getItem("email");
    if (userEmail) {
      setNewEmail(userEmail);
    }
  }, [isEditingEmail]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewEmail(e.target.value);
  };

  const handleUpdateEmail = async () => {
    try {
      setIsEditingEmail(false);
      localStorage.setItem("email", newEmail);
      window.location.reload();
    } catch (error) {
      console.error(error);
      setErrorMessage("Failed to update email");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="max-w-md w-full px-8 py-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Edit Profile</h1>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
            Email
          </label>
          {isEditingEmail ? (
            <div className="flex items-center">
              <input
                type="email"
                id="email"
                name="email"
                value={newEmail}
                onChange={handleInputChange}
                className="form-input pl-3 w-full h-12 rounded-md shadow-sm outline-none"
                required
              />
              <button
                className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleUpdateEmail}
              >
                Save
              </button>
              <button
                className="ml-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => setIsEditingEmail(false)}
              >
                Cancel
              </button>
            </div>
          ) : (
            <div className="flex items-center">
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                readOnly
                className="form-input pl-3 w-full h-12 rounded-md shadow-sm outline-none"
              />
              <button
                className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => setIsEditingEmail(true)}
              >
                Edit
              </button>
            </div>
          )}
        </div>
        {errorMessage && <p className="text-green-500">{errorMessage}</p>}
      </div>
    </div>
  );
};

export default ProfileEditPage;
