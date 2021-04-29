import React, { useState } from "react";
import LayersPanel from "./LayersPanel/LayersPanel";
import Mash from "../Mash/Mash";
import Toolbar from "./Toolbar";
import { Layer, ILayer } from '../../types';

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
    url: "https://source.unsplash.com/random/?sexy",
    needsFetch: false,
    id: "3",
  },
]

const Editor = () => {
  const [layers, setLayers] = useState<Layer[]>(initialLayers);
  const [mashSize, setMashSize] = useState<{width: number, height: number}>({width: 1000, height: 500});

  return (
    <div className="bg-muidark w-full h-screen">
      <div className="flex h-full">
        <div className="z-10 w-96 ">
          <LayersPanel />
        </div>
        <div className="h-full w-full flex flex-col ">
          <div className="h-24 bg-muidark flex-initial z-10 ">
            <Toolbar mashSize={mashSize} setMashSize={setMashSize}/>
          </div>
          <div className="p-20 bg-muidark flex-auto flex items-center justify-center z-0 overflow-y-auto overflow-x-auto">
            <Mash layers={layers} mashSize={mashSize}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Editor;
