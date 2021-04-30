import React, { useState, useEffect } from "react";
import LayersPanel from "./LayersPanel/LayersPanel";
import Mash from "../Mash/Mash";
import Toolbar from "./Toolbar";
import { AbstractLayer, ILayer } from '../../types';
import axios from 'axios';

const initialLayers: ILayer[] = [
  {
    type: "IMAGE_SEARCH",
    query: "colorful rainbow", 
    mode: "normal",
    url: "https://source.unsplash.com/random/?boobs",
    opacity: 100,
    needsFetch: false,
    id: "1",
  },
  {
    type: "IMAGE_SEARCH",
    query: "lightning",
    mode: "difference",
    opacity: 50,
    url: "https://source.unsplash.com/random/?girls",
    needsFetch: false,
    id: "2",
  },
  {
    type: "IMAGE_SEARCH",
    query: "black",
    mode: "multiply",
    opacity: 50,
    url: "",
    needsFetch: true,
    id: "3",
  },
]

const Editor = () => {
  const [layers, setLayers] = useState<AbstractLayer[]>(initialLayers);
  const [mashSize, setMashSize] = useState<{width?: number, height?: number}>({width: 1000, height: 500});

  useEffect(() => {
    refreshURLs();
  },[])

  const refreshURLs = () => {
    const layersToFetch = layers.filter(layer => {
      if (layer.type === "IMAGE_SEARCH") {
        const imgLayer = layer as ILayer;
        return imgLayer.needsFetch;
      } 
      return false;
    })
    const imgLayersToFetch = layersToFetch as ILayer[];
    // now that layers are qued to be fetched, we don't need them to be fetched anymore.
    for (const imgLayer of imgLayersToFetch) {
      console.log(`to be set:`);
      console.log(imgLayer);
      setLayerNeedsFetch(imgLayer.id, false);
    }



    //TODO: set warning message on layer for bad request

    const fetchUrl = async (query: string) => {
      const response = await axios.get(`https://source.unsplash.com/random/?${query.replaceAll(' ', '-')}`);
      return response.request.responseURL;
    }

    const setURLs = async () => {
      for (const imgLayer of imgLayersToFetch) {
        const url = await fetchUrl(imgLayer.query)
        setLayerURL(imgLayer.id, url);
      }
    }

    setURLs();
  }


  const setLayerOpacity = (id:string, newOpacity: number) => {
    setLayers(prev => prev.map(layer => {
      if (layer.id === id) {
        return {...layer, opacity: newOpacity}
      }  else {
        return layer
      }
    }));
  }

  const setLayerURL = (id:string, newURL: string) => {
    setLayers(prev => prev.map(layer => {
      if (layer.id === id) {
        console.log(layer);
        return {...layer, url: newURL}
      }  else {
        return layer
      }
    }));
  }

  const setLayerNeedsFetch = (id:string, newNeedsFetch: boolean) => {
    setLayers(prev => prev.map(layer => {
      if (layer.id === id) {
        console.log("layer needsFetch was updated:")
        console.log(layer);
        return {...layer, needsFetch: newNeedsFetch}
      } else {
        return layer
      }
    }));
  }

  const moveLayer = (from: number, to: number) => {
    let layersTemp = [...layers];
    let layerTemp = layersTemp.splice(from, 1)[0];
    layersTemp.splice(to, 0, layerTemp);
    setLayers(layersTemp);
  }

  return (
    <div className="bg-muidark w-full h-screen">
      <div className="flex h-full">
        <div className="z-10 w-96 ">
          <LayersPanel layers={layers} setLayerOpacity={setLayerOpacity} moveLayer={moveLayer}/>
        </div>
        <div className="h-full w-full flex flex-col ">
          <div className="h-24 bg-muidark flex-initial z-10 ">
            <Toolbar mashSize={mashSize} setMashSize={setMashSize}/>
          </div>
          <div className="p-20 bg-muidark relative flex-auto flex items-center justify-center z-0 overflow-y-auto overflow-x-auto">
            <Mash layers={layers} mashSize={mashSize}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Editor;
