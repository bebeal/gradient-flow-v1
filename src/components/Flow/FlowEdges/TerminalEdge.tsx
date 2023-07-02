import { EdgeLabelRenderer, EdgeProps, useReactFlow } from "reactflow";
import styled, { createGlobalStyle, useTheme } from "styled-components";
import { useFlowControls } from "../../../hooks";
import { useEffect, useState } from "react";
import { getEdgeProperties } from "./EdgeUtils";
import { FlowEdgeLabel, FlowEdgeProps, InteractionLine } from "./FlowEdge";

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
  stroke-dasharray: 0 !important;
  animation: none !important;
  pointer-events: all;
  z-index: 55;

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
`;

export const TerminalInteractionLine = styled.path<any>`
  fill: none;
  stroke-opacity: 0;
  pointer-events: all;
`;

export const TerminalEdgeLabel = styled(FlowEdgeLabel)<any>`
`;


const TerminalEdge: React.FC<FlowEdgeProps> = (props) => {
  const theme: any = useTheme();
  const { style = { color: theme.primary }, animated, id, data, selected, source, target, sourceX, sourceY, sourcePosition, targetX, targetY, targetPosition, interactionWidth=20, markerEnd, markerStart, label, ...rest } = props;
  const reactFlow = useReactFlow();
  const sourceNode: any = reactFlow?.getNodes()?.find((node) => node.id === source);
  const targetNode: any = reactFlow?.getNodes()?.find((node) => node.id === target);
  const { path, centerX, centerY, offsetX, offsetY } = getEdgeProperties({ sourceX, sourceY, sourcePosition, targetX, targetY, targetPosition, });
  const [isHovered, setIsHovered] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const updateTerminalCode = () => {
      if (loaded) return;
      setLoaded(true);
      if (sourceNode && sourceNode.data && sourceNode.data.code && sourceNode.data.code.length > 0 && targetNode) {
        const newTargetNode = { 
          ...targetNode, 
          data: { 
            ...targetNode?.data, 
            code: { 
              ...targetNode.data?.code, 
              [sourceNode.id]: sourceNode?.data?.code 
            },
            parseMarkdown: sourceNode?.data?.parseMarkdown,
          } 
        };
        reactFlow.setNodes((prevNodes: any) => prevNodes.map((node: any) => node.id === newTargetNode.id ? newTargetNode : node));
      }
    };
    updateTerminalCode();
  }, [loaded, source, sourceNode, target, targetNode]);

  return (
    <>
      <TerminalLineSolid isHovered={isHovered} d={path} id={id} markerStart={markerStart} markerEnd={markerEnd} />
      <TerminalLineDashed isHovered={isHovered} d={path} animated={animated} id={id} markerStart={markerStart} markerEnd={markerEnd} selected={selected} color={style?.color} />
      {interactionWidth && (
        <InteractionLine onMouseLeave={() => setIsHovered(false)} onMouseEnter={() => setIsHovered(true)} d={path} interactionWidth={interactionWidth} className="react-flow__edge-interaction" />
      )}
      {label && label.toString().length > 0 ? (
        <EdgeLabelRenderer>
          <TerminalEdgeLabel onMouseLeave={() => setIsHovered(false)} onMouseEnter={() => setIsHovered(true)} hover={isHovered ? theme.primary : (selected ? theme.primary : "#b1b1b7")} className='nodrag nopan' labelX={centerX} labelY={centerY} selected={selected}>
            {label}
          </TerminalEdgeLabel>
        </EdgeLabelRenderer>
        ) : <></>
      }
    </>
  );
};

export default TerminalEdge;
