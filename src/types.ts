export interface AbstractLayer {
	type: string;
	id: string;
}

export interface ILayer extends AbstractLayer {
	url: string;
	mode: string;
	effect: string;
	effectAmount: number;
  animation?: string;
	opacity: number;
}

export type LayersAction =
	| { type: 'UPDATE_LAYER_URL'; payload: { id: string; newURL: string } }
	| {
			type: 'UPDATE_LAYER_OPACITY';
			payload: { id: string; newOpacity: number };
	  }
	| { type: 'UPDATE_LAYER_QUERY'; payload: { id: string; newQuery: string } }
	| { type: 'UPDATE_LAYER_MODE'; payload: { id: string; newMode: string } }
	| { type: 'UPDATE_LAYER_EFFECT'; payload: { id: string; newEffect: string } }
	| { type: 'UPDATE_LAYER_ANIMATION'; payload: { id: string; newAnimation: string } }
	| {
			type: 'UPDATE_LAYER_EFFECT_AMOUNT';
			payload: { id: string; newAmount: number };
	  }
	| { type: 'MOVE_LAYER'; payload: { from: number; to: number } }
  | { type: 'NEW_LAYER' }
  | { type: 'DELETE_LAYER'; payload: { id: string } }
  | { type: 'SHUFFLE_ALL' }
  | { type: 'RANDOM_EFFECTS' }
  | { type: 'RANDOM_MODES' }
  | { type: 'RANDOM_TERMS' };
  
