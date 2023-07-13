import { getAttributes, makeSVGFromJSXPath } from "../SVG";

const ColoredPencil = (width?: string, height?: string, fill?: string, stroke?: string, viewBox: string = '0 0 32 32') => {
  const attributes = getAttributes(width, height, fill, stroke);
  const path = (<g {...attributes}><path d="m27.345 11.636c0.87273-0.87273 0.87273-2.1818 0-3.0545l-3.9273-3.9273c-0.87273-0.87273-2.1818-0.87273-3.0545 0l-16.364 16.364v6.9818h6.9818zm-5.4545-5.4545 3.9273 3.9273-3.2727 3.2727-3.9273-3.9273zm-15.709 19.636v-3.9273l10.909-10.909 3.9273 3.9273-10.909 10.909z"/></g>);
  return makeSVGFromJSXPath(path, attributes, viewBox);
};

export default ColoredPencil("", "", 'currentColor');
