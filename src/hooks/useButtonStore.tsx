import { createRef, useCallback, useEffect, useMemo, useState } from "react";
import {
  Button,
  ClickableButton,
  LabeledInput,
  LabeledSelector,
  PopupButton,
  ToggleButton,
} from "../components/Flow/FlowControls/FlowButtons";
import { ColorPalette, Pencil, ColoredPencil, CameraFilled, BigAdd, BigSubtract, CenterToFit, UnlockedFilled, LockedFilled, Save, History } from "../svgs";
import PathEditor from "../components/PathEditor/PathEditor";
import { FlowControlPanelButtonProps } from "../components/Flow/FlowControls/FlowControlPanelButton";
import Popup from "../components/Popup/Popup";
import { AllOptions } from "./elkOptions";
import { nanoid } from "nanoid";
const useButtonStore = (ready: any, flowActions: any, reactFlow: any, strokeState: any, freehandState: any, selectedState: any, layoutState: any, viewportState: any, history: any, interactiveState: any) => {
  const [isFlowReady, setIsFlowReady] = useState(ready || false);
  useEffect(() => {
    setIsFlowReady(ready || false);
  }, [ready]);

  const AttributionButton: FlowControlPanelButtonProps = useMemo(() => {
    return {
      component: (props: any) => !isFlowReady ? <></> : (
        <ClickableButton onClick={flowActions?.goToReactFlow}>        
            React
            <br />
            Flow       
        </ClickableButton>
      ),
      x: 0,
      y: 0,
      w: 1,
      h: 1,
    };
  }, [isFlowReady, flowActions?.goToReactFlow]);

  const PathEditorTool: FlowControlPanelButtonProps = useMemo(() => {
    return {
      component: (props: any) => !isFlowReady ? <></> : (
        <PopupButton color={strokeState.color} buttonIcon={ColorPalette} togglePopup={strokeState.toggleColorPicker} isOpen={strokeState.displayColorPicker} onClose={strokeState.closeColorPicker}>
            <PathEditor strokeWidth={strokeState.strokeWidth} strokeStyle={strokeState.strokeStyle} onStrokeChange={strokeState.handleStrokeChange} color={strokeState.color} onColorChange={strokeState.handleColorChange}/>
        </PopupButton>
      ),
      x: 1,
      y: 0,
      w: 1,
      h: 1,
    };
  }, [isFlowReady, strokeState.closeColorPicker, strokeState.color, strokeState.displayColorPicker, strokeState.handleColorChange, strokeState.handleStrokeChange, strokeState.strokeStyle, strokeState.strokeWidth, strokeState.toggleColorPicker]);

  const PencilButton: FlowControlPanelButtonProps = useMemo(() => {
    return {
      component: (props: any) => !isFlowReady ? <></> : (
        <ToggleButton
          onClick={freehandState?.toggleFreehandMode}
          active={freehandState?.freehandMode}
          defaultValue={Pencil}
          activeValue={ColoredPencil}
          color={strokeState?.color}
        />
      ),
      x: 2,
      y: 0,
      w: 1,
      h: 1
    };
  }, [isFlowReady, strokeState?.color, freehandState?.freehandMode, freehandState?.toggleFreehandMode]);

  const SnapshotButton = useMemo(() => {
    return {
      component: (props: any) => !isFlowReady ? <></> : (
        <ClickableButton onClick={flowActions?.takeSnapshot}>
          {CameraFilled}
        </ClickableButton>
      ),
      x: 3,
      y: 0,
      w: 1,
      h: 1
    }
  }, [isFlowReady, flowActions?.takeSnapshot]);

  const ZoomInButton = useMemo(() => {
    return {
      component: (props: any) => !isFlowReady ? <></> : (
        <ClickableButton onClick={reactFlow?.zoomIn} disabled={viewportState.maxZoomReached}>
          {BigAdd}
        </ClickableButton>
      ),
      x: 0,
      y: 1,
      w: 1,
      h: 1
    }
  }, [isFlowReady, viewportState.maxZoomReached, reactFlow?.zoomIn]);

  const ZoomOutButton = useMemo(() => {
    return {
      component: (props: any) => !isFlowReady ? <></> : (
        <ClickableButton onClick={reactFlow?.zoomOut} disabled={viewportState.minZoomReached}>
        {BigSubtract}
      </ClickableButton>
      ),
      x: 3,
      y: 1,
      w: 1,
      H: 1
    }
  }, [isFlowReady, viewportState.minZoomReached, reactFlow?.zoomOut]);

  const ZoomInputButton = useMemo(() => {
    return {
      component: (props: any) => !isFlowReady ? <></> : (
        <LabeledInput label={'Zoom'} value={viewportState.zoom} onChange={viewportState.onZoomInputChange}  />
      ),
      x: 1,
      y: 1,
      w: 2,
      h: 1,
    }
  }, [isFlowReady, viewportState.zoom, viewportState.onZoomInputChange]);

  const FitViewButton = useMemo(() => {
    return {
      component: (props: any) => !isFlowReady ? <></> : (
        <ClickableButton onClick={() => flowActions.fitNodesWithOffset()}>
        {CenterToFit}
      </ClickableButton>
      ),
      x: 0,
      y: 2,
    }
  }, [isFlowReady, flowActions.fitNodesWithOffset]);

  const InteractiveButton = useMemo(() => {
    return {
      component: (props: any) => !isFlowReady ? <></> : (
        <ToggleButton onClick={interactiveState.toggleIsInteractive} active={!interactiveState.isInteractive} defaultValue={UnlockedFilled} activeValue={LockedFilled} />
      ),
      x: 1,
      y: 2,
    }
  }, [isFlowReady, interactiveState.isInteractive, interactiveState.toggleIsInteractive]);

  const SaveButton = useMemo(() => {
    return {
      component: (props: any) => !isFlowReady ? <></> : (
        <ClickableButton onClick={history?.save}>
          {Save}
        </ClickableButton>
      ),
      x: 2,
      y: 2,
    }
  }, [isFlowReady, history?.save]);

  const RestoreButton = useMemo(() => {
    return {
      component: (props: any) => !isFlowReady ? <></> : (
        <ClickableButton onClick={history?.restore}>
          {History}
        </ClickableButton>
      ),
      x: 3,
      y: 2,
    }
  }, [isFlowReady, history?.restore]);

  const makeSelector = useCallback((key: any, x: number = 0, y: number = 0, id: string = '') => {
    return {
      component: (props: any) => !isFlowReady ? <></> : (
        <LabeledSelector 
          label={key}
          value={layoutState.elkOptions?.[key]}
          onChange={(value: string) => layoutState?.handleElkChange(value, key)}
          options={AllOptions[key]} 
        />
      ),
      id: 'select-' + id + '-' + key,
      x: x,
      y: y,
      w: 2,
      h: 2,
    };
  }, [isFlowReady, layoutState]);

  const makeInput = useCallback((key: any, x: number = 0, y: number = 0, id: string = '') => {
    return {
      component: (props: any) => !isFlowReady ? <></> : (
        <LabeledInput 
          label={key}
          value={layoutState.elkOptions?.[key]}
          onChange={(event: any) => layoutState.handleElkChange?.(event?.target?.value, key)}
        />
      ),
      id: 'input-' + id + '-' + key,
      x: x,
      y: y,
      w: 2,
      h: 2,
    };
  }, [isFlowReady, layoutState]);

  const ElkControlButton = useMemo(() => {
    const startX = 0;
    const startY = 3;
    const maxInRow = 2;
    const increment = 2;
  
    const layoutButtons: {[key: string]: any} = {};
    Object.keys(AllOptions).forEach((key, index) => {
      const x = startX + ((index % maxInRow) * increment);
      const y = startY + Math.floor(index / maxInRow);

      if (Array.isArray(AllOptions[key])) {
        layoutButtons[key] = makeSelector(key, x, y);
      } else {
        layoutButtons[key] = makeInput(key, x, y);
      }
    });
    // console.log('elkButtons', elkButtons);
    return layoutButtons;
  }, [makeInput, makeSelector]);
  

  return useMemo(() => {
    return {
      AttributionButton,
      PathEditorTool,
      PencilButton,
      SnapshotButton,
      ZoomInButton,
      ZoomOutButton,
      ZoomInputButton,
      FitViewButton,
      InteractiveButton,
      SaveButton,
      RestoreButton,
      ElkControlButton
    };
  }, [ 
    AttributionButton, 
    PathEditorTool, 
    PencilButton,
    SnapshotButton,
    ZoomInButton,
    ZoomOutButton,
    ZoomInputButton,
    FitViewButton,
    InteractiveButton,
    SaveButton,
    RestoreButton,
    ElkControlButton
  ]);
};

export default useButtonStore;
