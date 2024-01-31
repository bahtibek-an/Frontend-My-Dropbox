// FileContainer.js
import React, { useState } from "react";
import File from "./File";

export default function FileContainer() {
  const [files, setFiles] = useState(["qwer", "test1", "test2"]);

  function handleDeletee(){
    console.log("works");
  }

  const handleDelete = (fileToDelete) => {
    const updatedFiles = files.filter((file) => file !== fileToDelete);
    setFiles(updatedFiles);
    console.log(`Deleting file: ${fileToDelete.name}`);
  };

  const handleUpload = (newFile) => {
    setFiles([...files, newFile]);
    console.log(`Uploading file: ${newFile.name}`);
  };

  const handleCopyLink = (file) => {
    navigator.clipboard.writeText(file.url);
    console.log(`Copying link for file: ${file.name}`);
  };

  

  return (
    <div>
      
    {console.log("files", files)}
    <File handleDeletee={handleDeletee} files={files}/>
       {files?.map((file, index) => (
        <File
          handleDeletee= {handleDeletee}
          key={index}
          file={file}
          onDelete={del}
          onCopyLink={handleCopyLink}
          onUpload={() => handleUpload({ name: "new-file.txt", url: "https://example.com/new-file.txt" })}
        />
      ))}
    </div>
  );
}
