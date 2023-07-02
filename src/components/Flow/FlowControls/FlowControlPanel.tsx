import React, { useState, useEffect, useMemo, forwardRef } from 'react';
import styled from 'styled-components';

import '../../../../node_modules/react-grid-layout/css/styles.css';
import '../../../..//node_modules/react-resizable/css/styles.css';
import RGL, { Responsive, WidthProvider } from 'react-grid-layout';


const ControlPanelWrapper = styled.div<any>`
  background: ${(props) => props.theme.controlsBackground};
  padding: 2px;
  border: 2px solid ${(props) => props.theme.controlsBorder};
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

export interface ButtonProps {
  i: string;
  component: React.ReactNode;
  width?: number;
  height?: number;
  x?: number;
  y?: number;
  disabled?: boolean;
  hoverable?: boolean;
  active?: string;
}

const ButtonWrapper = styled.div<any>`
display: flex;
flex-grow: 1;
width: ${(props) => props.width ? props.width : '100%'};
height: ${(props) => props.height ? props.height : '100%'};
padding: ${(props) => props.padding ? props.padding : '4px'};
overflow: hidden;
justify-content: center;
align-items: center;
text-align: center;
pointer-events: ${(props) => props.disabled ? 'none' : 'all'};
font-size: 0.65rem;
font-family: 'Berkeley Mono', 'Roboto', sans-serif;
font-weight: 600;
background: ${(props) => props.active ? props.theme.controlsBackgroundHover : props.theme.controlsBackground};
color: ${(props) => props.theme.controlsColor};
fill: ${(props) => props.theme.controlsColor};
border: 0.5px solid ${(props) => props.theme.controlsBorder};
${(props) => props.hoverable && `
  cursor: pointer;
  &:hover {
    background: ${props.disabled ? props.theme.controlsBackground : props.theme.controlsBackgroundHover};
  }
`}
`;

const FlexWrapper = styled.div<any>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

export const FlowControlPanelButton = forwardRef((props: ButtonProps, ref: any) => {
  const { i, component, x = 0, y = 0, width = 1, height = 1, disabled=false, hoverable=true, active=false } = props;
  return (
    <ButtonWrapper key={i} id={i} ref={ref} disabled={disabled} hoverable={hoverable} active={active}>
      {component}
    </ButtonWrapper>
  );
});


export interface FlowControlPanelProps {
  buttons?: ButtonProps[];
  cols?: number;
}

const FlowControlPanel = ({ buttons=[], cols=5 }: FlowControlPanelProps) => {
  const ReactGridLayout = WidthProvider(RGL);
  const layout: any[] = useMemo(() => {
    return buttons.map((button, index) => {
      return {
        i: button?.i || index.toString(),
        x: button?.x || index,
        y: button?.y || index,
        w: button?.width || 1,
        h: button?.height || 1,
        isBounded: true,
        hoverable: true,
        disabled: false,
        active: false,
      };
    });
  }, [buttons]);

  const buttonRefs: React.RefObject<HTMLDivElement>[] = useMemo(() => {
    return buttons.map(() => React.createRef());
  }, [buttons]);

  return (
    <ControlPanelWrapper>
      <ReactGridLayout
        className="layout"
        cols={cols}
        layout={layout}
        autoSize={true}
        isDraggable={true}
        isResizable={false}
        useCSSTransforms={true}
        compactType={null}
      >
        {buttons.map((button, index) => {
          return (
            <FlexWrapper key={layout[index].i} {...button} ref={buttonRefs[index]}>
              <FlowControlPanelButton {...button} />
            </FlexWrapper>
          );
        })}
      </ReactGridLayout>
    </ControlPanelWrapper>
  );
};

export default FlowControlPanel;
