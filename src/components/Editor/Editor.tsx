import { useState, useEffect, useReducer } from 'react';
import LayersPanel from './LayersPanel/LayersPanel';
import Mash from '../Mash/Mash';
import Toolbar from './Toolbar';
import { AbstractLayer, ILayer, LayersAction } from '../../types';
import { v4 as uuidv4 } from 'uuid';

//TODO : useLayers hook
//TODO : duplicate layer



const initialLayers: { layers: ILayer[] } = {
	layers: [
		{
			type: 'IMAGE_SEARCH',
			mode: 'normal',
			effect: 'none',
			effectAmount: 100,
			url: '',
			opacity: 100,
			id: '1',
		},
		{
			type: 'IMAGE_SEARCH',
			mode: 'normal',
			effect: 'none',
			effectAmount: 100,
			opacity: 50,
			url: '',
			id: '2',
		},
		{
			type: 'IMAGE_SEARCH',
			mode: 'normal',
			effect: 'none',
			effectAmount: 100,
			opacity: 30,
			url: '',
			id: '3',
		},
	],
};

function layerReducer(
	state: { layers: AbstractLayer[] },
	action: LayersAction
) {
	switch (action.type) {
		case 'UPDATE_LAYER_URL':
			return {
				layers: [
					...state.layers.map((layer) =>
						layer.id === action.payload.id
							? { ...layer, url: action.payload.newURL }
							: layer
					),
				],
			};

		case 'UPDATE_LAYER_OPACITY':
			return {
				layers: [
					...state.layers.map((layer) =>
						layer.id === action.payload.id
							? { ...layer, opacity: action.payload.newOpacity }
							: layer
					),
				],
			};

		case 'UPDATE_LAYER_MODE':
			return {
				layers: [
					...state.layers.map((layer) =>
						layer.id === action.payload.id
							? { ...layer, mode: action.payload.newMode }
							: layer
					),
				],
			};

		case 'UPDATE_LAYER_EFFECT':
			return {
				layers: [
					...state.layers.map((layer) =>
						layer.id === action.payload.id
							? { ...layer, effect: action.payload.newEffect }
							: layer
					),
				],
			};

		case 'UPDATE_LAYER_EFFECT_AMOUNT':
			return {
				layers: [
					...state.layers.map((layer) =>
						layer.id === action.payload.id
							? { ...layer, effectAmount: action.payload.newAmount }
							: layer
					),
				],
			};

		case 'MOVE_LAYER':
			let layersTemp = [...state.layers];
			const layer = layersTemp.splice(action.payload.from, 1)[0];
			layersTemp.splice(action.payload.to, 0, layer);
			return { layers: layersTemp };

		case 'DELETE_LAYER':
			return {
				layers: [...state.layers].filter((l) => l.id != action.payload.id),
			};

		case 'NEW_LAYER':
			return {
				layers: [
					
					{
						type: 'IMAGE_SEARCH',
						query: "",
						mode: 'normal',
						effect: 'none',
						effectAmount: 75,
						url: '',
						opacity: 100,
						id: uuidv4(),
					}, ...state.layers
				],
			};

		default:
			return state;
	}
}

const Editor = () => {
	//const [layers, setLayers] = useState<AbstractLayer[]>(initialLayers);
	const [{ layers }, layersDispatch] = useReducer(layerReducer, initialLayers);

	const [mashSize, setMashSize] = useState<{ width?: number; height?: number }>(
		{ width: 1000, height: 500 }
	);

	return (
		<div className="bg-muidark w-full h-screen">
			<div className="flex h-full">
				<div className="z-10 w-96 ">
					<LayersPanel layers={layers} layersDispatch={layersDispatch} />
				</div>
				<div className="h-full w-full flex flex-col ">
					<div className="h-24 bg-muidark flex-initial z-10 ">
						<Toolbar mashSize={mashSize} setMashSize={setMashSize} />
					</div>
					<div className="p-20 bg-muidark relative flex-auto flex items-center justify-center z-0 overflow-y-auto overflow-x-auto">
						<Mash layers={layers} mashSize={mashSize} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Editor;
