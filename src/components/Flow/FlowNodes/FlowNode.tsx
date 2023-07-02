  import React, { forwardRef, useEffect, useState } from 'react';
  import styled, { useTheme } from 'styled-components';
  import { Handle, NodeProps, NodeResizer, Position, useNodeId, useReactFlow, useStore } from 'reactflow';
  import { nanoid } from 'nanoid';

  export interface FlowNodeProps extends NodeProps {
    resizeable?: boolean;
    inPanel?: boolean;
  };

  export const BaseNodeStyle = styled.div.attrs((props: any) => ({
    style: {
      color: props.theme.nodeColor,
      border: `1px solid ${props.selected ? props.theme.primary : props.theme.nodeBorder}`
    },
  }))`
    z-index: 50;
    pointer-events: all;
    background: ${(props) => props.theme.nodeBackground};
    &:hover {
      border: 1px solid ${(props: any) => props.hovercolor} !important;
    }
  `;

  export const FlowNodeWrapper = styled<any>(BaseNodeStyle)`
    z-index: 50;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    cursor: pointer;
    padding: 10px 10px;
    border-radius: 5px;
  `;

  export const FlowHandle = styled(Handle)<any>`
    z-index: 51;
    background: ${(props) => props.color};
    width: 5px;
    height: 5px;
    padding: 0;
    margin: 0;
    border: 0.5px solid ${(props) => props.theme.controlsColor};
    border-radius: 100%;
    &:hover {
      background: ${(props) => props.hovercolor};
  }
`;

  export const FlowNodeLabel = styled.div<any>`
    font-size: 12px;
  `;

export const getPositionBasedPositionProperties = (position: Position) => {
  if (position === Position.Top) {
    return {
      'top': '-2px',
    }
  } else if (position === Position.Bottom) {
    return {
      'bottom': '-2px',
    }
  } else if (position === Position.Left) {
    return {
      'left': '-2px',
    }
  } else if (position === Position.Right) {
    return {
      'right': '-2px',
    }
  }
};

const getFlowHandleDivPositions = (position: Position) => {
  if (position === Position.Top) {
    return {
      top: "-2px", 
      left: "50%"
    }
  } else if (position === Position.Bottom) {
    return {
      bottom: "-2px", 
      left: "50%"
    }
  } else if (position === Position.Left) {
    return {
      left: "-2px", 
      top: "50%"
    }
  } else if (position === Position.Right) {
    return {
      right: "-2px", 
      top: "50%"
    }
  }
};

export const getHandle = (props: any, theme: any, connections: any, position: any, id?: string) => {
  const handleColor = (connected: boolean) => connected ? theme.primary : theme.controlsColor;

  return props.inPanel ? (
      <FlowHandleDiv
        type={'source'}
        id={id || position}
        position={position}
        style={{cursor: props.inPanel ? 'pointer' : 'crosshair', ...getFlowHandleDivPositions(position)}}
        color={handleColor(connections.includes(id || position))}
        hovercolor={theme.primary}
        isConnectable={props.isConnectable}
      />
    ) : (
      <FlowHandle
        type={'source'}
        id={id || position}
        position={position}
        style={{cursor: props.inPanel ? 'pointer' : 'crosshair', ...getPositionBasedPositionProperties(position)}}
        color={handleColor(connections.includes(id || position))}
        hovercolor={theme.primary}
        isConnectable={props.isConnectable}
      />
  );

};

// to avoid error010: No node id found. Make sure to only use a Handle inside a custom Node. See https://reactflow.dev/docs/guides/troubleshooting/#handle-no-node-id-found
export const getHandles = (props: any, theme: any, connections: any) => {
  return (
    <>
      {getHandle(props, theme, connections, Position.Top)}
      {getHandle(props, theme, connections, Position.Bottom)}
      {getHandle(props, theme, connections, Position.Left)}
      {getHandle(props, theme, connections, Position.Right)}
    </>
  )
};

export const getEdgeConnections = (nodeId: any, edges: any) => {
  return edges.map((edge: any) => { 
    if (edge.source === nodeId) {
      return edge.sourceHandle;
    } else if (edge.target === nodeId) {
      return edge.targetHandle;
    }
    return undefined;
  }).filter((handle: any) => handle !== undefined);
};

export const FlowHandleDiv = styled.div<any>`
  position: absolute;
  background: ${(props) => props.theme.controlsColor};
  width: 5px;
  height: 5px;
  padding: 0;
  margin: 0;
  border-radius: 100%;    
  border: 0.5px solid ${(props) => props.theme.controlsColor};
`;

  const FlowNode: React.FC<FlowNodeProps> = (props) => {
    const { id, data, xPos, yPos, selected, type='FlowNode', resizeable=true, inPanel=false, isConnectable=true, zIndex=60, ...rest } = props;
    const theme: any = useTheme();
    const storeState = useStore((state) => state);
    const hoverable = true;
    const hovercolor = hoverable ? theme.nodeBorderHover : 'transparent';
  
    const nodeId = useNodeId();
    
    const [connections, setConnections] = useState([]);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
      const connectedHandles = getEdgeConnections(nodeId, storeState.edges);
      setConnections(connectedHandles);
    }, [nodeId, storeState.edges]);

    return (
      <FlowNodeWrapper onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} className='nowheel' selected={selected} zIndex={zIndex} hovercolor={hovercolor}>
        {data?.label && data?.label.length > 0 && <FlowNodeLabel>{data?.label || ''}</FlowNodeLabel>}
        {getHandles({...props, hovercolor: hovercolor}, theme, connections)}
        {resizeable && <NodeResizer color={theme.primary} isVisible={selected || isHovered} />}
      </FlowNodeWrapper>
    );
  };

  export default FlowNode;
