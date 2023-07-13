import { createGlobalStyle } from "styled-components";
import { CircleNode, FlowNode, FreeformNode, TerminalNode, TriangleNode } from "./FlowNodes";
import { FlowEdge, TerminalEdge } from "./FlowEdges";
import { ConnectionMode, DefaultEdgeOptions, EdgeTypes, FitViewOptions, NodeTypes, SelectionMode, SetCenterOptions, ViewportHelperFunctionOptions } from "reactflow";

// used on MiniMap to color node fill
export const fetchNodeColor = (node: any) => {
  return node?.style?.background || node?.theme?.nodeBackground;
};

// used on MiniMap to color node stroke
export const fetchNodeStrokeColor = (node: any) => {
  return node?.style?.borderColor || node?.theme?.nodeColor;
};

export const downloadImage = (dataUrl: any, name: string = 'reactflow.png') => {
  const a = document.createElement("a");
  a.setAttribute("download", name);
  a.setAttribute("href", dataUrl);
  a.click();
};


// My Custom Node Types:
// * FlowNode
// * FreeformNode
// * Terminal
// * Circle
// * Triangle
// React Flow Node Types:
// * default
// * input
// * output
// * group
export const FlowNodeTypes: NodeTypes = {
  Freeform: FreeformNode,
  FlowNode: FlowNode,
  Terminal: TerminalNode,
  Circle: CircleNode,
  Triangle: TriangleNode,
};

// My Custom Edge Types:
// * FlowEdge
// * Terminal
// React Flow Edge Types:
// * default
// * simplebezier
// * smoothstep
// * step
// * straight
export const FlowEdgeTypes: EdgeTypes = {
  FlowEdge: FlowEdge,
  Terminal: TerminalEdge,
};

// Override the default react-flow styles to make panel scalable (not reliant on position: absolute)
// IM ADDING ATTRIBUTION MYSELF
export const FlowGlobals = createGlobalStyle<any>`
  .react-flow__panel {
    position: unset;
    margin: 0;
  }
  .react-flow__pane {
    cursor: ${(props) => props.mouseCursor || 'auto'};
  }
  .react-flow__attribution {
    display: none;
  }

  @-webkit-keyframes draw-terminal-line {
    0% {
      stroke-dashoffset: 100%;
    }
    100% {
      stroke-dashoffset: 0;
    }
  }
  @keyframes draw-terminal-line {
    0% {
      stroke-dashoffset: 100%;
    }
    100% {
      stroke-dashoffset: 0;
    }
  }
`;

export const DefaultNodeType = 'FlowNode';
export const DefaultEdgeType = 'FlowEdge';

export enum Layout {
  Default = "default",
  Top = "top",
  Bottom = "bottom",
  Left = "left",
  Right = "right",
};

// Default Edge Options that are used when an edge is created
export const FlowEdgeOptions: DefaultEdgeOptions = {
  type: 'FlowEdge',
  zIndex: 50,
  interactionWidth: 20,
  animated: true,
};

// Default Viewport Helper Function Options that are used when the viewport methods are called
export const FlowViewportHelperFunctionOptions: ViewportHelperFunctionOptions = {
  duration: 300, // setting over 500 causes maximum update depth exceeded error
};

// Default Fit View Options that are used when `fitView` is called
export const FlowFitViewOptions: FitViewOptions = {
  ...FlowViewportHelperFunctionOptions,
  padding: 0.25,
  includeHiddenNodes: true,
  minZoom: 0.01,
  maxZoom: Infinity,
};

// Default Center Options that are used when `setCenter` is called
export const FlowSetCenterOptions: SetCenterOptions = {
  ...FlowViewportHelperFunctionOptions,
  zoom: 1,
};
