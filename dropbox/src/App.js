import './App.css';
import React, { useState } from 'react';

function MyDropbox() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = () => {
    if (selectedFile) {
      console.log("Yuklangan fayl nomi:", selectedFile.name);
      const fileURL = URL.createObjectURL(selectedFile);
      window.open(fileURL, '_blank');
    } else {
      console.log("Fayl tanlanmagan!");
    }
  };
  return (
    <div>
      <h1>My Dropbox</h1>
      <input className='inpt'  type="file" onChange={handleFileChange}/>
      {selectedFile && <b  >Yuklangan fayl nomi:  {selectedFile.name}</b>}
      <button onClick={handleUpload}>Yuklash</button>
    </div>
  );
}
export default MyDropbox;
