import React, { useState, useEffect } from "react";
import axios from "axios";
import { Player } from "video-react";
import Upload from "./Upload";
import { LazyLoadImage } from "react-lazy-load-image-component";
import CloseIcon from "@material-ui/icons/Close";
import Slider from "./Slider";
import Loading from "./Loading";





const FeedbackItem = () => {
  const [images, setImages] = useState([]);
  const [length, setLength] = useState(0);
  const [fetchStatus, setFetchStatus] = useState(null);
  const [uploaded, setUploaded] = useState(false);
  const [model, setModel] = useState(false);
  const [tempSrc, setTempSrc] = useState("");
  const [tempType, setTempType] = useState("");
  const [tempIndex, setTempIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  
  const fetchImages = async () => {
    const res = await axios.get(process.env.REACT_APP_FETCHIMAGES);
    setFetchStatus(res.status);
    setImages(res.data);
    setLength(res.data.length);
     if (res) {
      setLoading(false);
    }
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
  {loading ? (
        <Loading />
      ) : (
        <>
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
                    effect="black-and-white"
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
      )}
    </>
  );
};

export default FeedbackItem;
