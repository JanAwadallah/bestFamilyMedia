import zIndex from "@material-ui/core/styles/zIndex";
import React, { useState, useEffect } from "react";
import { FaAngleDoubleRight, FaAngleDoubleLeft, FaTimes } from "react-icons/fa";
import { Player } from "video-react";
import { IKImage, IKContext, IKUpload } from 'imagekitio-react'
import { motion, AnimatePresence } from "framer-motion";


const Slider = ({
  images,
  type,
  tempIndex,
  model,
  setModel,
  length,
  setTempIndex,
}) => {
  const [current, setCurrent] = useState(tempIndex);
  const nextHandler = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
    // setTempIndex(tempIndex === length - 1 ? 0 : tempIndex + 1);
  };
  const prevHandler = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };
  const closehandler = () => {
    setModel(false);
    setTempIndex(0);
  };
  useEffect(() => {
    setCurrent(tempIndex);
  }, [tempIndex]);
  return (
    <div style={{ position: "relative" }}>
      <div className={model ? "open" : "model"}>
        <div>
          <FaAngleDoubleRight className="next" onClick={nextHandler} />
          <FaAngleDoubleLeft className="prev" onClick={prevHandler} />
            <IKContext urlEndpoint="https://ik.imagekit.io/janawadallah/">
          {images.map((image, index) => {
            if (index === current) {
              if (
                ["image/jpg", "image/jpeg", "image/png"].includes(image.type)
              ) {
                return (
                  <AnimatePresence key={index}>
                  <motion.div>
                  <IKImage 
                    key={index}
                    loading="lazy"
                    lqip={{ active: true }}
              className="slider-img"
                    src={process.env.REACT_APP_LINK + image.filename}
                    alt="new"
                  />
                      </motion.div>
                 </AnimatePresence>
            );
              } else {
                
                return (
                  <Player
                    fluid={false}
                    width={window.screen.width * 0.8}
                    // height={window.screen.height}
                    preload=""
                    key={image._id}
                    // playsInline
                    src={process.env.REACT_APP_LINK + image.filename}
                  />
                );
              }
            }
          })}
          </IKContext>
          <FaTimes onClick={closehandler} className="close" />
        </div>
      </div>
    </div>
  );
};

export default Slider;
