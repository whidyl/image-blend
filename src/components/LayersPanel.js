import React, { useState } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';


const Handle = (props) => {
    return <div className=" h-7 w-7 min-w-max mr-4 flex " {...props}> <img className="items-center opacity-50 hover:opacity-100" src="icons8-menu-24.png"/> </div>;
}

const Layer = (props) => {
    const [open, setOpen] = useState(false);
    return (
        <div className="bg-muidark-4 mb-2 p-3 rounded-md" {...props} ref={props.innerRef}>
            <div  className="flex flex-nowrap items-center w-full">
                <Handle {...props.dragHandleProps}/> <h1 className="text-white font-sans whitespace-nowrap">{props.label} </h1>
                <span className="w-full justify-end flex"><button onClick={() => {setOpen(!open)}}> \/ </button></span>
            </div> 
            {open ? <div className="bg-muidark-5 animate-dropdown"> testing</div> : null}
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

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="bg-muidark-2 p-3 m-4 rounded-md">
                <Droppable droppableId="1">
                    {provided => (
                        <LayerList innerRef={provided.innerRef} {...provided.droppableProps}>
                            {layerData.map((layer, index) => {
                                return (
                                    <Draggable draggableId={layer.id} index={index} key={layer.id}>
                                        {provided => (
                                            <Layer {...provided.draggableProps} dragHandleProps={provided.dragHandleProps} innerRef={provided.innerRef} label={layer.label} />
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