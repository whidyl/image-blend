import React from 'react';
import LayersPanel from './LayersPanel';
import Mash from './Mash';

const App = () => {
    return (
        <div className="bg-muidark" style={{width: "100%", height: "100vh"}}> 
            <div style={{display: "flex"}}>
                <LayersPanel />
                <Mash />
            </div>
        </div>
    );
}

export default App;