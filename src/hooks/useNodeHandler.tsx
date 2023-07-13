import { useTheme } from "styled-components";
import { CustomHandle, CustomHandleDiv, CustomNodeLabel, CustomNodeProps, CustomTooltip, getConnectedEdges, getEdgePositions } from "../components";
import { NodeResizer, Position, useStoreApi } from "reactflow";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Relative } from "../constants";
import { throttle } from "lodash";

const useNodeHandler = (props: CustomNodeProps) => {
  const {
    id, 
    data, 
    xPos, yPos, 
    selected,
    dragging,
    hidden=false,
    draggable=true,
    selectable=true,
    connectable=true,
    deletable=true,
    type,
    isConnectable=true,
    resizeable=true, 
    inPanel=false, 
    hoverable=true,
    trackEdgePositions=true,
    ...rest 
  } = props;
  const theme: any = useTheme();
  const store = useStoreApi();
  const hovercolor = hoverable ? theme.nodeBorderHover : 'transparent';
  const [isResizing, setIsResizing] = useState(false);

  const [edgePositions, setEdgePositions] = useState<any>({ top: false, bottom: false, left: false, right: false, });
  const [isHovered, setIsHovered] = useState(false);

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

  useEffect(() => {
    const unsubscribe = store.subscribe((state) => {
      if (trackEdgePositions) {
        const { sourceEdges, targetEdges } = getConnectedEdges(id, state.edges);
        // window.requestAnimationFrame(() => {
          const newEdgePositions: any = getEdgePositions(sourceEdges, targetEdges);
          setEdgePositions({...newEdgePositions});
        // });
      }
    });
    return () => unsubscribe();
  }, [id, trackEdgePositions, store]);

  const getPositionBasedPositionProperties = useCallback((position: Position) => {
    if (position === Position.Top) {
      return { 'top': '-2px', }
    } else if (position === Position.Bottom) {
      return { 'bottom': '-2px', }
    } else if (position === Position.Left) {
      return { 'left': '-2px', }
    } else if (position === Position.Right) {
      return { 'right': '-2px', }
    }
  }, []);
  
  const getFlowHandleDivPositions = useCallback((position: Position) => {
    if (position === Position.Top) {
      return { top: "-2px", left: "50%" }
    } else if (position === Position.Bottom) {
      return { bottom: "-2px", left: "50%" }
    } else if (position === Position.Left) {
      return { left: "-2px", top: "50%" }
    } else if (position === Position.Right) {
      return { right: "-2px", top: "50%" }
    }
  }, []);

  const getHandle = useCallback(( position: any) => {
    const handleColor = (position: boolean) => position ? theme.primary : theme.controlsColor;
    return inPanel ? (
        <CustomHandleDiv
          type={'source'}
          id={position}
          position={position}
          style={{cursor: inPanel ? 'pointer' : 'crosshair', ...getFlowHandleDivPositions(position)}}
          color={handleColor(edgePositions[position])}
          hovercolor={theme.primary}
          isConnectable={isConnectable}
        />
      ) : (
        <CustomHandle
          type={'source'}
          id={position}
          position={position}
          style={{cursor: inPanel ? 'pointer' : 'crosshair', ...getPositionBasedPositionProperties(position)}}
          color={handleColor(edgePositions[position])}
          hovercolor={theme.primary}
          isConnectable={isConnectable}
        />
    );
  }, [edgePositions, getFlowHandleDivPositions, getPositionBasedPositionProperties, inPanel, isConnectable, theme.controlsColor, theme.primary]);

// to avoid error010: No node id found. Make sure to only use a Handle inside a custom Node. See https://reactflow.dev/docs/guides/troubleshooting/#handle-no-node-id-found
const getHandles = useCallback(() => {
  return (
    <>
      {getHandle(Position.Top)}
      {getHandle(Position.Bottom)}
      {getHandle(Position.Left)}
      {getHandle(Position.Right)}
    </>
  )
}, [getHandle]);

  const NodeHandles = useMemo(() => {
    return getHandles();
  }, [getHandles]);

  const NodeLabel = useMemo(() => {
    return data?.label && data?.label.length > 0 ? (<CustomNodeLabel>{data?.label}</CustomNodeLabel>) : (<></>);
  }, [data?.label]);

  const NodeSizer = useMemo(() => {
    return resizeable ? (<NodeResizer onResizeStart={() => setIsResizing(true)} onResizeEnd={() => setIsResizing(false)} color={theme.primary} isVisible={selected || isHovered || isResizing} />) : (<></>);
  }, [isHovered, isResizing, resizeable, selected, theme.primary]);

  const NodeTooltip = useMemo(() => {
    return (<CustomTooltip xPos={xPos} yPos={yPos} selected={selected} />);
  }, [selected, xPos, yPos]);

  return {
    ...props,
    theme,
    hovercolor,
    edgePositions,
    isHovered,
    onMouseEnter,
    onMouseLeave,
    NodeLabel,
    NodeHandles,
    NodeSizer,
    NodeTooltip,
    getHandles,
  }
};

export default useNodeHandler;
