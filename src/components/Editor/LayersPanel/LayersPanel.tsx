import React, { useState } from "react";
import Layer from "./Layer";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { AbstractLayer } from "../../../types"


interface Props {
  layers: AbstractLayer[];
  setLayerOpacity: (id: string, newOpacity: number) => void;
  moveLayer: (from: number, to: number) => void;
  
}

const LayersPanel: React.FC<Props> = ({ layers, setLayerOpacity, moveLayer}) => {
  const [layerData, setLayerData] = useState([
    {
      type: "UNSPLASH_QUERY",
      query: "colorful rainbow",
      label: "Colorful Rainbow ", 
      id: "1",
    },
    {
      type: "UNSPLASH_QUERY",
      query: "lightning",
      label: "Lightning",
      id: "2",
    },
    {
      type: "GRADIENT",
      query: "black",
      label: "Black",
      id: "3",
    },
  ]);

  const onDragEnd = (result: any) => {
    const { destination, source } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // update array removing and readding layer to correct index.
    moveLayer(source.index, destination.index);
  };

  const newLayer = {
    type: "UNSPLASH_QUERY",
    query: "test",
    label: "Test",
    id: "0",
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="bg-muidark-2 p-3 m-4 rounded-md flex-1 flex-col justify-end items-center w-80 max-h-l-stack overflow-y-auto ">
        <h1 className="text-white bold text-center">
          {" "}
          <b>Image Layer Stack</b>
        </h1>
        <div
          className="bg-muidark-5 mb-2 mt-2 p-2 rounded-md w-72 flex justify-center opacity-30 hover:opacity-100 cursor-pointer"
          onClick={() => {
            setLayerData([newLayer, ...layerData]);
          }}
        >
          <img className="w-8 h-8" src="icons8-add-image-48.png" alt="new layer" />
        </div>
        <Droppable droppableId="1">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {layers.map((layer, index) => {
                return (
                  <Draggable
                    draggableId={layer.id}
                    index={index}
                    key={layer.id}
                  >
                    {(provided) => (
                      <Layer
                        {...provided.draggableProps}
                        dragHandleProps={provided.dragHandleProps}
                        innerRef={provided.innerRef}
                        data={layer}
                        setOpacity={(amount: number) => setLayerOpacity(layer.id, amount)}
                        deleteSelf={() => {
                          setLayerData(
                            layerData.filter((l) => l.id !== layer.id)
                          );
                        }}
                      />
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </DragDropContext>
  );
};

export default LayersPanel;
