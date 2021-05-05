import { AbstractLayer, ILayer, LayersAction } from '../types';
import { randomEffect, randomMode } from '../utilities';
import { v4 as uuidv4 } from 'uuid';
import { useReducer } from 'react';

function layerReducer(
	state: { layers: (AbstractLayer | ILayer)[] },
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
					},
					...state.layers,
				],
			};

		case 'DUPLICATE_LAYER':
			let dupe = state.layers.find((l) => l.id === action.payload.id);
			return {
				layers: [...state.layers, { ...(dupe as AbstractLayer), id: uuidv4() }],
			};

		case 'RANDOM_MODES':
			return {
				layers: [...state.layers].map((layer) => ({
					...layer,
					mode: randomMode(),
				})),
			};

		case 'RANDOM_EFFECTS':
			return {
				layers: [...state.layers].map((layer) => ({
					...layer,
					effect: randomEffect(),
				})),
			};

		default:
			return state;
	}
}

const useLayers = (initialState: { layers: AbstractLayer[]} ): [AbstractLayer[], (action: LayersAction) => void] => {
	const [{ layers }, dispatch] = useReducer(layerReducer, initialState);
    
	return [layers, dispatch];
};

export default useLayers;
