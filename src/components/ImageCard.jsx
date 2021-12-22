import React, { useState, useEffect } from "react";
import axios from "axios";
import { Player } from "video-react";
import Upload from "./Upload";
import { LazyLoadImage } from "react-lazy-load-image-component";
import CloseIcon from "@material-ui/icons/Close";
import Slider from "./Slider";
import Loading from "./Loading";
import { FaAngleDoubleRight, FaAngleDoubleLeft, FaTimes } from "react-icons/fa";
import { IKImage, IKContext, IKUpload } from 'imagekitio-react'



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
  const [page, setPage] = useState(1);
  const [imagesCount, setImagesCount] = useState(0);
  const [currentCount, setCurrentCount]= useState(0)
  
  const fetchImages = async () => {
    const res = await axios.get(process.env.REACT_APP_FETCHIMAGES+`?page=${page}`);
    setImagesCount(res.data.imagesCount);
    setCurrentCount(
      (prevCurrentCount) => prevCurrentCount + res.data.images.length
    );
    setFetchStatus(res.status);
    setImages([ ...res.data.images, ...images]);
    setLength((prevLength) => prevLength + res.data.images.length);
     if (res) {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchImages();
  }, [uploaded,page]);
  
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
          <Upload setUploaded={setUploaded} />

      <div>
        

        <div className="cardIMG">
          <div className="img-container">
            <IKContext urlEndpoint="https://ik.imagekit.io/janawadallah/">
            {images &&
              images.map((item, index) => {
                return (
                  

                  <IKImage 
                    key={index}
                    loading="lazy"
                    lqip={{ active: true }}
                    style={{
                      width: "100%",
                    }}
                    effect="black-and-white"
                    path={item.filename}
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
              </IKContext>
          </div>
        </div>
      </div>
 </>
      )}
     {length === imagesCount && (
        <h2
          style={{
            textAlign: "center",
            columnSpan: "all",
            // position: "fixed",
            top: "30%",
            left: 0,
            margin: 30,
          }}
        >
          No more images here! please upload more if you have
        </h2>
      )}
      <div className={length === imagesCount ? "no-more" : "load-more"}>
        <h3
          style={{ fontSize: 30, cursor: "pointer", marginBottom: 10 }}
          onClick={() => {
            setPage(length < imagesCount ? page + 1 : page);
            setLoading(true);
          }}
        >
          Load More
        </h3>
        <FaAngleDoubleRight
          className="nextPage"
          onClick={() => {
            setPage(length < imagesCount ? page + 1 : page);
            setLoading(true);
          }}
        />
      </div>   </>
  );
};

export default FeedbackItem;
