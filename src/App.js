import React from "react";
import FeedbackItem from "./components/ImageCard";
import Header from "./components/Header";

const App = () => {
  return (
    <>
      <Header title="Best Family Ever media gallery" />
      <div className="container">
      <FeedbackItem />
      
      </div>
    </>
  );
};

export default App;
