import { getAttributes, makeSVGFromJSXPath } from "../SVG";

const Home = (width?: string, height?: string, fill: string = 'currentColor', stroke?: string, viewBox: string = '0 0 32 32') => {
  const attributes = getAttributes(width, height, fill, stroke);
  const path = (<g {...attributes}><path d='M16.612 2.214a1.01 1.01 0 0 0-1.242 0L1 13.419l1.243 1.572L4 13.621V26a2.004 2.004 0 0 0 2 2h20a2.004 2.004 0 0 0 2-2V13.63L29.757 15L31 13.428ZM18 26h-4v-8h4Zm2 0v-8a2.002 2.002 0 0 0-2-2h-4a2.002 2.002 0 0 0-2 2v8H6V12.062l10-7.79l10 7.8V26Z'/></g>);
  return makeSVGFromJSXPath(path, attributes, viewBox);
};

export default Home("", "100%");
