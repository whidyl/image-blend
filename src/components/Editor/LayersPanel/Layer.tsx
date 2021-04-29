import { useState } from "react";
import LayerMenu from './LayerMenu';

const Layer = (props: any) => {
  const [open, setOpen] = useState<boolean>(false);

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
      {...props}
      ref={props.innerRef}
    >
      <div className="flex flex-nowrap items-center w-full">
        <Handle {...props.dragHandleProps} />
        <h1 className="text-white font-sans whitespace-nowrap">
          {props.label}{" "}
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
            onClick={() => props.deleteSelf()}
          />
        </span>
      </div>
      <div className={`bg-muidark-4 transition-max-height overflow-hidden ${open ? "max-h-96" : "max-h-0"}`}>
        {open ? <LayerMenu /> : null}
      </div>
    </div>
  );
};

export default Layer;
