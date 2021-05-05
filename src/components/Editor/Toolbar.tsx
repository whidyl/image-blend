import React, { useState } from "react";
var FileSaver = require('file-saver');
var domtoimage = require('dom-to-image');
//TODO: export via codepen API
//TODO: load examples

const TBDropdown: React.FC = () => {
  const [open, setOpen] = useState(false);

  const Arrow = () => (
    <svg
      className="-mr-1 ml-2 h-5 w-5"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        fill-rule="evenodd"
        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
        clip-rule="evenodd"
      />
    </svg>
  );

  const DropdownContent = () => (
    <div
      className={`mt-2 w-56 origin-top-right absolute right-0 rounded-md shadow-lg bg-muidark-5`}
      role="menu"
      aria-orientation="vertical"
      aria-labelledby="menu-button"
    >
      <div className="py-1" role="none">
        <a
          href="/"
          onClick={(e) => {e.preventDefault(); domtoimage.toBlob(document.querySelector("#mash")).then((blob: any) => FileSaver.saveAs(blob, 'myblend.png'))}}
          className="px-4 py-2 text-white text-sm block "
          role="menuitem"
          id="menu-item-0"
        >
          Export PNG
        </a>
        <a
          href="/"
          className="px-4 py-2 text-white text-sm block"
          role="menuitem"
          id="menu-item-1"
        >
          Support
        </a>
        <a
          href="/"
          className="px-4 py-2 text-white text-sm block"
          role="menuitem"
          id="menu-item-2"
        >
          License
        </a>
        <form method="POST" action="#" role="none">
          <button
            type="submit"
            className="px-4 py-2 w-full text-white text-left text-sm block"
            role="menuitem"
            id="menu-item-3"
          >
            Sign out
          </button>
        </form>
      </div>
    </div>
  );

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          className="px-4 py-2 w-full text-sm font-medium text-white bg-muidark-4 rounded-md shadow-lg  inline-flex justify-center hover:bg-muidark-5 default-focus-ring"
          onClick={() => setOpen(!open)}
          id="menu-button"
          aria-expanded="true"
          aria-haspopup="true"
        >
          Finalize
          <Arrow />
        </button>
      </div>
      {open ? <DropdownContent /> : null }
    </div>
  );
};

interface Props {
  mashSize: { width?: number, height?: number};
  setMashSize: (newState: {width?: number, height?: number}) => void;
  randomizeModes: () => void;
  randomizeEffects: () => void;
  randomizeEverything: () => void;
}

const Toolbar: React.FC<Props> = ({ mashSize, setMashSize, randomizeEverything, randomizeModes, randomizeEffects }) => {
  return (
    <div className="flex justify-evenly flex-shrink">
      <div className="p-3 mt-4 mr-4 w-full max-w-screen-lg bg-muidark-2 rounded-md flex items-center justify-around">
        <span>
          <label className="pl-1 pr-3 text-white text-sm font-medium">
            Width:
          </label>
          <input
            type="number"
            value={mashSize.width}
            onChange={(e) => setMashSize({ width: parseInt(e.target.value) })}
            className="px-2 py-2 w-16 basic-clickable"
          />
        </span>
        <span>
          <label className="pl-3 pr-3 text-white text-sm font-medium">
            Height:
          </label>
          <input
            type="number"
            value={mashSize.height}
            onChange={(e) => setMashSize({ height: parseInt(e.target.value) })}
            className="px-2 py-2 w-16 basic-clickable"
          />
        </span>

        <h1 className="mr-1 ml-1 text-white opacity-20">|</h1>

        <label className="pl-3 pr-3 text-white text-sm font-medium">
          Randomize:
        </label>

        <button className="px-4 py-2 ml-1 mr-1 basic-clickable" onClick={() => randomizeModes()}> Modes </button>
        <button className="px-4 py-2 ml-1 mr-1 basic-clickable" onClick={() => randomizeEffects()}> Effects </button>
        <button className="px-4 py-2 ml-1 mr-1 basic-clickable" onClick={() => randomizeEverything()}> Everything! </button>

        <h1 className="mr-1 ml-1 text-white opacity-20">|</h1>

        <TBDropdown />
      </div>
    </div>
  );
};

export default Toolbar;
