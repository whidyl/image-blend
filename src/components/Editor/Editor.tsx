import { useState, useReducer } from 'react';
import LayersPanel from './LayersPanel/LayersPanel';
import Mash from '../Mash/Mash';
import Toolbar from './Toolbar';
import { AbstractLayer, ILayer, LayersAction } from '../../types';

import { randomEffect, randomMode } from '../../utilities';
import useLayers from '../../hooks/useLayers';

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



const Editor = () => {

	const [layers, layersDispatch] = useLayers(initialLayers)

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
						<Toolbar
							mashSize={mashSize}
							setMashSize={setMashSize}
							randomizeModes={() => layersDispatch({ type: 'RANDOM_MODES' })}
							randomizeEffects={() =>
								layersDispatch({ type: 'RANDOM_EFFECTS' })
							}
						/>
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
