import { useState } from "react";
import { DraggableProvidedDraggableProps, DraggableProvidedDragHandleProps } from "react-beautiful-dnd";
import { ILayer } from "../../../types";
import LayerMenu from './LayerMenu';

interface Props {
  draggableProps: DraggableProvidedDraggableProps;
  dragHandleProps?: DraggableProvidedDragHandleProps;
  innerRef: (element?: HTMLElement | null | undefined) => any;
  layer: ILayer;
  setOpacity: (amount: number) => void;
  setURL: (url: string) => void;
  deleteSelf: () => void;
}

const Layer: React.FC<Props> = ({layer, draggableProps, dragHandleProps, innerRef, setOpacity, setURL }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [query, setQuery] = useState(''); //TODO: initialize to random cool image

  const Handle = (props: any) => {
    return (
      <div className="h-7 w-7 min-w-max mr-4 flex no-flick " {...props}>
        <img
          className="h-7 w-7  no-flick items-center opacity-50 hover:opacity-100"
          src="icons8-menu-24.png"
          alt="drag layer"
        />
      </div>
    );
  };

  return (
    <div
      className="bg-muidark-4 mb-2 p-3 rounded-md w-72 shadow-lg no-flick"
      ref={innerRef}
      {...draggableProps}
    >
      <div className="flex flex-nowrap items-center w-full">
        <Handle {...dragHandleProps} />
        <h1 className="text-white font-sans whitespace-nowrap">
          {query}
        </h1>
        <span className="w-full justify-end flex">
          <img
            className={`cursor-pointer h-5 opacity-50 hover:opacity-100  transition-transform transform ${open ? "rotate-180" : "rotate-0"}`}
            src="icons8-expand-arrow-26.png"
            alt="expand layer"
            onClick={() => setOpen(!open)}
          />
          <img
            className="cursor-pointer h-5 opacity-50 hover:opacity-100 ml-3"
            src="icons8-delete-26.png"
            alt="delete layer"
            onClick={() => {/* TODO: delete self */}}
          />
        </span>
      </div>
      <div className={`bg-muidark-4 transition-max-height overflow-visible ${open ? "max-h-96" : "max-h-0"}`}>
        {open ? <LayerMenu query={query} opacity={layer.opacity} setQuery={setQuery} setOpacity={setOpacity} setURL={setURL} /> : null}
      </div>
    </div>
  );
};

export default Layer;
