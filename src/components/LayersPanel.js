import React from 'react'
import { DragDropContext } from 'react-beautiful-dnd';

const layerData = [
    {
        type: "UNSPLASH_QUERY",
        query: "colorful rainbow"
    },
    {
        type: "UNSPLASH_QUERY",
        query: "lightning"
    },
    {
        type: "GRADIENT",
        query: "black"
    }
]

const LayersPanel = () => {
    return <div style={{width: "100px", height: "100%", backgroundColor:"gray"}}>{layerData.map(layer => {<div> {layer.name} </div>})}</div>
}

export default LayersPanel;