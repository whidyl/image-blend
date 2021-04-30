import CSS from "csstype";

export interface AbstractLayer {
  type: string;
  id: string;
}

export interface ILayer extends AbstractLayer {
  query: string;
  url: string;
  mode: CSS.Property.MixBlendMode;
  opacity: number;
}
