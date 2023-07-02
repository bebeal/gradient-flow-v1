import React from 'react';
import { ConnectionLineComponentProps } from 'reactflow';
import { TerminalLineDashed, TerminalLineSolid } from '../FlowEdges/TerminalEdge';
import { useTheme } from 'styled-components';
import { DashedLine } from '../FlowEdges/FlowEdge';

export interface FlowConnectionProps extends ConnectionLineComponentProps {
  animated?: boolean;
  style?: any;
};

const FlowConnection = ({
  fromX,
  fromY,
  fromPosition,
  toX,
  toY,
  toPosition,
  connectionLineType,
  connectionLineStyle,
  animated=true,
  style={
    stroke: '#ff0072'
  }
}: FlowConnectionProps) => {
  const theme: any = useTheme();
  const getD = () => {
    return `M${fromX},${fromY} C ${fromX} ${toY} ${fromX} ${toY} ${toX},${toY}`;
  }
  const path = getD();

  return (
    <g>
      <circle cx={fromX} cy={fromY} fill={theme.primary} r={2} stroke={theme.controlsColor} />
      <DashedLine isHovered={false} d={path} animated={animated} selected={false} color={style?.color} />
      <circle cx={toX} cy={toY} fill={theme.primary} r={2} stroke={theme.controlsColor} />
    </g>
  );
};

export default FlowConnection;
