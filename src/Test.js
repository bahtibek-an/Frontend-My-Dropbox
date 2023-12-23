import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
const DownloadPDF = () => {
  const [pdfUrl, setPdfUrl] = useState(null);

  useEffect(() => {
    fetch("http://192.168.1.13/pdf/pdf.php")
      .then((response) => response.json())
      .then((res) => {
        setPdfUrl(res);
      });
  }, []);

  return (
    pdfUrl && (
      <a
        href={pdfUrl}
        download="Your_PDF_File.pdf"
        target="_blank"
        rel="noopener noreferrer"
      >
        Download PDF
      </a>
    )
  );
};

export default DownloadPDF;
