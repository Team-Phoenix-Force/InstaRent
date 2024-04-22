"use client";
import { useState } from "react";
import { Upload } from "keep-react";

export const UploadComponent = () => {
  const [fileName, setFileName] = useState("");
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
    }
  };
  return (
    <Upload
      onFileChange={handleFileChange}
      file={fileName}
      horizontal={true}
      id="upload"
    />
  );
};
