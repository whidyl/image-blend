import { useState, useReducer } from 'react';
import LayersPanel from './LayersPanel/LayersPanel';
import Mash from '../Mash/Mash';
import Toolbar from './Toolbar';
import { AbstractLayer, ILayer, LayersAction } from '../../types';
import { v4 as uuidv4 } from 'uuid';
import { randomEffect, randomMode } from '../../utilities'

//TODO : useLayers hook
//TODO : duplicate layer

const initialLayers: { layers: ILayer[] } = {
	layers: [
		{
			id: '1',
			type: 'IMAGE_SEARCH',
			mode: 'normal',
			effect: 'none',
			effectAmount: 100,
			animateEffect: false,
			effectDuration: 3,
			url: '',
			opacity: 100,
			animateOpacity: false,
			opacityDuration: 3,
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
		
		case 'TOGGLE_LAYER_OPACITY_ANIMATE':
			return {
				layers: [
					...(state.layers as ILayer[]).map((layer) =>
						layer.id === action.payload.id
							? { ...layer, animateOpacity: !layer.animateOpacity }
							: layer
					),
				],
			};
		
		case 'UPDATE_LAYER_OPACITY_DURATION':
			return {
				layers: [
					...state.layers.map((layer) =>
						layer.id === action.payload.id
							? { ...layer, opacityDuration: action.payload.newDuration }
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

		case 'TOGGLE_LAYER_EFFECT_ANIMATE':
			return {
				layers: [
					...(state.layers as ILayer[]).map((layer) =>
						layer.id === action.payload.id
							? { ...layer, animateEffect: !layer.animateEffect }
							: layer
					),
				],
			};
		
		case 'UPDATE_LAYER_EFFECT_DURATION':
			return {
				layers: [
					...state.layers.map((layer) =>
						layer.id === action.payload.id
							? { ...layer, effectDuration: action.payload.newDuration }
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
				layers: [...state.layers].filter((l) => l.id !== action.payload.id),
			};

		case 'NEW_LAYER':
			return {
				layers: [
					
					{
						type: 'IMAGE_SEARCH',
						mode: 'normal',
						effect: 'none',
						effectAmount: 75,
						url: '',
						opacity: 100,
						id: uuidv4(),
					}, ...state.layers
				],
			};

		case 'RANDOM_MODES':
			return {
				layers: [...state.layers].map(layer => ({...layer, mode: randomMode()}))
			}
		
		case 'RANDOM_EFFECTS':
			return {
				layers: [...state.layers].map(layer => ({...layer, effect: randomEffect()}))
			}
		
		default:
			return state;
	}
}

const Editor = () => {
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
						<Toolbar mashSize={mashSize} setMashSize={setMashSize} randomizeModes={() => layersDispatch({type: "RANDOM_MODES"})} randomizeEffects={() => layersDispatch({type: "RANDOM_EFFECTS"})}/>
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
