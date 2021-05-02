import CSS from "csstype";

export interface AbstractLayer {
  type: string;
  id: string;
}

export interface ILayer extends AbstractLayer {
  query: string;
  url: string;
  mode: CSS.Property.MixBlendMode;
  effect: string;
  effectAmount: number;
  opacity: number;
}

export type LayersAction =
	| { type: 'UPDATE_LAYER_URL'; payload: { id: string; newURL: string } }
	| { type: 'UPDATE_LAYER_OPACITY'; payload: { id: string; newOpacity: number } }
	| { type: 'UPDATE_LAYER_QUERY'; payload: { id: string; newQuery: string } }
  | { type: 'UPDATE_LAYER_EFFECT'; payload: { id: string; newEffect: string } }
  | { type: 'UPDATE_LAYER_EFFECT_AMOUNT'; payload: { id: string; newAmount: number } }
	| { type: 'MOVE_LAYER'; payload: { from: number; to: number } };