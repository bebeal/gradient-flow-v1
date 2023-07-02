import { getAttributes, makeSVGFromJSXPath } from "../SVG";

const Copy = (width?: string, height?: string, fill: string = 'currentColor', stroke?: string, viewBox: string = '0 0 32 32') => {
  const attributes = getAttributes(width, height, fill, stroke);
  const path = (<g {...attributes}><path d='M28 10v18H10V10h18m0-2H10a2 2 0 0 0-2 2v18a2 2 0 0 0 2 2h18a2 2 0 0 0 2-2V10a2 2 0 0 0-2-2Z' /><path d='M4 18H2V4a2 2 0 0 1 2-2h14v2H4Z' /></g>);
  return makeSVGFromJSXPath(path, attributes, viewBox);
};

export default Copy("", "");
