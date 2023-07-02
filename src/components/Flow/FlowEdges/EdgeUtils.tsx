import { Position, getSmoothStepPath } from "reactflow";

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
const getNodeIntersections = (sourceNode: any, targetNode: any): any => {
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
  const edgeProperties = getEdgeProperty();
  edgeProperties.path = edgePropertyList[0];
  edgeProperties.centerX = edgePropertyList[1];
  edgeProperties.centerY = edgePropertyList[2];
  edgeProperties.offsetX = edgePropertyList[3];
  edgeProperties.offsetY = edgePropertyList[4];
  return edgeProperties;
};

export const getEdgeProperties = ({ sourceX, sourceY, sourcePosition, targetX, targetY, targetPosition }: any): EdgeProperties => {
  const smoothStepResult = getSmoothStepPath({ sourceX, sourceY, sourcePosition, targetX, targetY, targetPosition });
  return fromEdgePropertyList(smoothStepResult);
};
