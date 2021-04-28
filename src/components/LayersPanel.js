import React, { useState } from 'react'
import { Fragment } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';


const Handle = (props) => {
    return <div className=" h-7 w-7 min-w-max mr-4 flex " {...props}> <img className="items-center opacity-50 hover:opacity-100" src="icons8-menu-24.png"/> </div>;
}

const Layer = (props) => {
    const [open, setOpen] = useState(false);
    const [animateOver, setAnimateOver] = useState(false);

    return (
        <div className="bg-muidark-4 mb-2 p-3 rounded-md w-72 shadow-lg" {...props} ref={props.innerRef}>
            <div  className="flex flex-nowrap items-center w-full">
                <Handle {...props.dragHandleProps}/> <h1 className="text-white font-sans whitespace-nowrap">{props.label} </h1>
                <span className="w-full justify-end flex"> 
                    <img className={`cursor-pointer h-5 opacity-50 hover:opacity-100  transition-transform transform ${open ? 'rotate-180' : 'rotate-0'}`} src="icons8-expand-arrow-26.png" onClick={() => {if(open){setAnimateOver(false)}; setOpen(!open); }} />
                    <img className="cursor-pointer h-5 opacity-50 hover:opacity-100 ml-3" src="icons8-delete-26.png" onClick={() => props.deleteSelf()} />
                </span>
            </div> 
            <div className={`bg-muidark-4 transition-max-height ${open ? 'max-h-96' : 'max-h-0'} overflow-hidden`} onAnimationEnd={() => setAnimateOver(true)}> 
            {open ? 
                <Fragment>
                    <div> xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx </div>
                    <div> xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx </div>
                    <div> xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx </div>
                    <div> xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx </div>
                    <div> xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx </div>
                    <div> xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx </div>
                    <div> xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx </div>
                    <div> xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx </div>
                </Fragment>
            : null }
            </div>
        </div>
    );
}

const LayerList = (props) => {
    return (
        <div {...props} ref={props.innerRef}> {props.children} </div>
    );
}

const LayersPanel = () => {

    const [layerData, setLayerData] = useState([
        {
            type: "UNSPLASH_QUERY",
            query: "colorful rainbow",
            label: "Colorful Rainbow",
            id: "1"
        },
        {
            type: "UNSPLASH_QUERY",
            query: "lightning",
            label: "Lightning",
            id: "2"
        },
        {
            type: "GRADIENT",
            query: "black",
            label: "Black",
            id: "3"
        }
    ])

    const onDragEnd = result => {
        const {destination, source} = result;

        if (!destination) {
            return;
        }

        if (destination.droppableId === source.droppableId && destination.index === source.index) {
            return;
        }

        // update array removing and readding layer to correct index.
        let layersTemp = [...layerData];
        let layerTemp = layersTemp.splice(source.index, 1)[0];
        layersTemp.splice(destination.index, 0, layerTemp);
        setLayerData(layersTemp);
    }

    const newLayer = {
        type: "UNSPLASH_QUERY",
        query: "test",
        label: "Test",
        id: "0"
    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            
            <div className="bg-muidark-2 p-3 m-4 rounded-md flex-1 flex-col justify-end items-center w-80 max-h-l-stack overflow-y-auto ">
                <h1 className="text-white bold text-center"> <b>Image Layer Stack</b></h1>
                <div  className="bg-muidark-5 mb-2 mt-2 p-2 rounded-md w-72 flex justify-center opacity-30 hover:opacity-100 cursor-pointer" onClick={() => {setLayerData([newLayer,...layerData])}} >
                    <img className="w-8 h-8r" src="icons8-add-image-48.png" /> 
                </div>
                <Droppable droppableId="1">
                    {provided => (
                        <LayerList innerRef={provided.innerRef} {...provided.droppableProps}>
                            {layerData.map((layer, index) => {
                                return (
                                    <Draggable draggableId={layer.id} index={index} key={layer.id}>
                                        {provided => (
                                            <Layer {...provided.draggableProps} dragHandleProps={provided.dragHandleProps} innerRef={provided.innerRef} label={layer.label} deleteSelf={() => {
                                                setLayerData(layerData.filter(l => l.id !== layer.id))
                                            }}/>
                                        )}
                                    </Draggable>
                                );
                            })}
                            {provided.placeholder}
                        </LayerList>
                    )}
                </Droppable>
            </div>
        </DragDropContext>
    );
}

export default LayersPanel;