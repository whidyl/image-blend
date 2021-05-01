import React, { Dispatch, useState } from 'react';
import Layer from './Layer';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { AbstractLayer, ILayer, LayersAction } from '../../../types';

// ! range slider that allows for setting the start and stop of animations.

interface Props {
	layers: AbstractLayer[];
	layersDispatch: Dispatch<LayersAction>;
}

const LayersPanel: React.FC<Props> = ({ layers, layersDispatch }) => {

	const onDragEnd = (result: any) => {
		const { destination, source } = result;

		if (!destination) {
			return;
		}

		if (
			destination.droppableId === source.droppableId &&
			destination.index === source.index
		) {
			return;
		}

    console.log("move layer dispatched")
		layersDispatch({ type: 'MOVE_LAYER', payload: { from: source.index, to: destination.index } });
	};

	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<div className="bg-muidark-2 p-3 m-4 rounded-md flex-1 flex-col justify-end items-center w-80 max-h-l-stack overflow-y-auto ">
				<h1 className="text-white bold text-center">
					{' '}
					<b>Image Layer Stack</b>
				</h1>
				<div
					className="bg-muidark-5 mb-2 mt-2 p-2 rounded-md w-72 flex justify-center opacity-30 hover:opacity-100 cursor-pointer"
					onClick={() => {
						//TODO: ADD_LAYER
					}}
				>
					<img
						className="w-8 h-8"
						src="icons8-add-image-48.png"
						alt="new layer"
					/>
				</div>
				<Droppable droppableId="1">
					{(provided) => (
						<div {...provided.droppableProps} ref={provided.innerRef}>
							{layers.map((layer, index) => {
								return (
									<Draggable
										draggableId={layer.id}
										index={index}
										key={layer.id}
									>
										{(provided) => (
                      // TODO: ILayer or TLayer depending on type
											<Layer
												draggableProps={provided.draggableProps}
												dragHandleProps={provided.dragHandleProps}
												innerRef={provided.innerRef}
												layer={layers.find(l => l.id === layer.id) as ILayer}
												setOpacity={(amount: number) =>
													layersDispatch({ type: "UPDATE_LAYER_OPACITY", payload: { id: layer.id, newOpacity: amount } })
												}
												setURL={(url: string) =>
													layersDispatch({ type: "UPDATE_LAYER_URL", payload: {id: layer.id, newURL: url} })
												}
												deleteSelf={() => {
													// TODO: delete dispatch
												}}
											/>
										)}
									</Draggable>
								);
							})}
							{provided.placeholder}
						</div>
					)}
				</Droppable>
			</div>
		</DragDropContext>
	);
};

export default LayersPanel;
