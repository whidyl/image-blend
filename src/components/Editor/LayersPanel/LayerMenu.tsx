import React from 'react';
import ImgSearchBox from './ImgSearchBox';
import Selector from './Selector';
import Slider from './Slider';
import Toggle from './Toggle';

interface Props {
	query: string;
	opacity: number;
	id: string
  opacityDuration: number;
  opacityAnimate: boolean;
  mode: string
	effect: string;
	effectDuration: number;
  effectAnimate: boolean;
	effectAmount: number;
	updateURL: () => void;
	setQuery: (query: string) => void;
	setOpacity: (amount: number) => void;
	setOpacityDuration: (duration: number) => void;
	toggleOpacityAnimate: () => void;
	setMode: (mode: string) => void;
	setEffect: (effect: string) => void;
	toggleEffectAnimate: () => void;
	setEffectDuration: (duration: number) => void;
	setEffectAmount: (effectAmount: number) => void;
}

const effectOptions = [
	{
		label: 'None',
		value: 'none',
	},
	{
		label: 'Blur',
		value: 'blur',
	},
	{
		label: 'Brightness',
		value: 'brightness',
	},
	{
		label: 'Contrast',
		value: 'contrast',
	},
	{
		label: 'Grayscale',
		value: 'grayscale',
	},
	{
		label: 'Hue',
		value: 'hue-rotate',
	},
	{
		label: 'Invert',
		value: 'invert',
	},
	{
		label: 'Saturation',
		value: 'saturate',
	},
  {
		label: 'Displace',
		value: 'svg-displace',
	},
  {
		label: 'Sobel',
		value: 'svg-sobel',
	},
  {
    label: 'Waves',
    value: 'svg-waves'
  },
  {
    label: 'Edge Detect',
    value: 'svg-edge'
  }
];

const blendingOptions = [
	{
		label: 'Normal',
		value: 'normal',
	},
	{
		label: 'Multiply',
		value: 'multiply',
	},
	{
		label: 'Screen',
		value: 'screen',
	},
	{
		label: 'Overlay',
		value: 'overlay',
	},
	{
		label: 'Darken',
		value: 'darken',
	},
	{
		label: 'Lighten',
		value: 'lighten',
	},
	{
		label: 'Color Dodge',
		value: 'color-dodge',
	},
	{
		label: 'Color Burn',
		value: 'color-burn',
	},
	{
		label: 'Hard Light',
		value: 'hard-light',
	},
	{
		label: 'Soft Light',
		value: 'soft-light',
	},
	{
		label: 'Difference',
		value: 'difference',
	},
	{
		label: 'Exclusion',
		value: 'exclusion',
	},
	{
		label: 'Hue',
		value: 'hue',
	},
	{
		label: 'Saturation',
		value: 'saturation',
	},
	{
		label: 'Color',
		value: 'color',
	},
	{
		label: 'Luminosity',
		value: 'luminosity',
	},
];


const LayerMenu: React.FC<Props> = (props) => {
	return (
		<div className="h-auto flex flex-col flex-nowrap overflow-visible">
			<ImgSearchBox
				query={props.query}
				setQuery={props.setQuery}
				updateURL={props.updateURL}
			/>
			<Selector
				label="Modes"
				options={blendingOptions}
        current={props.mode}
				onSelectChange={(val) => props.setMode(val)}
			/>

			<hr className="bg-white opacity-30 mt-4 mb-4" />
			<Selector
				label="Effect"
				options={effectOptions}
        current={props.effect}
				onSelectChange={(val) => props.setEffect(val)}
			/>

      <div className="flex justify-start items-center">
        <label className="text-white font-medium ml-1 text-sm mr-2 mt-2">
          Amount:
        </label>
        <Slider
          val={props.effectAmount}
          setVal={props.setEffectAmount}
          classNames="ml-3 mt-2"
          disabled={props.effect === 'none' || props.effectAnimate}
        />
      </div>

			<div className="flex justify-around items-center mt-2">
				<Toggle toggle={() => props.toggleEffectAnimate()} value={props.effectAnimate} label="Animate" id={`1-${props.id}`}/>

				<label className="text-white text-sm font-medium mr-2">Time (s): </label>
				<input
					type="number"
					value={props.effectDuration}
					onChange={(e) =>
						props.setEffectDuration(Math.abs(parseFloat(e.target.value)))
					}
					className="px-2 py-2 w-9 basic-clickable bg-muidark-2"
				/>
			</div>

			<hr className="bg-white opacity-30 mt-4 mb-4" />

			<span className="mt-2 flex flex-row items-center">
				<label className="ml-1 mr-5 text-white text-sm font-medium">
					Opacity:
				</label>
				<Slider val={props.opacity} setVal={props.setOpacity} />
			</span>

			<div className="flex justify-around items-center mt-2">
				<Toggle toggle={() => props.toggleOpacityAnimate()} value={props.opacityAnimate} label="Animate" id={`2-${props.id}`}/>
				<label className="text-white text-sm font-medium mr-2">Time (s): </label>
				<input
					type="number"
					value={props.opacityDuration}
					onChange={(e) =>
						props.setOpacityDuration(Math.abs(parseFloat(e.target.value)))
					}
					className="px-2 py-2 w-9 basic-clickable bg-muidark-2"
				/>
			</div>
		</div>
	);
};

export default LayerMenu;
