import { useCallback } from "react";
import { Handle, NodeProps, Position, useStore } from "reactflow";
import styled, { css } from "styled-components";

export interface CustomNodeProps extends NodeProps {
  resizeable?: boolean;
  rotateable?: boolean;
  inPanel?: boolean;
  hoverable?: boolean;
  parseFromMarkdown?: boolean;
  trackEdgePositions?: boolean;
  hidden?: boolean;
  draggable?: boolean;
  selectable?: boolean;
  connectable?: boolean;
  deletable?: boolean;
};

export const CustomNodeStyle = styled.div.attrs((props: any) => ({
  style: {
    color: props.theme.nodeColor,
    border: `1px solid ${props.selected ? props.theme.primary : props.theme.nodeBorder}`,
    background: props.theme.nodeBackground
  },
}))`
  z-index: 50;
  pointer-events: all;
  &:hover {
    border: 1px solid ${(props: any) => props.hovercolor} !important;
  }
`;

export const CustomNodeLabel = styled.div<any>`
  font-size: 12px;
`;

const CustomHandleStyle = css<any>`
  z-index: 50;
  background: ${(props) => props.inPanel ? props.theme.controlsColor : props.color};
  border: 0.5px solid ${(props) => props.theme.controlsColor};
  width: 5px;
  height: 5px;
  padding: 0;
  margin: 0;
  border-radius: 100%;
  ${(props) => props.inPanel ?
    `
      &:hover {
        background: ${props.theme.primary};
      }
    ` 
    : ``
  }
`;

export const CustomHandleDiv = styled.div<any>`
  ${CustomHandleStyle}
  position: absolute;
`;

export const CustomHandle = styled(Handle)<any>`
  ${CustomHandleStyle}
`;

export const TooltipStyled = styled.div.attrs<any>((props: any) => ({
  style: {
    background: props.theme.nodeBackground,
    border: `1px solid ${props.theme.nodeBorder}`,
    color: props.theme.primary,
  },
}))<any>`
  position: absolute;
  z-index: 51;
  padding: 2px;
  border-radius: 10px;
  font-size: 8px;
  white-space: nowrap;
  top: 0;
  left: 50%;
  transform: translate(-50%, calc(-100% - 10px));
`;

export const CustomTooltip = (props: any) => {
  const { selected, xPos, yPos, } = props;
  return selected ? (
    <TooltipStyled>
      <span style={{color: 'white'}}>(</span>
      {`${xPos.toFixed(2)}`}
      <span style={{color: 'white'}}>, </span>
      {`${yPos.toFixed(2)}`}
      <span style={{color: 'white'}}>)</span>
    </TooltipStyled>
  ) : (
    <></>
  );
};


export const getNodeCenter = (node: any): any => {
  return {
    x: node?.x + node?.width / 2,
    y: node?.y + node?.height / 2,
  };
};

export const getConnectedEdges = (nodeId: any, edges: any) => {
  const sourceEdges: any[] = [];
  const targetEdges: any[] = [];
  edges.forEach((edge: any) => {
    if (edge?.source === nodeId) {
      sourceEdges.push(edge);
    }
    if (edge?.target === nodeId) {
      targetEdges.push(edge);
    }
  });
  return { sourceEdges, targetEdges };
};

export const getEdgePositions = (sourceEdges: any, targetEdges: any, floatingConnection: boolean = true) => {
  const positionsConnected: any = {
    top: false,
    bottom: false,
    left: false,
    right: false,
  };
  if (floatingConnection) {
    sourceEdges.forEach((edge: any) => {
      if (edge?.data?.handles?.sourceHandle) {
        positionsConnected[edge?.data?.handles?.sourceHandle] = true;
      }
    });
    targetEdges.forEach((edge: any) => {
      if (edge?.data?.handles?.targetHandle) {
        positionsConnected[edge?.data?.handles?.targetHandle] = true;
      }
    });
    return positionsConnected;
  }
  sourceEdges.forEach((edge: any) => {
    positionsConnected[edge?.sourceHandle] = true;
  });
  targetEdges.forEach((edge: any) => {
    positionsConnected[edge?.targetHandle] = true;
  });
  return positionsConnected
};






