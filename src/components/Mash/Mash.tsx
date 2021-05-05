import React from 'react';
import ImageLayer from './ImageLayer';
import '../../animations.css';
import { AbstractLayer, ILayer } from '../../types';

//! visualize layer stack with 3D

interface Props {
	layers: AbstractLayer[];
	mashSize: { width?: number; height?: number };
}

const Mash: React.FC<Props> = ({ layers, mashSize }) => {
	let renderedLayers = () =>
		layers
			.slice(0)
			.reverse()
			.map((layer) => {
				if (layer.type === 'IMAGE_SEARCH') {
					let imgLayer = layer as ILayer;
					return <ImageLayer key={imgLayer.id} layerData={imgLayer} />;
				} else {
					return null;
				}
			});

	return (
		<div
			style={{
				width: `${mashSize.width}px`,
				height: `${mashSize.height}px`,
				position: 'absolute',
				display: 'inline-block',
        overflow: 'hidden'
			}}
		>
			<svg id="svg-filter" width="0" height="0">
				<defs>
					<filter id="extruede">
						<feMorphology
							operator="extrude"
							radius="3"
							x="0%"
							y="0%"
							in="SourceGraphic"
							result="morphology"
						>
						</feMorphology>
					</filter>

          <filter id="dilate">
						<feMorphology
							operator="dilate"
							radius="3"
							x="0%"
							y="0%"
							in="SourceGraphic"
							result="morphology"
						>
						</feMorphology>
					</filter>
				</defs>
			</svg>

			{renderedLayers()}
		</div>
	);
};

export default Mash;
