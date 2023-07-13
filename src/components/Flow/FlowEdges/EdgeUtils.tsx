import { EdgeProps, Position, getBezierPath, getSmoothStepPath } from "reactflow";
import styled from "styled-components";
import { CustomNodeStyle } from "../FlowNodes";

export const CustomEdgeLabel = styled<any>(CustomNodeStyle).attrs((props: any) => ({
  style: {
    transform: `translate(-50%, -50%) translate(${props.labelX}px,${props.labelY}px)`,
    border: `1px solid ${props.isHovered || props.selected ? props.theme.primary : "#b1b1b7"}`
  },
}))`
  z-index: 50;
  cursor: pointer;
  position: absolute;
  pointer-events: none;
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
  pointer-events: stroke;
  stroke-dasharray: none;
  animation: none;
  overflow: hidden;
  stroke-opacity: 0;
  stroke-width: ${(props) => props.interactionWidth};
`;

export interface CustomEdgeProps extends EdgeProps {
  children?: any;
  style?: any;
  dashLength?: number;
  floating?: boolean;
  pathType?: string;
  trackHandles?: boolean;
  trackPathLength?: boolean;
  offset?: { x: number, y: number };
};

export const getCubicBezierPathString = (fromX: any, fromY: any, toX: any, toY: any) => {
  return `M${fromX},${fromY} C ${fromX} ${toY} ${fromX} ${toY} ${toX},${toY}`;
};

// Get the center point of a node
export const getNodeWPositionCenter = (node: any): any => {
  const width = node.width;
  const height = node.height;
  const topLeft = node.positionAbsolute;
  return {
    x: topLeft.x + width / 2,
    y: topLeft.y + height / 2,
  };
};

// Get the unit vector and norm of a line from source to target
export const getUnitNorm = (source: any, target: any, atCenter: boolean): any => {
  if (!atCenter) {
    return getUnitNorm(getNodeWPositionCenter(source), getNodeWPositionCenter(target), true)
  };
  const dx = target.x - source.x;
  const dy = target.y - source.y;
  const norm = Math.sqrt(dx**2 + dy**2);
  const unitVector = { x: dx / norm, y: dy / norm };

  return { dx, dy, norm, unitVector };
};

// Returns the intersection point on the border of the targetNode
// given a line originating from the center of sourceNode to the center of the targetNode
const getNodeBorderIntersections = (sourceNode: any, targetNode: any): any => {
  // Get the source and target node dimensions and positions
  const sourceWidth = sourceNode.width;
  const sourceHeight = sourceNode.height;
  const sourceTopLeft = sourceNode.positionAbsolute;

  const targetWidth = targetNode.width;
  const targetHeight = targetNode.height;
  const targetTopLeft = targetNode.positionAbsolute;

  // Calculate the center point of the source and target nodes
  const sourceCenter = { 
    x: sourceTopLeft.x + sourceWidth / 2, 
    y: sourceTopLeft.y + sourceHeight / 2, 
  };
  const targetCenter = { 
    x: targetTopLeft.x + targetWidth / 2, 
    y: targetTopLeft.y + targetHeight / 2
  };

  // Calculate the unit vector from source to target
  const dx = targetCenter.x - sourceCenter.x;
  const dy = targetCenter.y - sourceCenter.y;
  const norm = Math.sqrt(dx**2 + dy**2);
  const unitVector = { x: dx / norm, y: dy / norm };

  // Calculate min distance to target node's borders in the direction of the unit vector
  const distances = {
    x: Math.abs(targetWidth / 2 / unitVector.x),
    y: Math.abs(targetHeight / 2 / unitVector.y)
  };
  const minDistance = Math.min(distances.x, distances.y);

  // Calculate intersection point
  const intersection = {
    x: targetCenter.x - minDistance * unitVector.x,
    y: targetCenter.y - minDistance * unitVector.y
  };
  return intersection;
}

// this helper function returns the intersection point
// of the line between the center of the intersectionNode and the target node
const getNodeIntersections = (intersectionNode: any, targetNode: any) => {
  // https://math.stackexchange.com/questions/1724792/an-algorithm-for-finding-the-intersection-point-between-a-center-of-vision-and-a
  const {
    width: intersectionNodeWidth,
    height: intersectionNodeHeight,
    positionAbsolute: intersectionNodePosition,
  } = intersectionNode;
  const targetPosition = targetNode.positionAbsolute;

  const w = intersectionNodeWidth / 2;
  const h = intersectionNodeHeight / 2;

  const x2 = intersectionNodePosition.x + w;
  const y2 = intersectionNodePosition.y + h;
  const x1 = targetPosition.x + w;
  const y1 = targetPosition.y + h;

  const xx1 = (x1 - x2) / (2 * w) - (y1 - y2) / (2 * h);
  const yy1 = (x1 - x2) / (2 * w) + (y1 - y2) / (2 * h);
  const a = 1 / (Math.abs(xx1) + Math.abs(yy1));
  const xx3 = a * xx1;
  const yy3 = a * yy1;
  const x = w * (xx3 + yy3) + x2;
  const y = h * (-xx3 + yy3) + y2;

  return { x, y };
}

// returns the position (top,right,bottom or right) passed node compared to the intersection point
export const getEdgePosition = (node: any, intersectionPoint: any) => {
  const n = { ...node.positionAbsolute, ...node };
  const nx = Math.round(n.x);
  const ny = Math.round(n.y);
  const px = Math.round(intersectionPoint.x);
  const py = Math.round(intersectionPoint.y);

  if (px <= nx + 1) {
    return Position.Left;
  }
  if (px >= nx + n.width - 1) {
    return Position.Right;
  }
  if (py <= ny + 1) {
    return Position.Top;
  }
  if (py >= n.y + n.height - 1) {
    return Position.Bottom;
  }

  return Position.Top;
}

// returns the parameters (sx, sy, tx, ty, sourcePos, targetPos)
export const getEdgeParams = (source: any, target: any) => {
  const sourceIntersectionPoint = getNodeIntersections(source, target);
  const targetIntersectionPoint = getNodeIntersections(target, source);
  const sourcePosition = getEdgePosition(source, sourceIntersectionPoint);
  const targetPosition = getEdgePosition(target, targetIntersectionPoint);

  return {
    sourceX: sourceIntersectionPoint.x,
    sourceY: sourceIntersectionPoint.y,
    sourcePosition: sourcePosition,
    targetX: targetIntersectionPoint.x,
    targetY: targetIntersectionPoint.y,
    targetPosition: targetPosition
  };
}

export interface EdgeProperties {
  path: string;
  centerX: number;
  centerY: number;
  offsetX: number;
  offsetY: number;
};

export const getEdgeProperty = (): EdgeProperties => {
  return { path: '', centerX: 0, centerY: 0, offsetX: 0, offsetY: 0, };
};

export const fromEdgePropertyList = (edgePropertyList: any): EdgeProperties => {
  const edgeProperties: any = getEdgeProperty();
  edgeProperties.path = edgePropertyList[0];
  edgeProperties.centerX = edgePropertyList[1];
  edgeProperties.centerY = edgePropertyList[2];
  edgeProperties.offsetX = edgePropertyList[3];
  edgeProperties.offsetY = edgePropertyList[4];
  edgeProperties.handles = edgePropertyList.handles;
  return edgeProperties;
};

export const getStep = (type: any = 'smoothstep',sourceX: number, sourceY: number, sourcePosition: any, targetX: number, targetY: number, targetPosition: any): any => {
  if (type === 'smoothstep') {
    return getSmoothStepPath({ sourceX, sourceY, sourcePosition, targetX, targetY, targetPosition });
  } else if (type === 'bezier') {
    return getBezierPath({ sourceX, sourceY, sourcePosition, targetX, targetY, targetPosition });
  }
};

export const getHandleEdgeProperties = (sourceX: any, sourceY: any, sourcePosition: any, targetX: any, targetY: any, targetPosition: any, type: any = 'smoothstep'): EdgeProperties => {
  const stepResult: any = getStep(type, sourceX, sourceY, sourcePosition, targetX, targetY, targetPosition);
  stepResult.handles = {
    sourceHandle: sourcePosition,
    targetHandle: targetPosition
  };
  return fromEdgePropertyList(stepResult);
};

export const getFloatingEdgeProperties = (sourceNode: any, targetNode: any, type: any = 'bezier', offset: any = {x: 0, y: 0}): EdgeProperties => {
  let { sourceX, sourceY, sourcePosition, targetX, targetY, targetPosition }: any = getEdgeParams(sourceNode, targetNode);
  sourceX = sourceX + (sourcePosition !== Position.Left ? offset.x : -offset.x);
  sourceY = sourceY + (sourcePosition !== Position.Top ? -offset.y : offset.y);
  targetX = targetX + (targetPosition !== Position.Left ? offset.x : -offset.x);
  targetY = targetY + (targetPosition !== Position.Top ? -offset.y : offset.y);
  const stepResult: any = getStep(type, sourceX, sourceY, sourcePosition, targetX, targetY, targetPosition);
  stepResult.handles = {
    sourceHandle: sourcePosition,
    targetHandle: targetPosition
  };
  return fromEdgePropertyList(stepResult);
};

