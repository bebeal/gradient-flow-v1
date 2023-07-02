import React from 'react';
import { ConnectionLineComponentProps } from 'reactflow';
import { TerminalLineDashed, TerminalLineSolid } from '../FlowEdges/TerminalEdge';
import { useTheme } from 'styled-components';
import { FlowConnectionProps } from './FlowConnection';

const TerminalConnection = ({
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
      <TerminalLineSolid d={path} />
      <TerminalLineDashed d={path} animated={animated} selected={true} style={style} />
      <circle cx={toX} cy={toY} fill={theme.primary} r={2} stroke={theme.controlsColor} />
    </g>
  );
};

export default TerminalConnection;
