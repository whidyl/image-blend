import CSS from "csstype";

export interface Layer {
  type: string;
  id: string;
}

export interface ILayer extends Layer {
  query: string;
  url: string;
  mode: CSS.Property.MixBlendMode;
  opacity: number;
  needsFetch: boolean;
}
