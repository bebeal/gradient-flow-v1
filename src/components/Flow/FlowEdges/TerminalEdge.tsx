import { EdgeLabelRenderer, EdgeProps } from "reactflow";
import styled, { createGlobalStyle, useTheme } from "styled-components";
import { useFlowControls } from "../../../hooks";
import { useContext, useEffect, useState } from "react";
import { CustomEdgeProps } from "./EdgeUtils";
import { useEdgeHandler } from "../../../hooks";
import React from "react";

export const Drawdash = createGlobalStyle`
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

// The solid line
export const TerminalLineSolid = styled.path<any>`
  stroke: #b1b1b7;
  stroke-width: 4px;
  fill: none;
  stroke-dasharray: 0 ${props => props.pathLength} !important;
  animation: none !important;
  pointer-events: all;
  z-index: 60;
  stroke-linecap: none;
  stroke-linejoin: none;
  clip-path: url(#clip);
`;

// The dashed line
export const TerminalLineDashed = styled.path<any>`
  stroke: ${(props) => props.color};
  stroke-width: 2px;
  fill: none;
  stroke-dasharray: 30, 10 !important;
  stroke-opacity: ${(props) => (props.selected || props.isHovered ? 1 : 0.5)};
  pointer-events: all;
  z-index: 54;
  animation: ${(props) => (props.animated ? `draw-terminal-line ${props.selected ? "7s" : "10s"} linear infinite` : "none")} !important;
  stroke-linecap: none;
  stroke-linejoin: none;
`;

const TerminalEdge: React.FC<CustomEdgeProps> = (props) => {
  const edgeHandler = useEdgeHandler({...props, offset:{x: 3, y: -3} });
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const updateTerminalCode = () => {
      if (!loaded && edgeHandler?.sourceNode?.data?.code && edgeHandler?.sourceNode?.data?.code.length > 0 && edgeHandler?.targetNode) {
        setLoaded(true);
        const newTargetNode = { 
          ...edgeHandler?.targetNode, 
          data: { 
            ...edgeHandler?.targetNode?.data, 
            code: { 
              ...edgeHandler?.targetNode.data?.code, 
              [edgeHandler?.sourceNode.id]: edgeHandler?.sourceNode?.data?.code 
            },
            parseFromMarkdown: edgeHandler?.sourceNode?.data?.parseFromMarkdown,
          } 
        };
        edgeHandler?.updateNodes(newTargetNode);
      }
    }
    updateTerminalCode();
  }, [edgeHandler?.sourceNode?.data?.code, edgeHandler?.targetNode]);

  return (
    <>
    <Drawdash />
    {edgeHandler?.path && (
      <>
        <TerminalLineSolid ref={edgeHandler?.pathRef} isHovered={edgeHandler?.isHovered} d={edgeHandler?.path} id={edgeHandler?.id} markerStart={edgeHandler?.selected || edgeHandler?.isHovered ? "url(#funnel-selected)" : "url(#funnel)"} markerEnd={edgeHandler?.selected || edgeHandler?.isHovered ? "url(#funnel-selected)" : "url(#funnel)"} />
        <TerminalLineDashed isHovered={edgeHandler?.isHovered} d={edgeHandler?.path} animated={edgeHandler?.animated} id={edgeHandler?.id} selected={edgeHandler?.selected} color={edgeHandler?.theme?.primary} />
      </>
    )}
    {edgeHandler?.InteractionComponent}
    {edgeHandler?.EdgeLabel}
  </>
  )
};

export default React.memo(TerminalEdge);
