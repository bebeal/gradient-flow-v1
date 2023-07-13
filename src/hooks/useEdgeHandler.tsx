import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { EdgeLabelRenderer, EdgeProps, Position, useNodesInitialized, useReactFlow, useStore, useStoreApi, useUpdateNodeInternals } from "reactflow";
import { CustomEdgeLabel, CustomEdgeProps, InteractionLine, getFloatingEdgeProperties, getHandleEdgeProperties } from "../components";
import styled, { useTheme } from "styled-components";
import { nanoid } from "nanoid";
import _ from "lodash";

const useEdgeHandler = (props: CustomEdgeProps) => {
  const {
    id,
    animated=true,
    data={},
    selected,
    interactionWidth,
    source, target, 
    sourceX, sourceY, 
    targetX, targetY, 
    sourcePosition, targetPosition, 
    sourceHandleId, targetHandleId, 
    label, labelStyle, labelShowBg, labelBgStyle, labelBgPadding, labelBgBorderRadius,
    markerStart, markerEnd,
    pathOptions,
    children,
    style,
    dashLength=5,
    floating=true,
    pathType='bezier',
    trackHandles=true,
    trackPathLength=true,
    offset={x: 0, y: 0}
  } = props;
  // const updateNodeInternals = useUpdateNodeInternals();
  const store = useStoreApi();
  const reactFlow = useReactFlow();
  const theme: any = useTheme();
  const pathRef = useRef<any>();
  const [isHovered, setIsHovered] = useState(false);
  const [pathLength, setPathLength] = useState(0);
  const sourceNode = reactFlow?.getNode(source);
  const targetNode = reactFlow?.getNode(target);
  const [handles, setHandles] = useState<any>({});
  
  const [edgeProperties, setEdgeProperties] = useState<any>( floating ? getFloatingEdgeProperties(sourceNode, targetNode, pathType, offset) : getHandleEdgeProperties(sourceX, sourceY, sourcePosition, targetX, targetY, targetPosition));
  const { path, centerX, centerY, offsetX, offsetY } = edgeProperties;
  

  const getEdgeProperties: any = useCallback((sourceX: any, sourceY: any, sourcePosition: Position, targetX: any, targetY: any, targetPosition: Position) => {
    return floating ? getFloatingEdgeProperties(sourceNode, targetNode, pathType, offset) : getEdgeProperties(sourceX, sourceY, sourcePosition, targetX, targetY, targetPosition);
  }, [floating, offset, pathType, sourceNode, targetNode]);

  useEffect(() => {
    const newEdgeProperties: any = getEdgeProperties(sourceX, sourceY, sourcePosition, targetX, targetY, targetPosition);
    if (!_.isEqual(newEdgeProperties, edgeProperties)) {
      setEdgeProperties(newEdgeProperties);
      setHandles(newEdgeProperties?.handles);
    }
  }, [edgeProperties, floating, getEdgeProperties, sourcePosition, sourceX, sourceY, targetPosition, targetX, targetY]);

  useEffect(() => {
    if (trackHandles) {
      const storeState: any = store.getState();
      const edges = storeState?.edges || [];
      const updatedEdges = edges.map((edge: any) => {
        if(edge?.id === id) {
          const newEdge = { ...edge, data: {...edge?.data, handles}, };
          return newEdge
        }
        return edge;
      });
      storeState.setEdges(updatedEdges);
    }
    
  }, [handles, id, trackHandles]);

  useEffect(() => {
    if (trackPathLength && pathRef?.current) {
      setPathLength(pathRef?.current?.getTotalLength());
    }
  }, [path, trackPathLength]);

  const updateNodes = useCallback((newTargetNode: any) => {
    
    const nodes = reactFlow?.getNodes() || [];
    const updatedNodes = nodes.map((node: any) => {
      if (node?.id === newTargetNode?.id) {
        return newTargetNode;
      }
      return node;
    });
    // window.requestAnimationFrame(() => {
      reactFlow.setNodes(updatedNodes);
    // });
  }, [reactFlow]);

  const onMouseEnter = useCallback((e: any) => {
    e.stopPropagation();
    e.preventDefault();
    setIsHovered(true);
  }, []);

  const onMouseLeave = useCallback((e: any) => {
    e.stopPropagation();
    e.preventDefault();
    setIsHovered(false);
  }, []);

  const InteractionComponent = useMemo(() => {
    return interactionWidth ? (
      <InteractionLine 
        onMouseLeave={onMouseLeave} 
        onMouseEnter={onMouseEnter} 
        d={edgeProperties.path} 
        fill={"none"}
        interactionWidth={interactionWidth} 
        className="react-flow__edge-interaction" />
      ) : <></>;
  }, [edgeProperties.path, interactionWidth, onMouseEnter, onMouseLeave]);

  const EdgeLabel = useMemo(() => {
    return label && label.toString().length > 0 ? (
      <EdgeLabelRenderer>
        <CustomEdgeLabel isHovered={isHovered} className='nodrag nopan' labelX={centerX} labelY={centerY} selected={selected}>
          {label || ''}
        </CustomEdgeLabel>
      </EdgeLabelRenderer>
    ) : <></>;
  }, [centerX, centerY, isHovered, label, selected]);

  return {
    ...props,
    theme,
    pathRef,
    isHovered,
    pathLength,
    edgeProperties,
    sourceNode,
    targetNode,
    path,
    centerX, centerY, offsetX, offsetY,
    updateNodes,
    onMouseEnter,
    onMouseLeave,
    InteractionComponent,
    EdgeLabel,
  };
};

export default useEdgeHandler;
