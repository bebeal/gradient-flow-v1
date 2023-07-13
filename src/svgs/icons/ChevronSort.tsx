import { getAttributes, makeSVGFromJSXPath } from "../SVG";

const ChevronSort = (width?: string, height?: string, fill: string = 'currentColor', stroke?: string, viewBox: string = '0 0 32 32') => {
  const attributes = getAttributes(width, height, fill, stroke);
  const path = (<g><path strokeWidth={"2"} {...attributes} d='m16 28l-7-7l1.41-1.41L16 25.17l5.59-5.58L23 21l-7 7zm0-24l7 7l-1.41 1.41L16 6.83l-5.59 5.58L9 11l7-7z'/></g>);
  return makeSVGFromJSXPath(path, attributes, viewBox);
};

export default ChevronSort("", "");
