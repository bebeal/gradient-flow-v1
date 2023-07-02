import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Handle, NodeProps, NodeResizer, Position, useNodeId, useReactFlow, useStore, useStoreApi } from 'reactflow';
import Terminal from '../../Terminal/Terminal';
import styled, { useTheme } from 'styled-components';
import { nanoid } from 'nanoid';
import { FlowNodeProps, getEdgeConnections, getHandle } from './FlowNode';
import { parseOutMarkdownCodeBlock } from '../../CodeHighlightSyntax/CodeHighlightSyntax';

const TerminalNodeWrapper = styled.div<any>`
  display: flex;
  border-radius: 4px;
  width: 100%;
  height: 100%;
  border: 1px solid ${(props) => (props.theme.nodeBorder ? props.theme.nodeBorder : 'transparent')};
  &:hover {
    border: 1px solid ${(props) => props.theme.primary};
  }
`;

const TerminalNode = (props: FlowNodeProps) => {  
  const { 
    type='TerminalNode',
    id, 
    data = {
      code: {},
      parseMarkdown: true,
    }, 
    dragHandle,
    inPanel = false,
    selected=false,
    resizeable=true,
    isConnectable = true, 
    ...rest 
  } = props;
  const theme: any = useTheme();
  // const nodeId = useNodeId();
  // const storeState = useStore((state) => state);
  const [connections, setConnections] = useState([]);
  const [isHovered, setIsHovered] = useState(false);

  // useEffect(() => {
  //   const connectedHandles = getEdgeConnections(nodeId, storeState.edges);
  //   setConnections(connectedHandles);
  // }, [nodeId, storeState.edges]);

  const TerminalComp = useMemo(() => {
    return (
      <Terminal code={data?.code || '>_'} parseFromMarkdown={data.parseMarkdown} />
    )
  }, [data.code, data.parseMarkdown]);

  return (
    <>
    <TerminalNodeWrapper onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} id={data?.id || nanoid()} className="nowheel">
      {TerminalComp}
      {!inPanel ? getHandle(props, theme, connections, Position.Left) : <></>}
      {resizeable && <NodeResizer color={theme.primary} isVisible={selected || isHovered} />}
    </TerminalNodeWrapper>
    </>
  );
};

export default TerminalNode;
