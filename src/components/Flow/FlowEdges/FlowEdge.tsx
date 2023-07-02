import React, { useState, forwardRef, useCallback, useEffect, useRef } from "react";
import { BaseEdge, EdgeLabelRenderer, EdgeProps, EdgeText, useNodes, useStore } from "reactflow";
import styled, { ThemeProvider, useTheme } from "styled-components";
import { getEdgeParams, getEdgeProperties } from "./EdgeUtils";
import { Dark } from "../../../themes";
import { BaseNodeStyle } from "../FlowNodes/FlowNode";

export interface FlowEdgeProps extends EdgeProps {
  style?: any;
}

export const FlowEdgeLabel = styled<any>(BaseNodeStyle).attrs((props: any) => ({
  style: {
    transform: `translate(-50%, -50%) translate(${props.labelX}px,${props.labelY}px)`,
    border: `1px solid ${props.hover}`
  },
}))`
  z-index: 50;
  cursor: pointer;
  position: absolute;
  pointer-events: all;
  opacity: 1;

  text-align: center;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  background: ${(props: any) => props.theme.nodeBackground};
  border-radius: ${(props: any) => props.labelBgBorderRadius || 4}px;
  padding: 0 4px;

`;

export const InteractionLine = styled.path<any>`
  z-index: 50;
  fill: none;
  stroke-opacity: 0;
  stroke-width: ${(props) => props.interactionWidth};
`;

export const DashedLine = styled.path<any>`
  stroke-width: 1;
  fill: none;
  stroke-dasharray: 5;
  pointer-events: all;
  animation: dashdraw 0.5s linear infinite;
  stroke: ${(props) => props.isHovered ? props.theme.primary : (props.selected ? props.theme.primary : "#b1b1b7")};
`;


const FlowEdge: React.FC<FlowEdgeProps> = (props) => {
  const theme: any = useTheme();
  const { animated, id, data, style, selected, source, target, sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition, sourceHandleId, targetHandleId, interactionWidth, label, labelStyle, labelShowBg, labelBgStyle, labelBgPadding, labelBgBorderRadius, markerStart, markerEnd, pathOptions, ...rest } = props;
  const { path, centerX, centerY, offsetX, offsetY } = getEdgeProperties({ sourceX, sourceY, sourcePosition, targetX, targetY, targetPosition, });
  const [isHovered, setIsHovered] = useState(false);

  const pathRef = useRef<any>(null);
  const [pathLength, setPathLength] = useState(0);
  useEffect(() => {
    if(pathRef.current) {
      setPathLength(pathRef.current.getTotalLength());
    }
  }, [pathRef]);
 
  return (
    <>
      <DashedLine dashLength={5} totalLength={pathLength} isHovered={isHovered} d={path} animated={animated} id={id} markerStart={markerStart} markerEnd={markerEnd} selected={selected} color={style?.color} />
      {interactionWidth && (
        <InteractionLine onMouseLeave={() => setIsHovered(false)} onMouseEnter={() => setIsHovered(true)} d={path} interactionWidth={interactionWidth} className="react-flow__edge-interaction" />
      )}
      {
        !!label && label.toString().length > 0 ?
        (<EdgeLabelRenderer>
          <FlowEdgeLabel onMouseLeave={() => setIsHovered(false)} onMouseEnter={() => setIsHovered(true)} hover={isHovered ? theme.primary : (selected ? theme.primary : "#b1b1b7")} className='nodrag nopan' labelX={centerX} labelY={centerY} selected={selected}>
            {label || ''}
          </FlowEdgeLabel>
        </EdgeLabelRenderer>)
      : <></>}
    </>
  );
};



export default FlowEdge;
