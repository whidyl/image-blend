import React, { useEffect } from 'react'
import ImgSearchBox from './ImgSearchBox';
import Selector from './Selector';

interface Props {
  query: string;
  opacity: number;
  setQuery: (query: string) => void;
  setOpacity: (amount: number) => void;
  setURL: (url: string) => void;
}

const effectOptions = [
  {
    label: "None",
    value: "none"
  },
  {
    label: "Blur",
    value: "blur"
  },
  {
    label: "Brightness",
    value: "brightness"
  },
  {
    label: "Contrast",
    value: "contrast"
  },
  {
    label: "Grayscale",
    value: "grayscale"
  },
  {
    label: "Hue",
    value: "hue-rotate"
  },
  {
    label: "Invert",
    value: "invert"
  },
  {
    label: "Saturation",
    value: "saturate"
  },
]

const LayerMenu:React.FC<Props> = ({query, opacity, setOpacity, setQuery, setURL}) => {

  return (
    <div className="h-auto flex flex-col flex-nowrap overflow-visible">
      <ImgSearchBox query={query} setQuery={setQuery} setURL={setURL} />
      <span className="mt-2 flex flex-row items-center">
        <label className="ml-1 mr-7 text-white text-sm font-medium">
          Effects:
        </label>
        <div className="relative flex">
          <svg
            className="w-2 h-2 m-4 absolute top-0 right-0 pointer-events-none"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 412 232"
          >
            <path
              d="M206 171.144L42.678 7.822c-9.763-9.763-25.592-9.763-35.355 0-9.763 9.764-9.763 25.592 0 35.355l181 181c4.88 4.882 11.279 7.323 17.677 7.323s12.796-2.441 17.678-7.322l181-181c9.763-9.764 9.763-25.592 0-35.355-9.763-9.763-25.592-9.763-35.355 0L206 171.144z"
              fill="#818181"
              fill-rule="nonzero"
            />
          </svg>
          <select className="h-8 pl-2 pr-1 pt-1 w-44 rounded-md text-sm text-white font-medium text-opacity-30 bg-muidark-2 focus:outline-none appearance-none">
            <option>No effect</option>
            <option>Blur</option>
            <option>Brightness</option>
            <option>Contrast</option>
            <option>Grayscale</option>
            <option>Hue</option>
            <option>Invert</option>
            <option>Saturate</option>
          </select>
        </div>
      </span>
      <span className="mt-3 flex flex-row items-center">
        <label className="ml-1 mr-4 text-white text-sm font-medium">
          Blending:
        </label>
        <div className="relative flex">
          <svg
            className="w-2 h-2 m-4 absolute top-0 right-0 pointer-events-none"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 412 232"
          >
            <path
              d="M206 171.144L42.678 7.822c-9.763-9.763-25.592-9.763-35.355 0-9.763 9.764-9.763 25.592 0 35.355l181 181c4.88 4.882 11.279 7.323 17.677 7.323s12.796-2.441 17.678-7.322l181-181c9.763-9.764 9.763-25.592 0-35.355-9.763-9.763-25.592-9.763-35.355 0L206 171.144z"
              fill="#818181"
              fill-rule="nonzero"
            />
          </svg>
          <select className="h-8 pl-2 pr-1 pt-1 w-44 rounded-md text-sm text-white font-medium text-opacity-30 bg-muidark-2 focus:outline-none appearance-none">
            <option>Normal</option>
            <option>Multiply</option>
            <option>Screen</option>
            <option>Overlay</option>
            <option>Darken</option>
            <option>Lighten</option>
            <option>Color Dodge</option>
            <option>Color Burn</option>
            <option>Hard Light</option>
            <option>Soft Light</option>
            <option>Difference</option>
            <option>Exclusion</option>
            <option>Hue</option>
            <option>Saturation</option>
            <option>Color</option>
            <option>Luminosity</option>
          </select>
        </div>
      </span>
      <Selector options={effectOptions}/>
      <span className="mt-2 flex flex-row items-center">
        <label className="ml-1 mr-6 text-white text-sm font-medium">
          Opacity:
        </label>
        <input
          className="mr-1 rounded-lg overflow-hidden appearance-none bg-muidark-2 h-3 w-auto flex-grow"
          type="range"
          min="1"
          max="100"
          step="1"
          value={opacity}
          onChange={e => setOpacity(parseInt(e.target.value))}
        />
      </span>
      
    </div>
  );
};

export default LayerMenu;
