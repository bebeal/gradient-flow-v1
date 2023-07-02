import { getAttributes, makeSVGFromJSXPath } from "../SVG";

const BigAdd = (width?: string, height?: string, fill?: string, stroke?: string, viewBox: string = '0 0 32 32') => {
  const attributes = getAttributes(width, height, fill, stroke);
  const path = (<g><polygon {...attributes} transform="matrix(1.5,0,0,1.5,-8,-8)" points="8 15 8 17 15 17 15 24 17 24 17 17 24 17 24 15 17 15 17 8 15 8 15 15"/><rect stroke="none" fill="none" width="32" height="32"/></g>);
  return makeSVGFromJSXPath(path, attributes, viewBox);
};

export default BigAdd("", "");
