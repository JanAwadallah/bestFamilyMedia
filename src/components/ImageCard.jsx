import React, { useState, useEffect } from "react";
import axios from "axios";
import { Player } from "video-react";
import Upload from "./Upload";
import CloseIcon from "@material-ui/icons/Close";
const FeedbackItem = () => {
  const [images, setImages] = useState([]);
  const [uploaded, setUploaded] = useState(false);
  const [model, setModel] = useState(false);
  const [tempSrc, setTempSrc] = useState("");
  const [tempType, setTempType] = useState("");
  const fetchImages = async () => {
    const res = await axios.get(process.env.REACT_APP_FETCHIMAGES);
    setImages(res.data);
  };
  useEffect(() => {
    fetchImages();
  }, [uploaded]);
  const getImg = (imgSrc, type) => {
    setTempSrc(imgSrc);
    setTempType(type);
    setModel(true);
  };
  console.log(tempSrc);

  return (
    <>
      <div className={model ? "open" : "model"}>
        {["image/jpg", "image/jpeg", "image/png"].includes(tempType) ? (
          <div>
            <img src={tempSrc} alt="new" />
            <CloseIcon onClick={() => setModel(false)} />
          </div>
        ) : null}
      </div>
      <div>
        <Upload setUploaded={setUploaded} />
        <div className="cardIMG">
          {images &&
            images.map((item) => (
              <div className="img-container">
                {["image/jpg", "image/jpeg", "image/png"].includes(
                  item.type
                ) ? (
                  <img
                    key={item._id}
                    style={{
                      width: "100%",
                    }}
                    src={process.env.REACT_APP_LINK + item.filename}
                    alt="new"
                    onClick={() =>
                      getImg(
                        process.env.REACT_APP_LINK + item.filename,
                        item.type
                      )
                    }
                  />
                ) : (
                  <div style={{ marginBottom: 6 }}>
                    <Player
                      style={{ width: "100%" }}
                      key={item._id}
                      playsInline
                      src={process.env.REACT_APP_LINK + item.filename}
                    />
                  </div>
                )}
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default FeedbackItem;
