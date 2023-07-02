import React, { useRef, useState } from "react";
import { Resizable } from "re-resizable";
import styled, { useTheme } from "styled-components";


export interface PanelProps {
  handleSize?: number;
  panelPosition?: "left" | "right";
  children: React.ReactNode;
  width?: number;
}

export const PanelWrapper = styled.div<any>`
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: #333333;
  display: flex;
  flex-direction: column;
`;

export const ChildrenWrapper = styled.div<any>`
  width: 100%;
  height: 100%;
  padding-left: ${(props) => props.panelPosition === 'right' ? props.handleSize : 0}px;
  padding-right: ${(props) => props.panelPosition === 'left' ? props.handleSize : 0}px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

export const PanelDivider = styled.hr<any>`
  height: 1px !important;
  justify-content: center;
  align-items: center;
  width: ${(props) => props.width || "100%"};
  background-color: ${(props) => props.color ? props.color : props.theme.controlsBackground};
  display: flex;
`;

const HamburgerIcon = styled.div<any>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: ${(props) => props.handleSize / 2}px;
  height: 1px;
  background-color: ${(props) => props.theme.controlsColor};
  border-radius: 5px;
  &:before,
  &:after {
    left: 0;
    content: "";
    position: absolute;
    width: ${(props) => props.handleSize / 2}px;
    height: 1px;
    background-color: ${(props) => props.theme.controlsColor};
    border-radius: 5px;
  }
  &:before {
    top: -4px;
  }
  &:after {
    top: 4px;
  }
`;

const ToggleButton = styled.div<any>`
  position: absolute;
  background-color: ${(props) => props.theme.controlsOff};
  cursor: pointer;
  display: flex;
  width: ${props => props.handleSize-2}px;
  z-index: 1;
  top: 50%;
  height: 40px;
  right: ${props => props.panelPosition === 'left' ? '1px' : 'auto'};
  left: ${props => props.panelPosition === 'right' ? '1px' : 'auto'};
  &:hover {
    background: ${(props) => props.theme.controlsBorder};
  }
`;

const Panel = React.forwardRef((props: PanelProps, PanelRef: any): any => {
  const {
    handleSize = 8,
    panelPosition="left",
    children,
    width = "20%"
  } = props;
  const theme: any = useTheme();
  const [toggle, setToggle] = useState<boolean>(false);

  const toggleButton = (event: any) => {
    const size = toggle ? width : handleSize-(handleSize/2);
    setToggle(!toggle);
    PanelRef.current.updateSize({width: size});
  };

  const wrapAsResizeable = (element: any) => {
    return (
      <Resizable
        ref={PanelRef}
        bounds="window"
        boundsByDirection={true}
        scale={1}
        resizeRatio={1}
        minWidth={handleSize}
        style={{
          zIndex: 50,
        }}
        defaultSize={{
          width: width,
          height: "auto",
        }}
        enable={{
          top: false,
          right: panelPosition === "left",
          bottom: false,
          left: panelPosition === "right",
          topRight: false,
          bottomRight: false,
          bottomLeft: false,
          topLeft: false,
      }}
      handleStyles={{
        right: panelPosition === "left" ? {
          backgroundColor: theme?.controlsBackground,
          right: 0,
          width: handleSize,
          borderLeft: `1px solid ${theme?.controlsBorder}`,
          borderRight: `1px solid ${theme?.controlsBorder}`,
        } : undefined,
        left: panelPosition === "right" ? {
          backgroundColor: theme?.controlsBackground,
          left: 0,
          width: handleSize,
          borderRight: `1px solid ${theme?.controlsBorder}`,
          borderLeft: `1px solid ${theme?.controlsBorder}`,
        } : undefined
      }}
    >
      {element}
    </Resizable>
    );
  };

  return wrapAsResizeable(
    <>
      <PanelWrapper theme={theme}>
        <ChildrenWrapper theme={theme} handleSize={handleSize} panelPosition={panelPosition}>
          {children}
        </ChildrenWrapper>
      </PanelWrapper>
      <ToggleButton 
        onMouseDown={toggleButton} 
        onMouseUp={toggleButton} 
        theme={theme} 
        handleSize={handleSize} 
        panelPosition={panelPosition}
      >
        <HamburgerIcon handleSize={handleSize} panelPosition={panelPosition}/>
      </ToggleButton>    
    </>
  );
});

export default Panel;
