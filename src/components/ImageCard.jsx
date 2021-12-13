import React, { useState, useEffect } from "react";
import axios from "axios";
import { Player } from "video-react";
import Upload from "./Upload";
import CloseIcon from "@material-ui/icons/Close";
import Slider from "./Slider";
const FeedbackItem = () => {
  const [images, setImages] = useState([]);
  const [length, setLength] = useState(0);
  const [fetchStatus, setFetchStatus] = useState(null);
  const [uploaded, setUploaded] = useState(false);
  const [model, setModel] = useState(false);
  const [tempSrc, setTempSrc] = useState("");
  const [tempType, setTempType] = useState("");
  const [tempIndex, setTempIndex] = useState(0);
  const fetchImages = async () => {
    const res = await axios.get(process.env.REACT_APP_FETCHIMAGES);
    setFetchStatus(res.status);
    setImages(res.data);
    setLength(res.data.length);
  };
  useEffect(() => {
    fetchImages();
  }, [uploaded]);
  const getImg = (imgSrc, type, index) => {
    setTempSrc(imgSrc);
    setTempType(type);
    setModel(true);
    setTempIndex(index);
  };

  return (   <>
      <Slider
        setModel={setModel}
        images={images}
        type={tempType}
        tempIndex={tempIndex}
        model={model}
        length={length}
        setTempIndex={setTempIndex}
      />

      <div>
        <Upload setUploaded={setUploaded} />

        <div className="cardIMG">
          <div className="img-container">
            {images &&
              images.map((item, index) => {
                return (
                  <LazyLoadImage
                    key={item._id}
                    style={{
                      width: "100%",
                    }}
                    src={process.env.REACT_APP_LINK + item.filename}
                    alt="new"
                    onClick={() =>
                      getImg(
                        process.env.REACT_APP_LINK + item.filename,
                        item.type,
                        index
                      )
                    }
                  />
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
};

export default FeedbackItem;
