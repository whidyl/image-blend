import React, { useEffect } from "react";
import ImageLayer from "./ImageLayer";
import "../../animations.css";
import { Layer, ILayer } from '../../types'

interface Props {
  layers: Layer[]
  mashSize: {width?: number, height?: number}
}

const Mash: React.FC<Props> = ({layers, mashSize}) => {

  // useEffect(() => {
  //     const fetchImage = async () => {
  //         const response = await axios.get("https://source.unsplash.com/random");
  //         console.log(response.request.responseURL);
  //     }
  //     fetchImage();
  // }, [])

  let renderedLayers = layers.map((layer) =>{
    if (layer.type === "IMAGE_SEARCH") {
      let imgLayer = layer as ILayer;
      return (
        <ImageLayer key={imgLayer.id} blendMode={imgLayer.mode} opacity={imgLayer.opacity} url={imgLayer.url} />
      );
    } else {
      return null;
    }
  });

  return (
    <div
      style={{
        width: `${mashSize.width}px`,
        height: `${mashSize.height}px`,
        position: "absolute",
        display: "inline-block",
      }}
    >
      {renderedLayers}
    </div>
  );
};

export default Mash;
