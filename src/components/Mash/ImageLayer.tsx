import React, { CSSProperties } from "react";
import CSS from 'csstype';

interface Props {
  url: string;
  blendMode: CSS.Property.MixBlendMode;
  opacity: CSS.Property.Opacity;
  animate?: string;
  duration?: number;
}

const ImageLayer: React.FC<Props> = ({ url, blendMode, opacity, animate, duration }) => {
  return (
    <img
      src={url}
      alt="layer icon"
      style={{
        width: "100%",
        height: "100%",
        objectFit: "cover",
        position: "inherit",
        opacity: opacity ? opacity : 1,
        mixBlendMode: blendMode,
        animation: animate
          ? `${animate} ${duration ? duration : 3}s infinite`
          : "none",
      }}
    />
  );
};

export default ImageLayer;
