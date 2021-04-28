import React from 'react';
import LayersPanel from './LayersPanel';
import Mash from './Mash';
import Toolbar from './Toolbar';
//TODO: force landscape

const App = () => {
    return (
        <div className="bg-muidark" style={{width: "100%", height: "100vh"}}> 
            <div className="h-full">
                <div className="flex h-full">
                    <div className="z-10 w-96 relative">
                        <LayersPanel />
                    </div>
                    <div className="h-full w-full flex flex-col relative">
                        <div className="bg-muidark h-24 flex-initial z-10 relative">
                            <Toolbar />
                        </div>
                        <div className=" flex-auto flex items-center justify-center z-0 relative p-20 overflow-y-auto overflow-x-auto bg-muidark">
                            <Mash />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;