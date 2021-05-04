import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import {
	DraggableProvidedDraggableProps,
	DraggableProvidedDragHandleProps,
} from 'react-beautiful-dnd';
import { ILayer } from '../../../types';
import LayerMenu from './LayerMenu';
import { randomGoodTerm } from '../../../utilities'

interface Props {
	draggableProps: DraggableProvidedDraggableProps;
	dragHandleProps?: DraggableProvidedDragHandleProps;
	innerRef: (element?: HTMLElement | null | undefined) => any;
	layer: ILayer;
	setOpacity: (amount: number) => void;
	setURL: (url: string) => void;
  setMode: (mode: string) => void;
  setAnimation: (animation: string) => void;
	setEffect: (effect: string) => void;
  setEffectAmount: (effectAmount: number) => void
	deleteSelf: () => void;
}

const Layer: React.FC<Props> = ({
	layer,
	draggableProps,
	dragHandleProps,
	innerRef,
	setOpacity,
  setMode,
	setEffect,
  setAnimation,
	setURL,
  setEffectAmount,
  deleteSelf,
}) => {
	const [open, setOpen] = useState<boolean>(false);
	const [query, setQuery] = useState(randomGoodTerm()); //TODO: initialize to random cool image

  const updateURL = async () => {
		const response = await axios.get(
			`https://source.unsplash.com/featured/?${query.replaceAll(' ', '-')}`
		);
		setURL(response.request.responseURL);
  }

  useEffect(() => {updateURL()}, []);

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
				<h1 className="text-white font-sans whitespace-nowrap">{query}</h1>
				<span className="w-full justify-end flex">
					<img
						className={`cursor-pointer h-5 opacity-50 hover:opacity-100  transition-transform transform ${
							open ? 'rotate-180' : 'rotate-0'
						}`}
						src="icons8-expand-arrow-26.png"
						alt="expand layer"
						onClick={() => setOpen(!open)}
					/>
					<img
						className="cursor-pointer h-5 opacity-50 hover:opacity-100 ml-3"
						src="icons8-delete-26.png"
						alt="delete layer"
						onClick={() => {
							deleteSelf()
						}}
					/>
				</span>
			</div>
			<div
				className={`bg-muidark-4 transition-max-height overflow-visible ${
					open ? 'max-h-96' : 'max-h-0'
				}`}
			>
				{open ? (
					<LayerMenu
						query={query}
						opacity={layer.opacity}
            effect={layer.effect}
            effectAmount={layer.effectAmount}
            updateURL={updateURL}
						setQuery={setQuery}
						setOpacity={setOpacity}
						setEffect={setEffect}
            setAnimation={setAnimation}
            setMode={setMode}
            setEffectAmount={setEffectAmount}
					/>
				) : null}
			</div>
		</div>
	);
};

export default Layer;
