import React, { MutableRefObject } from 'react'
import ImgSearchBox from './ImgSearchBox';
import Selector from './Selector';
import Slider from './Slider';

interface Props {
  query: string;
  opacity: number;
  effect: string;
  effectAmount: number;
  updateURL: () => void;
  setQuery: (query: string) => void;
  setOpacity: (amount: number) => void;
  setMode: (mode: string) => void
  setEffect: (effect: string) => void;
  setEffectAmount: (effectAmount: number) => void;
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

const blendingOptions = [
  {
    label: "Normal",
    value: 'normal'
  },
  {
    label: "Multiply",
    value: "multiply"
  },
  {
    label: "Screen",
    value: "screen"
  },
  {
    label: "Overlay",
    value: "overlay"
  },
  {
    label: "Darken",
    value: "darken"
  },
  {
    label: "Lighten",
    value: "lighten"
  },
  {
    label: "Color Dodge",
    value: "color-dodge"
  },
  {
    label: "Color Burn",
    value: "color-burn"
  },
  {
    label: "Hard Light",
    value: "hard-light"
  },
  {
    label: "Soft Light",
    value: "soft-light"
  },
  {
    label: "Difference",
    value: "difference"
  },
  {
    label: "Exclusion",
    value: "exclusion"
  },
  {
    label: "Hue",
    value: "hue"
  },
  {
    label: "Saturation",
    value: "saturation"
  },
  {
    label: "Color",
    value: "color"
  },
  {
    label: "Luminosity",
    value: "luminosity"
  },
]

const LayerMenu:React.FC<Props> = ({query, opacity, effect, effectAmount, setOpacity, setQuery, setMode, setEffect, setEffectAmount, updateURL}) => {

  return (
    <div className="h-auto flex flex-col flex-nowrap overflow-visible">
      <ImgSearchBox query={query} setQuery={setQuery} updateURL={updateURL} />
      <Selector label="Modes" options={blendingOptions} onSelectChange={(val) => setMode(val)} />
      <Selector label="Effects" options={effectOptions} onSelectChange={(val) => setEffect(val)}/>
      {effect !== "none" ? <Slider val={effectAmount} setVal={setEffectAmount} classNames="ml-20 mt-2 mr-2" /> : null}
      <span className="mt-2 flex flex-row items-center">
        <label className="ml-1 mr-6 text-white text-sm font-medium">
          Opacity:
        </label>
        <Slider val={opacity} setVal={setOpacity}/>
      </span>
      
    </div>
  );
};

export default LayerMenu;
