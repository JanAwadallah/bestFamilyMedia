import React from "react";
import axios from "axios";
import imageCompression from "browser-image-compression";

const Upload = ({ setUploaded }) => {
  async function handleImageUpload(event) {
    const compressedFiles = [];
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };
    const imageFiles = event.target.files;

    try {
      for (let i = 0; i < imageFiles.length; i++) {
        const compressedFile = await imageCompression(imageFiles[i], options);
        console.log(compressedFile);
        compressedFiles.push(compressedFile);
      }
    } catch (error) {
      console.log(error);
    }

    fileUploadHandler(compressedFiles);
    setUploaded(true)
  }
  const fileUploadHandler = async (arr) => {
    if (arr) {
      for (let i = 0; i < arr.length; i++) {
        const data = new FormData();
        const filename = Date.now() + arr[i].name;
        const type = arr[i].type;
        data.append("name", filename);
        data.append("type", type);
        data.append("file", arr[i]);
        try {
          await axios.post(process.env.REACT_APP_UPLOAD, data);
        } catch (err) {
          console.log(err);
        }
      }
    }
  };
  return (
    <div>
      <form>
        <label htmlFor="fileInput" style={{ fontSize: 30, width: 350 }}>
          <i className="upload icon"></i>Upload
        </label>
        <input
          id="fileInput"
          type="file"
          multiple
          style={{ display: "none" }}
          onChange={(event) => handleImageUpload(event)}
        />
      </form>
    </div>
  );
};

export default Upload;
