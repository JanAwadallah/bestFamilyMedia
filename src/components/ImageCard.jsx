import React, { useState, useEffect } from "react";
import axios from "axios";
import { Player } from "video-react";
import Upload from "./Upload";

const FeedbackItem = () => {
  const [images, setImages] = useState([]);
  const [uploaded, setUploaded] = useState(false);
  const fetchImages = async () => {
    const res = await axios.get("/fetchimages");
    setImages(res.data);
  };
  useEffect(() => {
    fetchImages();
  }, [uploaded]);

  return (
    <div>
      <Upload setUploaded={setUploaded} />
      <div className="cardIMG">
        {images && <h1>{images.length}</h1>}
      </div>
    </div>
  );
};

export default FeedbackItem;
