import React, { useRef, useEffect, useCallback } from 'react';
import styled, { useTheme } from 'styled-components';
import { Handle, NodeProps, NodeResizer, Position } from 'reactflow';
import { nanoid } from 'nanoid';
import { throttle } from 'lodash';
import { CustomNodeProps } from './NodeUtils';

const Ellipse = styled.ellipse<any>`
  fill: ${(props) => props.theme.nodeBackground};
  stroke-width: 1px;
  stroke: ${(props) => props.selected || props.isHovering ? props.theme.primary : props.theme.nodeBorder};
`;

export const CircleNodeWrapper = styled.div<any>`
  z-index: 50;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

export const CircleLabel = styled.div<any>`
  font-size: 12px;
  word-wrap: break-word;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  text-align: center;
  overflow: hidden;
  flex-wrap: wrap;
`;

export const CircleNode: React.FC<CustomNodeProps> = (props) => {
  const { id, data, xPos, yPos, selected, type='CircleNode', resizeable=true, inPanel=false, isConnectable=true, zIndex=60, ...rest } = props;
  const theme: any = useTheme();
  const hoverable = true;
  const hover = hoverable ? theme.nodeBorderHover : 'transparent';
  const [isHovering, setIsHovering] = React.useState(false);
  const [size, setSize] = React.useState({ width: 70, height: 70 });

  const handleResize = useCallback((event: any, params: any) => {
    setSize({ width: params.width, height: params.height });
  }, []);

  const handleMouseOver = useCallback(() => {
    setIsHovering(true);
  }, []);

  const handleMouseOut = useCallback(() => {
    setIsHovering(false);
  }, []);

  return (
    <CircleNodeWrapper style={{width: `${size.width}px`, height: `${size.height}px`}} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
      <svg width="100%" height="100%" viewBox="0 0 100 100">
        <Ellipse cx="50%" cy="50%" rx="50%" ry="50%" isHovering={isHovering} selected={selected} hover={hover} />
        <foreignObject x="0" y="0" width="100%" height="100%">
          <CircleLabel>
            {data.label || ''}
          </CircleLabel>
        </foreignObject>
      </svg>
      {resizeable && <NodeResizer color={theme.primary} isVisible={selected} onResize={handleResize} />}
    </CircleNodeWrapper>
  );
};

export default CircleNode;
