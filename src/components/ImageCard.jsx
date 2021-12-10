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
                  src={
                    process.env +
                    item.filename
                  }
                  alt="new"
                />
              ) : (
                <Player
                  style={{ maxWidth: "100%" }}
                  key={item._id}
                  playsInline
                  // poster="/assets/poster.png"
                  src={process.env + item.filename}
                />
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default FeedbackItem;
