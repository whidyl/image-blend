import { useState, useEffect, useReducer } from 'react';
import LayersPanel from './LayersPanel/LayersPanel';
import Mash from '../Mash/Mash';
import Toolbar from './Toolbar';
import { AbstractLayer, ILayer, LayersAction } from '../../types';
import axios from 'axios';

const initialLayers: { layers: ILayer[] } = {
	layers: [
		{
			type: 'IMAGE_SEARCH',
			query: 'colorful rainbow',
			mode: 'normal',
			url: 'https://source.unsplash.com/random/?boobs',
			opacity: 100,
			id: '1',
		},
		{
			type: 'IMAGE_SEARCH',
			query: 'lightning',
			mode: 'difference',
			opacity: 50,
			url: 'https://source.unsplash.com/random/?girls',
			id: '2',
		},
		{
			type: 'IMAGE_SEARCH',
			query: 'black',
			mode: 'multiply',
			opacity: 50,
			url: '',
			id: '3',
		},
	],
};

function layerReducer(state: { layers: AbstractLayer[] }, action: LayersAction) {
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

		case 'MOVE_LAYER':
			const layer = state.layers.splice(action.payload.from, 1)[0];
			state.layers.splice(action.payload.to, 0, layer);
			return state;

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

	// useEffect(() => {
	// 	for (const layer of layers) {
	// 		if (layer.type === 'IMAGE_SEARCH') {
	// 			const imgLayer = layer as ILayer;
	// 			refreshURL(imgLayer.id, imgLayer.query);
	// 		}
	// 	}
	// 	// eslint-disable-next-line react-hooks/exhaustive-deps
	// }, []);

	const refreshURL = (layerID: string, query: string) => {
		//TODO: set warning message on layer for bad request
		//TODO: this should live inside a LayerMenu useEffect.

		const fetchURL = async () => {
			const response = await axios.get(
				`https://source.unsplash.com/random/?${query.replaceAll(' ', '-')}`
			);
			//setLayerURL(layerID, response.request.responseURL);
		};

		fetchURL();
	};

	// const setLayerOpacity = (id: string, newOpacity: number) => {
	// 	setLayers((prev) =>
	// 		prev.map((layer) => {
	// 			if (layer.id === id) {
	// 				return { ...layer, opacity: newOpacity };
	// 			} else {
	// 				return layer;
	// 			}
	// 		})
	// 	);
	// };

	// const setLayerURL = (id: string, newURL: string) => {
	// 	setLayers((prev) =>
	// 		prev.map((layer) => {
	// 			if (layer.id === id) {
	// 				return { ...layer, url: newURL };
	// 			} else {
	// 				return layer;
	// 			}
	// 		})
	// 	);
	// };

	// const setLayerQuery = (id: string, newQuery: string) => {
	// 	setLayers((prev) =>
	// 		prev.map((layer) => {
	// 			if (layer.id === id) {
	// 				return { ...layer, query: newQuery };
	// 			} else {
	// 				return layer;
	// 			}
	// 		})
	// 	);
	// };

	// const moveLayer = (from: number, to: number) => {
	// 	let layersTemp = [...layers];
	// 	let layerTemp = layersTemp.splice(from, 1)[0];
	// 	layersTemp.splice(to, 0, layerTemp);
	// 	setLayers(layersTemp);
	// };

	return (
		<div className="bg-muidark w-full h-screen">
			<div className="flex h-full">
				<div className="z-10 w-96 ">
					<LayersPanel
						layers={layers}
            layersDispatch={layersDispatch}
					/>
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
