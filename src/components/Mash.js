import React, { useEffect } from 'react';
import ImageLayer from './ImageLayer';
import axios from 'axios';
import '../animations.css';


const Mash = () => {
    const urls = []

    // useEffect(() => {
    //     const fetchImage = async () => {
    //         const response = await axios.get("https://source.unsplash.com/random");
    //         console.log(response.request.responseURL);
    //     }
    //     fetchImage();
    // }, [])

    return (
        <div style={{ width: "500px", height: "500px", margin: "50px", position: "absolute"}}>
            <ImageLayer url="https://source.unsplash.com/random/?texture" blendMode="normal" opacity="100%"/>
            <ImageLayer url="https://source.unsplash.com/random/?lightning" blendMode="color-dodge" animate=""/>
            <ImageLayer url="https://source.unsplash.com/random/?colorful" blendMode="color" opacity="100%" animate="hue" duration={10}/>
        </div>
    );
}

export default Mash;