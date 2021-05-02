import React from "react";
import CSS from 'csstype';

interface Props {
  url: string;
  blendMode: CSS.Property.MixBlendMode;
  effect: string;
  effectAmount: number;
  opacity: number;
  animate?: string;
  duration?: number;
}

const ImageLayer: React.FC<Props> = ({ url, blendMode, opacity, animate, duration, effect, effectAmount }) => {
  const effectStr = () => {
    switch (effect) {
      case 'none':
        return 'none'
      case 'blur':
        return `blur(${effectAmount*0.1}px)`
      case 'brightness':
        return `brightness(${effectAmount*2}%)`
      case 'contrast':
        return `contrast(${effectAmount*4}%)`
      case 'hue-rotate':
        return `hue-rotate(${effectAmount*(360/100)}deg)`
      case 'saturate':
        return `saturate(${effectAmount*10}%)`
      default:
        return `${effect}(${effectAmount}%)`
    }
  }

  return (
    <img
      src={url}
      alt="layer icon"
      style={{
        width: "100%",
        height: "100%",
        objectFit: "cover",
        position: "inherit",
        opacity: `${opacity}%`,
        filter: `${effectStr()}`,
        mixBlendMode: blendMode,
        animation: animate
          ? `${animate} ${duration ? duration : 3}s infinite`
          : "none",
      }}
    />
  );
};

export default ImageLayer;
