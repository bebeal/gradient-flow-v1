import React, { FunctionComponent } from "react";
import { Dark } from "../themes";

// ------------------------------------------------------------------------
// For SVGs in JS:
// ------------------------------------------------------------------------
export const makeSVGFromJSXPath = (path: any, attributes?: any, viewBox: string = '0 0 32 32') => {
  return (<svg {...attributes} viewBox={viewBox}>{path}</svg>);
};

export const makeSVGFromJSXPathWithTheme = (path: any, theme: any = Dark, viewBox: string = '0 0 32 32') => {
  const attributes = getAttributesFromTheme(theme);
  return makeSVGFromJSXPath(path, attributes, viewBox);
};

// ------------------------------------------------------------------------
// For SVGs in files:
// ------------------------------------------------------------------------
// import { ReactComponent as MySvg1 } from './my-svg-file-1.svg';

export interface SVGIconComponents {
  [key: string]: FunctionComponent<SVGProps>
}

export const SVGIcons: SVGIconComponents = {
  // Add your SVGs here...
  // MySvg1,
}

export interface StaticSVGProps {
  width?: string;
  height?: string;
  fill?: string;
  stroke?: string;
  viewBox?: string;
}

export const getAttributes = (width?: string, height?: string, fill?: string, stroke?: string, viewBox?: string) => {
  const attributes: StaticSVGProps = {};
  if (width && width.length > 0) { attributes.width = width; }
  if (height && height.length > 0) { attributes.height = height; }
  if (fill && fill.length > 0) { attributes.fill = fill; }
  if (stroke && stroke.length > 0) { attributes.stroke = stroke; }
  if (viewBox && viewBox.length > 0) { attributes.viewBox = viewBox; }
  return attributes;
};

export const getAttributesFromTheme = (theme: any) => {
  return{ fill: theme.color, stroke: theme.background, };
}

export const getStaticSVGAttributes = (props: StaticSVGProps) => {
  const { width, height, fill, stroke } = props;
  return getAttributes(width, height, fill, stroke);
};

export interface SVGProps extends StaticSVGProps {
  path: string;
  viewBox?: string;
  theme?: any;
};

const SVG = (props: SVGProps) => {
  const { theme=Dark, path='', width='', height='', fill = 'currentColor', stroke = 'none', viewBox = '0 0 32 32' } = props;
  const attributes = theme ? getAttributesFromTheme(theme) : getAttributes(width, height, fill, stroke, viewBox);
  const SVGIcon: FunctionComponent<SVGProps> = SVGIcons[path];
  return SVGIcon ? <SVGIcon path={path} {...attributes} /> : <React.Fragment></React.Fragment>;
};

export default SVG;

// ------------------------------------------------------------------------

// parameterized solution from https://stackoverflow.com/a/53681663
export const fourCornerGradientBackground = (topLeft: string = "#38C9EA", topRight: any = "#db258f", bottomRight: string = "#FFA93A", bottomLeft: any = "#6D3DFC"): any => {
  return (
      <svg preserveAspectRatio="none" viewBox="0 0 1 1" version="1.1" xmlns="http://www.w3.org/2000/svg">
          <defs>
          <linearGradient id="g">
              <stop offset="0" stopColor="#fff" stopOpacity="0"></stop>
              <stop offset="1" stopColor="#fff" stopOpacity="1"></stop>
          </linearGradient>
          <mask id="m">
              <rect x="0" y="0" width="1" height="1" fill="url(#g)"></rect>
          </mask>
          <linearGradient id="a" gradientTransform="rotate(90)">
              <stop offset="0" stopColor={topRight}></stop>
              <stop offset="1" stopColor={bottomRight}></stop>
          </linearGradient>
          <linearGradient id="b" gradientTransform="rotate(90)">
              <stop offset="0" stopColor={bottomLeft}></stop>
              <stop offset="1" stopColor={topLeft}></stop>
          </linearGradient>
          </defs>
          <rect x="0" y="0" width="1" height="1" fill="url(#a)" mask="url(#m)"></rect>
          <rect x="0" y="0" width="1" height="1" fill="url(#b)" mask="url(#m)" transform="translate(1,1) rotate(180)"></rect>
      </svg>
  );
};
