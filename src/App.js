import React, { useState } from "react";
import FeedbackItem from "./components/ImageCard";
import Header from "./components/Header";



const App = () => {
  const [loading, setLoading] = useState(true);
  return (
    <>
      <Header title="Best Family Ever media gallery" />
    
      <div className="container">
      <FeedbackItem setLoading={setLoading} loading={loading} />
      
      </div>
    </>
  );
};

export default App;
