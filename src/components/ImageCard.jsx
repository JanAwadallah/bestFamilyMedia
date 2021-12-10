import React, { useState, useEffect } from "react";
import axios from "axios";
import { Player } from "video-react";
import Upload from "./Upload";

const FeedbackItem = () => {
  const [images, setImages] = useState([]);
  const [uploaded, setUploaded] = useState(false);
  const fetchImages = async () => {
    const url = process.env.REACT_APP_FETCHIMAGES;
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
{images &&
          images.map((item) => (
            <div className="img-container">
              {["image/jpg", "image/jpeg", "image/png"].includes(item.type) ? (
                <img
                  key={item._id}
                  style={{
                    // margin: "5%",
                    // display: "block",
                    maxWidth: "100%",
                    // maxHeight: "100%",
                    // width: "auto",
                    // height: "auto",
                  }}
                  src={process.env.REACT_APP_LINK + item.filename}
                  alt="new"
                />
              ) : (
                <Player
                  style={{ maxWidth: "100%" }}
                  key={item._id}
                  playsInline
         
                  src={process.env.REACT_APP_LINK + item.filename}
                />
              )}
            </div>
          ))}      </div>
    </div>
  );
};

export default FeedbackItem;
