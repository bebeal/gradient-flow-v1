import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { NodeResizer } from 'reactflow';
import styled, { useTheme } from 'styled-components';
import { throttle } from 'lodash';
import { CustomNodeProps } from './NodeUtils';

const SVGWrapper = styled.div<any>`
  z-index: 50;
  pointer-events: all;
  display: flex;
  width: 100%;
  height: 100%;
`;

const FreeformNode: React.FC<CustomNodeProps> = (props: any) => {
  const theme: any = useTheme();
  const { id, data, xPos, yPos, selected, type='Freeform', resizeable=true, inPanel=false, isConnectable=false, zIndex=60, ...rest } = props;
  
  const [nodeSize, setNodeSize] = useState({ 
    width: (data.maxs[0] - data.mins[0]) * (1 / data.zoom), 
    height: (data.maxs[1] - data.mins[1]) * (1 / data.zoom), 
  });

  const viewBox = `${data.mins[0]} ${data.mins[1]} ${data.maxs[0] - data.mins[0]} ${data.maxs[1] - data.mins[1]}`;
  const pathData = useMemo(() => {
    return data.path.map((point: any, index: any) => `${index === 0 ? 'M' : 'L'}${point.x} ${point.y}`).join(' ');
  }, [data.path]);

  const resize = throttle((event, params) => {
    setNodeSize({ width: params.width, height: params.height });
  }, 50);

  const handleResize = useCallback(resize, [resize]);

  return (
    <>
      <SVGWrapper style={{color: data.color, stroke: data.color}}>
        <svg style={{...nodeSize}} width="100%" height="100%" viewBox={viewBox}>
          <path d={pathData} stroke={data.color} strokeWidth={data.width} strokeDasharray={data.strokeDasharray} fill="none" />
        </svg>
      </SVGWrapper>
      {resizeable && <NodeResizer minHeight={1} minWidth={1} color={theme.primary} isVisible={selected} onResize={handleResize} />}
    </>
  );
};

export default React.memo(FreeformNode);
