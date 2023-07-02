import { toPng } from "html-to-image";
import { ControlProps, ReactFlowState, useStoreApi, useStore, useReactFlow, ControlButton, Controls, useOnViewportChange, useNodesInitialized, Viewport } from "reactflow";
import styled, { createGlobalStyle, useTheme } from "styled-components";
import { createRef, useCallback, useEffect, useRef, useState } from "react";
import { Attribute, CenteredFlexBox, Disabled, EmptySpace, Label, LabeledArea, noop } from "../../../constants";
import { ColorPalette, BigAdd, BigSubtract, CameraFilled, CenterToFit, LockedFilled, UnlockedFilled, Pencil } from "../../../svgs/icons";
import Select, { Option, SelectButton } from "../../Select/Select";
import Popup from "../../Popup/Popup";
import LabeledAttributes from "../../LabeledAttribute/LabeledAttribute";
import PathEditor from "../../PathEditor/PathEditor";

export interface CustomControlsProps extends ControlProps {
  showZoom?: boolean;
  showFitView?: boolean;
  showInteractive?: boolean;
  flowControls?: any;
  showSnapShot?: boolean;
  showAttribution?: boolean;
  showZoomInput?: boolean;
  showLayoutSelect?: boolean;
  showFreehandMode?: boolean;
  showPathEditor?: boolean;
  showDebugInfo?: boolean;
};

export const Button = styled.button<any>`
  z-index: 50;
  color: ${(props) => props.theme.controlsColor};
  fill: ${(props) => props.theme.controlsColor};
  background: transparent;
  border: none;
  border-radius: 4px;
  font-size: 0.65rem;
  width: 100%;
  height: 100%;
  font-weight: bold;
  margin: 0;
  padding: 0;
  text-align: center;
  text-transform: capitalize;
  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;
`;


export const ControlButtonStyled = styled.div<any>`
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
  background: ${(props) => props.selected ? props.theme.controlsBackgroundHover : props.theme.controlsBackground};
  color: ${(props) => props.theme.controlsColor};
  fill: ${(props) => props.theme.controlsColor};
  border: 0.5px solid ${(props) => props.theme.controlsBorder};
  ${(props) => props.isHoverable && `
    cursor: pointer;
    &:hover {
      background: ${props.disabled ? props.theme.controlsBackground : props.theme.controlsBackgroundHover};
    }
  `}
`;

export const ControlInputStyled = styled.input<any>`
  z-index: 50;
  width: auto;
  min-width: 6ch;
  max-width: 8ch;
  height: auto;
  text-align: center;
  overflow: hidden;
  padding: 0;
  margin: 0;
  background: ${(props) => props.theme.minimapMaskBackground};
  color: ${(props) => props.theme.controlsColor};
  border: 1px solid transparent;
  display: block;
  box-sizing: border-box;
  border-radius: 4px;
  &:focus, &:focus-visible {
    outline: 1px solid ${(props) => props.theme.controlsColor};
  }
`;

export const ControlsStyled = styled.div<any>`
  z-index: 50;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap-reverse;
  justify-content: center;
  align-items: stretch;
  
  width: 100%;
  height: auto;
  overflow: hidden;
  background: ${(props) => props.theme.controlsBackground};
`;


const FlowControls = (props: CustomControlsProps) => {
  const {
    flowControls,
    showZoom = true,
    showFitView = true,
    showInteractive = true,
    showSnapShot = true,
    showAttribution = true,
    showZoomInput = true,
    showLayoutSelect = true,
    showFreehandMode = true,
    showPathEditor = true,
    showDebugInfo = true,
  } = props;
  const theme = useTheme();
  const pathEditorButtonRef = createRef();

  const getLabeledArea = (title?: any, value?: any) => {
    return (
      <LabeledArea theme={theme}>
        <Label theme={theme}>{title}:</Label>
        <Attribute theme={theme}>{value}</Attribute>
      </LabeledArea>
    );
  };
  
  const labeledButton: any = (name?: any, title?: any, value?: any) => {
    return {
      name: name,
      title: title,
      width: 'auto',
      buttonComponent: getLabeledArea(title, value),
      isHoverable: false,
    }
  };

  const labeledAttribute: any = (name?: any, title?: any, value?: any, width: string = 'auto', labeledAttributesProps: any = {layout: 'column'}) => {
    const obj = { [title]: value }
    return {
      name: name,
      title: title,
      width: width,
      buttonComponent: <LabeledAttributes {...labeledAttributesProps}>{obj}</LabeledAttributes>,
      isHoverable: false,
    }
  };

  const iconButton = (name?: any, title?: any, onClick?: any, icon?: any, selected: any = false, disabled: boolean = false, popupRef: any = null) => {
    return {
      name: name,
      title: title,
      width: '16.667%',
      buttonComponent: (
        <Button ref={popupRef} theme={theme}><div style={{display: "flex", width: "100%", height: "100%", maxWidth: "32px",}}>{icon}</div></Button>
      ),
      onClick: onClick,
      disabled: disabled,
      selected: selected,
    };
  };

  const labeledSelector: any = (name?: any, title?: any, value?: any, handleChange?: any, options?: any) => {
    return {
      name: name,
      title: title,
      width: '33.337%',
      buttonComponent: (
        <LabeledArea theme={theme}>
          <Label theme={theme}>{name}:</Label>
          <Select value={value} onChange={handleChange} options={options} />
        </LabeledArea>
      ),
    };
  };

  const pathEditorButton = {
    name: "Path Editor",
    title: "Path Editor",
    width: '16.667%',
    buttonComponent: (
      <>
        <div style={{display: "flex", color: flowControls.color, height: "32px",}}>
          {ColorPalette}
        </div>
        {flowControls.displayColorPicker && (
          <Popup buttonRef={pathEditorButtonRef} isOpen={flowControls.displayColorPicker} onClose={flowControls.closeColorPicker}>
            <PathEditor strokeWidth={flowControls.strokeWidth} strokeStyle={flowControls.strokeStyle} onStrokeChange={flowControls.handleStrokeChange} color={flowControls.color} onColorChange={flowControls.handleColorChange}/>
          </Popup>
        )}
      </>
    ),
    ref: pathEditorButtonRef,
    onClick: flowControls.toggleColorPicker,
    disabled: false,
    selected: flowControls.displayColorPicker,
  };

  const attributionButton = iconButton("ReactFlowAttribution", "React Flow", flowControls.goToReactFlow, <>React<br />Flow</>);
  const pencilButton = iconButton("Pencil", "Pencil", flowControls.toggleFreehandMode, Pencil, flowControls.freehandMode);
  const layoutSelector = labeledSelector("Layout", "Layout", flowControls.layout, flowControls.handleLayoutChange, flowControls.layoutOptions);
  const snapShotButton = iconButton("Snapshot", "Snapshot", flowControls.takeSnapshot, CameraFilled);
  const zoomInButton = iconButton("Zoom In", "Zoom In", flowControls.zoomIn, BigAdd, false, flowControls.maxZoomReached);
  const zoomOutButton = iconButton("Zoom Out", "Zoom Out", flowControls.zoomOut, BigSubtract, false, flowControls.minZoomReached);
  const zoomInputButton = labeledButton("Zoom", "Zoom", <ControlInputStyled theme={theme} value={flowControls.getZoom().toFixed(2)} onChange={flowControls.onZoomInputChange} />);
  const fitViewButton = iconButton("Fit View", "Fit View", flowControls.fitView, CenterToFit);
  const interactiveButton = iconButton("Interactive", "Toggle Interactivity", flowControls.toggleIsInteractive, flowControls.isInteractive ? UnlockedFilled : LockedFilled);
  const mouseCoordsButton = labeledAttribute("Mouse Coords", "Mouse Coords", flowControls.mouseCoords);
  const flowCoordsButton = labeledAttribute("Flow Coords", "Flow Coords", flowControls.flowCoords);
  const numberOfNodesButton = labeledAttribute("Number of Nodes", "Num Nodes", flowControls.getNodes().length, '50%', {precision: 0});
  const numberOfEdgesButton = labeledAttribute("Number of Edges", "Num Edges", flowControls.getEdges().length, '50%', {precision: 0});
  const nodesButton = labeledAttribute("Nodes", "Nodes", flowControls.nodesMap, '50%', {layout: 'column'});
  const edgesButton = labeledAttribute("Edges", "Edges", flowControls.edgesMap, '50%', {layout: 'column'});
  const flowSizeButton = labeledAttribute("Flow Size", "Flow Size", flowControls.getFlowSize(), '50%');
  const flowPanButton = labeledAttribute("Flow Pan", "Flow Pan", flowControls.pan, '50%');

  const zoomButtons: any = [
    showZoom ? zoomOutButton : <></>,
    showZoomInput ? zoomInputButton : <></>,
    showZoom ? zoomInButton : <></>,
  ];

  const infoButtons: any = [
    mouseCoordsButton,
    flowCoordsButton,
    numberOfNodesButton,
    numberOfEdgesButton,
    flowSizeButton,
    flowPanButton,
    nodesButton,
    edgesButton,
  ];

  const controlButtons: any = [];
  showAttribution && controlButtons.push(attributionButton);
  showZoom && controlButtons.push(...zoomButtons);
  showSnapShot && controlButtons.push(snapShotButton);

  showInteractive && controlButtons.push(interactiveButton);
  showFitView && controlButtons.push(fitViewButton);
  showLayoutSelect && controlButtons.push(layoutSelector);
  showFreehandMode && controlButtons.push(pencilButton);
  showPathEditor && controlButtons.push(pathEditorButton);

  showDebugInfo && controlButtons.push(...infoButtons);

  const getButton = (button: any) => {
    let buttonComponent = button.buttonComponent;
    if (button?.disabled) {
      buttonComponent = <Disabled>{buttonComponent}</Disabled>
    }
    return (
      <ControlButtonStyled ref={button?.ref} selected={button?.selected || false} disabled={button?.disabled || false} width={button?.width} height={button?.height || 'auto'} theme={theme} key={button?.name || ''} onClick={button?.onClick} title={button?.title || ''} padding={button?.padding || '4px'} isHoverable={button?.isHoverable ?? true}>
        {buttonComponent}
      </ControlButtonStyled>
    );
  };

  const allButtons = [
    controlButtons?.map((button: any) => { return getButton(button); })
  ];

  return (
    <ControlsStyled theme={theme} showZoom={false} showFitView={false} showInteractive={false}>
      {allButtons}
    </ControlsStyled>
  );
};

  export default FlowControls;
