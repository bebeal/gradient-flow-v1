import { getAttributes, makeSVGFromJSXPath } from "../SVG";

const BigSubtract = (width?: string, height?: string, fill?: string, stroke?: string, viewBox: string = '0 0 32 32') => {
  const attributes = getAttributes(width, height, fill, stroke);
  const path = (<g><polygon {...attributes} transform="matrix(1.5,0,0,1.5,-8,-8)" points="8 15 24 15 24 17 8 17"/><rect stroke="none" fill="none" width="32" height="32"/></g>);
  return makeSVGFromJSXPath(path, attributes, viewBox);
};

export default BigSubtract("", "");
