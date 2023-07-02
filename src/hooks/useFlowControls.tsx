import { FitViewOptions, Node, getRectOfNodes, useNodesInitialized, useReactFlow, useStore, useStoreApi, useViewport } from "reactflow";
import { FlowFitViewOptions } from "../components/Flow/FlowConstants";
import { useCallback, useEffect, useMemo } from "react";
import { toPng } from "html-to-image";
import { downloadImage } from "../components/Flow/FlowConstants";
import { useFlowState, useStrokeState, useInteractiveState, useFreehandState, useMouseState, useSelectedState, useLayoutState, useZoomState, useMouseCursorState, useDraggableState, useEdgeCreationState } from ".";

// one hook to rule them all
const useFlowControls = (flowRef?: any, fitOnLoad: boolean = true, id='flow') => {
  const store = useStoreApi();
  const reactFlow = useReactFlow();
  const storeState = useStore((state: any) => state);
  const rfInstanceDom = document.getElementById(id);
  const nodesInitialized = useNodesInitialized({ includeHiddenNodes: true });

  const selectedState = useSelectedState(storeState, reactFlow);
  const layoutState = useLayoutState(reactFlow, storeState);
  const interactiveState = useInteractiveState();
  const zoomState = useZoomState(storeState, reactFlow);
  const strokeState = useStrokeState();
  const mouseState = useMouseState(rfInstanceDom);
  const flowState = useFlowState(storeState, reactFlow, rfInstanceDom, nodesInitialized);
  const freehandState = useFreehandState(storeState, reactFlow, mouseState, interactiveState, flowState, strokeState.color, strokeState.strokeWidth, strokeState.strokeStyle);
  const mouseCursorState = useMouseCursorState(interactiveState, freehandState);
  const dragState = useDraggableState(reactFlow, flowRef);
  const edgeCreationState = useEdgeCreationState(storeState, reactFlow, rfInstanceDom, layoutState, fitOnLoad);

  const goToReactFlow = useCallback(() => { window.open('https://reactflow.dev/', '_blank') }, []);

  const onPaneClick = useCallback(() => { 
    strokeState.closeColorPicker() 
  }, [strokeState]);

  // Get the size (width, height) of the given node
  const getNodeSize = useCallback((id: any) => {
    const node = storeState.nodeInternals.get(id);
    return { width: node?.width, height: node?.height };
  }, [storeState.nodeInternals]);

  // Center the given node
  const centerNode = useCallback((node: Node<any>, select: any = true) => {
    if (select) {
      selectedState.selectNode(node);
    }
    layoutState.fitNodesWithOffset([node]);
  }, [layoutState, selectedState]);

  // Take a snapshot of the current flow, with or without the background
  const takeSnapshot = useCallback((includeBackground = true) => {
    let flow: any = document.querySelector('.react-flow');
    if (!includeBackground) {
      flow = document.querySelector('.react-flow__pane');
    }
    toPng(flow, {
      filter: (node: any) => {
        // we don't want to add the minimap and the controls to the image
        if ( node?.classList?.contains("react-flow__minimap") || node?.classList?.contains("react-flow__controls") ) {
          return false;
        }
        return true;
      }
    }).then(downloadImage);
  }, []);

  useEffect(() => {
    if (fitOnLoad && nodesInitialized && reactFlow.viewportInitialized) {
      setTimeout(() => {
        layoutState.fitNodesWithOffset();
      }, 100);
    }
 }, [fitOnLoad, nodesInitialized, reactFlow.viewportInitialized, layoutState.fitNodesWithOffset]);

  return useMemo(() => ({
    ...store,
    ...reactFlow,
    ...selectedState,
    ...mouseState,
    ...strokeState,
    ...freehandState,
    ...interactiveState,
    ...layoutState,
    ...zoomState,
    ...mouseCursorState,
    ...flowState,
    ...dragState,
    ...edgeCreationState,
    goToReactFlow,
    onPaneClick,
    nodesInitialized,
    getNodeSize,
    centerNode,
    takeSnapshot,
    
  }), [
    store,
    reactFlow,
    selectedState,
    mouseState,
    strokeState,
    freehandState,
    interactiveState,
    layoutState,
    zoomState,
    mouseCursorState,
    flowState,
    dragState,
    edgeCreationState,
    goToReactFlow,
    onPaneClick,
    nodesInitialized,
    getNodeSize,
    centerNode,
    takeSnapshot,
  ]);
};

export default useFlowControls;

