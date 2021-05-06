import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import {
	DraggableProvidedDraggableProps,
	DraggableProvidedDragHandleProps,
} from 'react-beautiful-dnd';
import { ILayer } from '../../../types';
import LayerMenu from './LayerMenu';
import { randomGoodTerm } from '../../../utilities';

interface Props {
	draggableProps: DraggableProvidedDraggableProps;
	dragHandleProps?: DraggableProvidedDragHandleProps;
	innerRef: (element?: HTMLElement | null | undefined) => any;
	layer: ILayer;
	setOpacity: (amount: number) => void;
	setURL: (url: string) => void;
	setMode: (mode: string) => void;
	setEffect: (effect: string) => void;
	toggleEffectAnimate: () => void
	toggleOpacityAnimate: () => void
	setOpacityDuration: (duration: number) => void
	setEffectDuration: (duration: number) => void
	setEffectAmount: (effectAmount: number) => void;
	deleteSelf: () => void;
	duplicateLayer: (duplicatedQuery: string) => void;
}

const Layer: React.FC<Props> = (props) => {
	const [open, setOpen] = useState<boolean>(false);
	const [query, setQuery] = useState(props.layer.duplicatedQuery === '' ? randomGoodTerm() : props.layer.duplicatedQuery); //TODO: initialize to random cool image

	const updateURL = async () => {
		const response = await axios.get(
			`https://source.unsplash.com/featured/?${query.replaceAll(' ', '-')}`
		);
		props.setURL(response.request.responseURL);
	};

	useEffect(() => {
		// if the layer was duplicated, we don't want to refresh the url.
		if (props.layer.duplicatedQuery === '') {
			updateURL();
		}
	}, []);

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
			ref={props.innerRef}
			{...props.draggableProps}
		>
			<div className="flex flex-nowrap items-center w-full">
				<Handle {...props.dragHandleProps} />
				<h1 className="text-white font-sans whitespace-nowrap">{query}</h1>
				<span className="w-full justify-end flex">
					<img
						className="cursor-pointer h-5 opacity-50 hover:opacity-100 mr-3"
						src="icons8-duplicate-24.png"
						alt="duplicate layer"
						onClick={() => {
							props.duplicateLayer(query);
						}}
					/>
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
							props.deleteSelf();
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
						id={props.layer.id}
						opacity={props.layer.opacity}
						opacityDuration={props.layer.opacityDuration}
						opacityAnimate={props.layer.animateOpacity}
						mode={props.layer.mode}
						effect={props.layer.effect}
						effectAmount={props.layer.effectAmount}
						effectAnimate={props.layer.animateEffect}
						effectDuration={props.layer.effectDuration}
						updateURL={updateURL}
						setQuery={setQuery}
						setOpacity={props.setOpacity}
						toggleOpacityAnimate={props.toggleOpacityAnimate}
						setOpacityDuration={props.setOpacityDuration}
						setEffect={props.setEffect}
						setMode={props.setMode}
						setEffectAmount={props.setEffectAmount}
						setEffectDuration={props.setEffectDuration}
						toggleEffectAnimate={props.toggleEffectAnimate}
					/>
				) : null}
			</div>
		</div>
	);
};

export default Layer;
