import React, { useState } from "react";
import FeedbackItem from "./components/ImageCard";
import Header from "./components/Header";
import Loading from "./components/Loading";


const App = () => {
  const [loading, setLoading] = useState(true);
  return (
    <>
      <Header title="Best Family Ever media gallery" />
     {loading && <Loading />}
      <div className="container">
      <FeedbackItem setLoading={setLoading} />
      
      </div>
    </>
  );
};

export default App;
