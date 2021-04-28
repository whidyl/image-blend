import React from 'react';
import LayersPanel from './LayersPanel';
import Mash from './Mash';
import Toolbar from './Toolbar';

const App = () => {
    return (
        <div className="bg-muidark" style={{width: "100%", height: "100vh"}}> 
            <div className="h-full">
                <div className="flex h-full">
                    <div className="">
                        <LayersPanel />
                    </div>
                    <div className="h-full w-full flex flex-col">
                        <div className="bg-muidark h-24 flex-initial">
                            <Toolbar />
                        </div>
                        <div className="flex-auto flex items-center justify-center">
                            <Mash />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;