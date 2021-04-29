import React from "react";
import LayersPanel from "./LayersPanel/LayersPanel";
import Mash from "../Mash/Mash";
import Toolbar from "./Toolbar";

const Editor = () => {
  return (
    <div className="bg-muidark w-full h-screen">
      <div className="flex h-full">
        <div className="z-10 w-96 ">
          <LayersPanel />
        </div>
        <div className="h-full w-full flex flex-col ">
          <div className="h-24 bg-muidark flex-initial z-10 ">
            <Toolbar />
          </div>
          <div className="p-20 bg-muidark flex-auto flex items-center justify-center z-0 overflow-y-auto overflow-x-auto">
            <Mash />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Editor;
