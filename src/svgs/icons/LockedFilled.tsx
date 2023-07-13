import { getAttributes, makeSVGFromJSXPath } from "../SVG";

const LockedFilled = (width?: string, height?: string, fill?: string, stroke?: string, viewBox: string = '0 0 32 32') => {
  const attributes = getAttributes(width, height, fill, stroke);
  const path = (<g {...attributes}><path d='M24 14h-2V8a6 6 0 0 0-12 0v6H8a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V16a2 2 0 0 0-2-2ZM12 8a4 4 0 0 1 8 0v6h-8Zm12 20H8V16h16Z'/><rect x="7" y="15" width="18" height="14" fillRule="evenodd" fill={fill} strokeOpacity="0" /></g>);
  return makeSVGFromJSXPath(path, attributes, viewBox);
};

export default LockedFilled("", "");
