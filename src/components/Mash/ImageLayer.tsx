import React from 'react';
import CSS from 'csstype';
import { ILayer } from '../../types';

interface Props {
	layerData: ILayer;
}

const ImageLayer: React.FC<Props> = ({ layerData }) => {
	const effectStr = () => {
		switch (layerData.effect) {
			case 'none':
				return 'none';
			case 'blur':
				return `blur(${layerData.effectAmount * 0.1}px)`;
			case 'brightness':
				return `brightness(${layerData.effectAmount * 2}%)`;
			case 'contrast':
				return `contrast(${layerData.effectAmount * 4}%)`;
			case 'hue-rotate':
				return `hue-rotate(${layerData.effectAmount * (360 / 100)}deg)`;
			case 'saturate':
				return `saturate(${layerData.effectAmount * 10}%)`;
			default:
				return `${layerData.effect}(${layerData.effectAmount}%)`;
		}
	};

	const svgFilter = () => {
		switch (layerData.effect) {
			case 'svg-displace':
				return (
					<feDisplacementMap
						in="SourceGraphic"
						in2="SourceGraphic"
						scale={`${layerData.effectAmount}`}
						xChannelSelector="R"
						yChannelSelector="B"
						x="0%"
						y="0%"
						width="100%"
						height="100%"
						result="displacementMap"
					>
						{layerData.animateEffect ? (
							<animate
								attributeName="scale"
								values="5; 50; 5"
								dur={`${layerData.effectDuration}s`}
								repeatCount="indefinite"
							/>
						) : null}
					</feDisplacementMap>
				);
			case 'svg-sobel':
				return (
					<feConvolveMatrix
						order="3 3"
						kernelMatrix={`${(-2 * layerData.effectAmount) / 50} ${
							(-4 * layerData.effectAmount) / 50
						} ${(-2 * layerData.effectAmount) / 50} 
               0 0 0 
               ${(2 * layerData.effectAmount) / 50} ${
							(4 * layerData.effectAmount) / 50
						} ${(2 * layerData.effectAmount) / 50}`}
						divisor="1"
						bias="1"
						targetX="0"
						targetY="0"
						edgeMode="duplicate"
						preserveAlpha="true"
						x="0%"
						y="0%"
						width="100%"
						height="100%"
						in="SourceImage"
						result="convolveMatrix1"
					>
						{layerData.animateEffect ? (
							<animate
								attributeName="kernelMatrix"
								values="-2 -4 -2 0 0 0 2 4 2; -2 0 2 -4 0 4 -2 0 2; -2 -4 -2 0 0 0 2 4 2"
								dur={`${layerData.effectDuration}s`}
								repeatCount="indefinite"
							/>
						) : null}
					</feConvolveMatrix>
				);

			case 'svg-waves':
				return (
					<>
						<feTurbulence
							type="turbulence"
							baseFrequency="0.02 0.05"
							numOctaves="3"
							seed="2"
							stitchTiles="noStitch"
							result="turbulence"
						/>
						<feDisplacementMap
							in="SourceGraphic"
							in2="turbulence"
							scale={`${layerData.effectAmount / 2}`}
							xChannelSelector="G"
							yChannelSelector="A"
							result="displacementMap"
						>
							{layerData.animateEffect ? (
								<animate
									attributeName="scale"
									values="-50; 50; -50"
									dur={`${layerData.effectDuration}s`}
									repeatCount="indefinite"
								/>
							) : null}
						</feDisplacementMap>
					</>
				);
      
      case 'svg-edge':
        const s = (layerData.effectAmount)/100
        return (
          <>
            <feConvolveMatrix
						order="5 5"
						kernelMatrix={`0 0 ${-1*s} 0 0   0 ${-1*s} ${-2*s} ${-1*s} 0   ${-1*s} ${-2*s} ${16*s} ${-2*s} ${-1*s}   0 ${-1*s} ${-2*s} ${-1*s} 0   0 0 ${-1*s} 0 0`}
						divisor="1"
						bias="1"
						targetX="0"
						targetY="0"
						edgeMode="duplicate"
						preserveAlpha="true"
						x="0%"
						y="0%"
						width="100%"
						height="100%"
						in="displacementMap"
						result="convolveMatrix1"
					>
            {layerData.animateEffect ? (
            <animate
								attributeName="kernelMatrix"
								values={`0 0 -1 0 0   0 -1 -2 -1 0   -1 -2 16 -2 -1   0 -1 -2 -1 0   0 0 -1 0 0; 
                         0 0 0 0 0   0 0 0 0 0   0 0 0 0 0   0 0 0 0 0   0 0 0 0 0;
                         0 0 -1 0 0   0 -1 -2 -1 0   -1 -2 16 -2 -1   0 -1 -2 -1 0   0 0 -1 0 0;`}
								dur={`${layerData.effectDuration}s`}
								repeatCount="indefinite"
						/>
            ) : null}

          </feConvolveMatrix>
          </>
        )

			default:
				return null;
		}
	};

	return (
		<>
			<svg width="0" height="0">
				<defs>
					<filter
						id={`filter-${layerData.id}`}
						colorInterpolationFilters="sRGB"
					>
						{svgFilter()}
					</filter>
				</defs>
			</svg>
			<img
				src={layerData.url}
				alt="layer icon"
				style={{
					width: '100%',
					height: '100%',
					objectFit: 'cover',
					position: 'inherit',
					opacity: `${layerData.opacity}%`,
					filter: layerData.effect.includes('svg') ? `url(#filter-${layerData.id})` : effectStr(),
					mixBlendMode: layerData.mode as CSS.Property.MixBlendMode,
					animation: layerData.animateEffect
						? `${layerData.effect} ${
								layerData.effectDuration ? layerData.effectDuration : 3
						  }s ease-in-out infinite`
						: 'none',
				}}
			/>
		</>
	);
};

export default ImageLayer;
