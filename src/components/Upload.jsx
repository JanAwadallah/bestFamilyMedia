import React from "react";
import axios from "axios";

const Upload = ({ setUploaded }) => {
  const fileInputHandler = async (e) => {
    const files = e.target.files;
   
    if (files) {
      for (let i = 0; i < files.length; i++) {
         
        const data = new FormData();
        const filename = Date.now() + files[i].name;
        const type = files[i].type;
        data.append("name", filename);
        data.append("type", type);
        data.append("file", files[i]);
        try {
         
          await axios.post(process.REACT_APP_UPLOAD, data);
          console.log(before);
          setUploaded(true);
        } catch (err) {}
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
          onChange={fileInputHandler}
        />
      </form>
    </div>
  );
};

export default Upload;
