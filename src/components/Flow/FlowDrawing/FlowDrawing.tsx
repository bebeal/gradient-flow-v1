import React, { forwardRef } from 'react';

interface FlowDrawingProps {
  color?: string, 
  strokeWidth?: string, 
  strokeDasharray?: string,
  path: any,
};

const FlowDrawing = forwardRef<SVGSVGElement, FlowDrawingProps>((props, ref) => {
  const { color="#ff0072", strokeWidth=1, strokeDasharray='', path, ...rest } = props;
  const pathData = path.map((point: any, index: any) => `${index === 0 ? 'M' : 'L'}${point.x} ${point.y}`).join(' ');

  return (
    <svg ref={ref} width="100%" height="100%">
      <path d={pathData} stroke={color} strokeWidth={strokeWidth} strokeDasharray={strokeDasharray} fill="none"/>
    </svg>
  );
});

export default FlowDrawing;