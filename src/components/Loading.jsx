import React from "react";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
export default class App extends React.Component {
  //other logic
  render() {
    return (
      <Loader type="Watch" color="#ff6a95" height={"80vh"} width={"100vw"}>
        Loading
      </Loader>
    );
  }
}
