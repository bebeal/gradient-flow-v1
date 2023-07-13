import { getAttributes, makeSVGFromJSXPath } from "../SVG";

const ChevronUp = (width?: string, height?: string, fill?: string, stroke?: string, viewBox: string = '0 0 32 32') => {
  const attributes = getAttributes(width, height, fill, stroke);
  const path = (<g {...attributes}><polygon points="16,10 26,20 24.6,21.4 16,12.8 7.4,21.4 6,20 "/></g>);
  return makeSVGFromJSXPath(path, attributes, viewBox);
};

export default ChevronUp("", "");
