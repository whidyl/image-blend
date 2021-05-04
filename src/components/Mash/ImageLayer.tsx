import React from "react";
import CSS from 'csstype';
import { ILayer } from "../../types";

interface Props {
  layerData: ILayer;
}

const ImageLayer: React.FC<Props> = ({ layerData }) => {
  const effectStr = () => {
    switch (layerData.effect) {
      case 'none':
        return 'none'
      case 'blur':
        return `blur(${layerData.effectAmount*0.1}px)`
      case 'brightness':
        return `brightness(${layerData.effectAmount*2}%)`
      case 'contrast':
        return `contrast(${layerData.effectAmount*4}%)`
      case 'hue-rotate':
        return `hue-rotate(${layerData.effectAmount*(360/100)}deg)`
      case 'saturate':
        return `saturate(${layerData.effectAmount*10}%)`
      default:
        return `${layerData.effect}(${layerData.effectAmount}%)`
    }
  }

  return (
    <img
      src={layerData.url}
      alt="layer icon"
      style={{
        width: "100%",
        height: "100%",
        objectFit: "cover",
        position: "inherit",
        opacity: `${layerData.opacity}%`,
        filter: `${effectStr()}`,
        mixBlendMode: layerData.mode as CSS.Property.MixBlendMode,
        animation: layerData.animateEffect ? `${layerData.effect} ${layerData.effectDuration ? layerData.effectDuration : 3}s ease-in-out infinite` : "none",
      }}
    />
  );
};

export default ImageLayer;
