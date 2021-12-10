import React, { useState, useEffect } from "react";
import axios from "axios";
import { Player } from "video-react";
import Upload from "./Upload";

const FeedbackItem = () => {
  const [images, setImages] = useState([]);
  const [uploaded, setUploaded] = useState(false);
  const fetchImages = async () => {
    const url = process.env.BACKEND + "/fetchimages";
    console.log(url)
    const res = await axios.get(url);
    setImages(res.data);
  };
  useEffect(() => {
    fetchImages();
    
  }, [uploaded]);
  console.log(images)

  return (
    <div>
      <Upload setUploaded={setUploaded} />
      <div className="cardIMG">
        {images && <h1>Test</h1>}
      </div>
    </div>
  );
};

export default FeedbackItem;
