import { getAttributes, makeSVGFromJSXPath } from "../SVG";

const ChevronDown = (width?: string, height?: string, fill?: string, stroke?: string, viewBox: string = '0 0 32 32') => {
  const attributes = getAttributes(width, height, fill, stroke);
  const path = (<g><polygon {...attributes} points="16,22 6,12 7.4,10.6 16,19.2 24.6,10.6 26,12 "/></g>);
  return makeSVGFromJSXPath(path, attributes, viewBox);
};

export default ChevronDown("", "");
