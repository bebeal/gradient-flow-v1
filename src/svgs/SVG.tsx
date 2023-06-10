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
  if (width) { attributes.width = width; }
  if (height) { attributes.height = height; }
  if (fill) { attributes.fill = fill; }
  if (stroke) { attributes.stroke = stroke; }
  if (viewBox) { attributes.viewBox = viewBox; }
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
