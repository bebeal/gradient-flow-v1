// import React, { ReactElement, forwardRef, useMemo, useState, useRef, useEffect, createRef } from 'react';
// import styled, { useTheme } from 'styled-components';
// import Draggable, { DraggableCore } from 'react-draggable';
// import { Resizable } from "re-resizable";
// import { Box, Fit, Flex, Relative } from '../../../constants';
import { nanoid } from 'nanoid';
// import { GridLayout } from '../../GridLayout/GridLayout';
// import FlowControlPanelButton, { FitWrapper, FlowControlPanelButtonProps } from './FlowControlPanelButton';
// import { Button } from './FlowButtons';

import styled from "styled-components";
import FlowControlPanelButton, {
  FlowControlPanelButtonProps,
} from "./FlowControlPanelButton";
import { useCallback, useEffect, useMemo, useRef } from "react";
import React from 'react';

export interface FlowControlPanelProps {
  buttons?: FlowControlPanelButtonProps[];
}

// const ControlPanelWrapper = styled.div<any>`
//   background: ${(props) => props.theme.controlsBackground};
//   margin: 0px;
//   border: 2px solid ${(props) => props.theme.controlsBorder};
//   border-radius: 4px;
//   display: flex;
//   width: 100%;
//   height: 100%;
//   z-index: 50;
//   overflow: hidden;
//   position: relative;
// `;

// /*
//   Automatic Editable Grid Layout
//   Determines the number of rows and columns based on the provided buttons (max x + width and max y + height)
//   Buttons specify x, y, width, height, as grid units
//   Grid units are based on evenly dividing the grid into row x column cells
//   Buttons can be dragged and resized within the grid when editable
//   Editable grid can be toggled on and off
// */
// const FlowControlPanel = ({ buttons = []}: FlowControlPanelProps) => {
//   const [isEditable, setIsEditable] = useState(true);
//   const rows = Math.max(...buttons.map((button, index) => (button?.x) + (button?.w || 1)));
//   const cols = Math.max(...buttons.map((button, index) => (button?.y) + (button?.h || 1)));
//   const toggleDraggable = () => setIsEditable(!isEditable);

//   const [cellSize, setCellSize] = useState<any>([0, 0]);
//   const refGrid = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     setCellSize([
//       refGrid.current ? refGrid.current.getBoundingClientRect().width / rows : 0,
//       refGrid.current ? refGrid.current.getBoundingClientRect().height / cols : 0
//     ]);
//   }, [refGrid, cols, rows]);

//   const GridItems = useMemo(() => {
//     return buttons.map((button, index) => {
//     const layout = {
//       id: `.control-panel-button-${index}`,
//       x: (button?.x),                                      // start at row x
//       y: (button?.y),                                      // start at column y
//       w: (button?.w || 1),                                          // span width number of columns
//       h: (button?.h || 1),                                          // span height number of rows
//       draggable: true,                                              // button can be dragged if grid is editable
//       resizeable: false,                                            // button can be resized if grid is editable
//       component: button?.component,                                 // button component, (toggleable, clickable, selector, popup, etc.)
//     };
//     return (
//       <FlowControlPanelButton {...layout} cellSize={cellSize} key={layout.id} editable={isEditable} />
//     );
//   });
//   }, [buttons, cellSize, isEditable]);

//   useEffect(() => {
//     const handleResize = () => {
//       setCellSize([
//         refGrid.current ? refGrid.current.getBoundingClientRect().width / rows : 0,
//         refGrid.current ? refGrid.current.getBoundingClientRect().height / cols : 0
//       ]);
//     };

//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, [refGrid, rows, cols]);

//   return (
//     <>
//     <ControlPanelWrapper ref={refGrid}>
//         {GridItems}
//     </ControlPanelWrapper>
//     </>
//   );
// };

// export default React.memo(FlowControlPanel);

const FlowControlPanelStyled = styled.div<any>`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const GridRow = styled.div<any>`
  display: grid;
  grid-template-columns: ${(props) => `repeat(${props.gridWidth}, 1fr)`};
  width: 100%;
  height: auto;
`;

const GridButton = styled.div<any>`
  grid-column: ${(props) => `${props.x + 1} / span ${props.w}`};
  grid-row: ${(props) => `${props.y + 1} / span ${props.h || 1}`};
  display: flex;
  background: ${(props) => props.theme.controlsBackground};
  border: 1px solid ${(props) => props.theme.controlsBorder};
  overflow: auto;
`;

const FlowControlPanel = ({ buttons = [] }: FlowControlPanelProps) => {

  const buttonLayout = useMemo(() => {
    const layout = [];
    for (let i = 0; i < buttons.length; i++) {
      const button = buttons[i];
      const row = button?.y;
      const span = button?.x + button?.w;
      if (!layout[row]) {
        layout[row] = { span, buttons: [button] };
      } else {
        layout[row].buttons.push(button);
        layout[row].span = Math.max(layout[row].span, span);
      }
    }
    return layout.sort((a: any, b: any) => a[0] - b[0]);
  }, [buttons]);

  const buttonOnRow = useCallback((button: any, index: any) => {
    const x = button?.x ?? 0;
    const y = button?.y ?? 0;
    const w = button?.w ?? 1;
    const h = button?.h ?? 1;
    const component = button?.component ?? <></>;
    const id = index;
    const ButtonComponent = component;
    const props = { x: x, y: y, w: w, h: h, };
    return (
      <GridButton key={`flow-control-button${id ?? index}`} x={x} y={y} w={w} h={h} >
        {ButtonComponent(props)}
      </GridButton>
    );
  }, []);

  const buttonsPerRow = useCallback((row: any) => {
    return row.buttons.map((button: any, index: any) => {
      return buttonOnRow(button, index)
    })
  }, [buttonOnRow]);

  const rowButtons = useCallback(() => {
    return buttonLayout.map((rowValue, rowIndex) => (
      <GridRow key={rowIndex} gridWidth={rowValue.span}>
        {buttonsPerRow(rowValue)}
      </GridRow>
    ))
  }, [buttonsPerRow, buttonLayout]);

  return (
    <FlowControlPanelStyled>
      {rowButtons()}
    </FlowControlPanelStyled>
  );
};

export default React.memo(FlowControlPanel);
