import React from "react";

export default function Filetype({ fileUrl, fileType }) {
    const handleDownload = () => {
        let a = document.createElement("a");
        a.href = `data:image/jpeg;base64,${blob.imgUrl}`;
        a.download = "got";
        a.click();
    };
    let downloadLink = null;
    
  const fileDownload = ({ fileUrl, fileType }) => {
    if (fileType === "pdf") {
      downloadLink = (
        <a href={fileUrl} download>
          Download PDF
        </a>
      );
    } else if ((fileType = "image")) {
      downloadLink = (
        <img src={fileUrl} alt="Download Image" onClick={handleDownload} />
      );
    } else {
      downloadLink = (
        <a href={fileUrl} download>
          Download File
        </a>
      );
    }
  };


  

  return <div>{downloadLink}</div>;
}
