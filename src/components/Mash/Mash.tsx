import React, { useEffect } from "react";
import ImageLayer from "./ImageLayer";
import "../../animations.css";

const Mash: React.FC = () => {
  const urls = [];

  // useEffect(() => {
  //     const fetchImage = async () => {
  //         const response = await axios.get("https://source.unsplash.com/random");
  //         console.log(response.request.responseURL);
  //     }
  //     fetchImage();
  // }, [])

  return (
    <div
      style={{
        width: "500px",
        height: "500px",
        position: "absolute",
        display: "inline-block",
      }}
    >
      <ImageLayer
        url="https://source.unsplash.com/random/?anime"
        blendMode="normal"
        opacity="100%"
      />
      <ImageLayer
        url="https://source.unsplash.com/random/?goth"
        blendMode="color-dodge"
        opacity= "100%"
      />
      <ImageLayer
        url="https://source.unsplash.com/random/?death"
        blendMode="overlay"
        opacity="100%"
      />
    </div>
  );
};

export default Mash;
