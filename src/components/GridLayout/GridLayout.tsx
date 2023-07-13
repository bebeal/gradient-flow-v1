import { forwardRef, useState } from "react";
import styled from "styled-components";

export const GridWrapper = styled.div<any>`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  z-index: 50;
  background: ${(props) => props.theme.controlsBackground};
`;

export const GridLine = styled.div<any>`
  position: absolute;
  background: ${(props) => props.theme.controlsBorder};
  ${(props) => props.vertical ?`
    width: 1px;
    height: 100%;
    left: ${props.offset}%;
  ` : `
    height: 1px;
    width: 100%;
    top: ${props.offset}%;
  `}
`;

const Cell = styled.div<any>`
  position: absolute;
  width: ${(props) => props.width}%;
  height: ${(props) => props.height}%;
  background: rgba(0,0,0,0.02);
  left: ${(props) => props.x}%;
  top: ${(props) => props.y}%;
`;

export interface GridLayoutProps {
  rows?: number;
  cols?: number;
  children?: any;
  buttons?: any;
};

// Wrapper to style the grid, and add grid lines
export const GridLayout = forwardRef(({ children, rows=12, cols=12, buttons=[] }: any, ref) => {
  const lines = [];
  const cells = [];
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      cells.push(<Cell key={`grid-layout-cell-${i}-${j}`} x={i * 100 / cols} y={j * 100 / rows} width={100 / cols} height={100 / rows} />);
    }
  }
  for (let i = 1; i < cols; i++) {
    lines.push(<GridLine key={`grid-layout-hline${i}`} vertical offset={i * 100 / cols} />);
  }
  for (let i = 1; i < rows; i++) {
    lines.push(<GridLine key={`grid-layout-vline-${i}`} offset={i * 100 / rows} />);
  }

  return (
    <GridWrapper ref={ref}>
      {/* {lines}
      {cells} */}
      {children}
    </GridWrapper>
  );
});

