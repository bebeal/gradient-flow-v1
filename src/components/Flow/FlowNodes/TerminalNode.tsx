import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Handle, NodeProps, NodeResizer, Position, useNodeId, useReactFlow, useStore, useStoreApi } from 'reactflow';
import Terminal from '../../Terminal/Terminal';
import styled, { useTheme } from 'styled-components';
import { nanoid } from 'nanoid';
import { parseOutMarkdownCodeBlock } from '../../CodeHighlightSyntax/CodeHighlightSyntax';
import { CustomNodeProps } from './NodeUtils';
import { useNodeHandler } from '../../../hooks';

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

const TerminalNode = (props: CustomNodeProps) => {  
  const nodeHandler = useNodeHandler(props);

  const TerminalComp = useMemo(() => {
    return (
      <Terminal code={nodeHandler?.data?.code ?? '>_'} parseFromMarkdown={nodeHandler?.data?.parseFromMarkdown ?? false} />
    )
  }, [nodeHandler?.data?.code, nodeHandler?.data?.parseFromMarkdown]);

  return (
    <TerminalNodeWrapper onMouseEnter={nodeHandler?.onMouseEnter} onMouseLeave={nodeHandler?.onMouseLeave} id={nodeHandler?.id} className="nowheel">
      {TerminalComp}
      {nodeHandler?.NodeHandles}
      {nodeHandler?.NodeSizer}
    </TerminalNodeWrapper>
  );
};

export default React.memo(TerminalNode);
