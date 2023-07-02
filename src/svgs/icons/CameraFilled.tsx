import { getAttributes, makeSVGFromJSXPath } from "../SVG";

const CameraFilled = (width?: string, height?: string, fill?: string, stroke?: string, viewBox: string = '0 -2 20 20') => {
  const attributes = getAttributes(width, height, fill, stroke);
  const path = (<g><circle {...attributes} cx="10" cy="9" r="2"/> <path fill={fill} d="m18 3h-3.2793l-0.5439-1.6328a1.9983 1.9983 0 0 0-1.8975-1.3672h-4.5586a1.9981 1.9981 0 0 0-1.8975 1.3677l-0.5439 1.6323h-3.2793a2.0023 2.0023 0 0 0-2 2v9a2.0023 2.0023 0 0 0 2 2h16a2.0023 2.0023 0 0 0 2-2v-9a2.0023 2.0023 0 0 0-2-2zm-8 10a4 4 0 1 1 4-4 4.0045 4.0045 0 0 1-4 4z"/> <path id="inner-path" style={{fill: "transparent"}} d="m10 13a4 4 0 1 1 4-4 4.0045 4.0045 0 0 1-4 4zm0-6a2 2 0 1 0 2 2 2.0021 2.0021 0 0 0-2-2z"/></g>);
  return makeSVGFromJSXPath(path, attributes, viewBox);
};

export default CameraFilled("", "");
