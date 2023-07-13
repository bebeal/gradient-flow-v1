  import React, { forwardRef, useEffect, useRef, useState } from 'react';
  import styled, { useTheme } from 'styled-components';
  import { Handle, NodeProps, NodeResizer, Position, useNodeId, useReactFlow, useStore } from 'reactflow';
  import { nanoid } from 'nanoid';
import { Relative } from '../../../constants';
import { CustomNodeProps, CustomNodeStyle } from './NodeUtils';
import { useNodeHandler } from '../../../hooks';

export const CustomNodeWrapper = styled<any>(CustomNodeStyle)`
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

const FlowNode: React.FC<CustomNodeProps> = (props) => {
    const nodeHandler = useNodeHandler(props);

    return (
      <>
      {nodeHandler?.NodeTooltip}
      <CustomNodeWrapper onMouseEnter={nodeHandler?.onMouseEnter} onMouseLeave={nodeHandler?.onMouseLeave} className='nowheel' selected={nodeHandler?.selected} hovercolor={nodeHandler?.hovercolor} >
        {nodeHandler?.NodeSizer}
        {nodeHandler?.NodeLabel}
        {nodeHandler?.NodeHandles}
      </CustomNodeWrapper>
      </>
    );
  };

  export default React.memo(FlowNode);
