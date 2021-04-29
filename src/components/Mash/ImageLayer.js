import React from 'react';
const ImageLayer = ({url, blendMode, opacity, animate, duration}) => {
    return (
        <img src={url} style={{
            width: "100%", 
            height: "100%",
            objectFit: "cover",
            position: "inherit",
            opacity: opacity ? opacity : 1,
            mixBlendMode: blendMode,
            animation: animate ? `${animate} ${duration ? duration : 3}s infinite` : "none"
        }}/>
    );
}

export default  ImageLayer;