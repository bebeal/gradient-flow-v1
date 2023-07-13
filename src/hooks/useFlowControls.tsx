import { FitViewOptions, Node, getRectOfNodes, useEdgesState, useNodesInitialized, useNodesState, useReactFlow, useStore, useStoreApi, useViewport } from "reactflow";
import { FlowFitViewOptions } from "../components/Flow/FlowConstants";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toPng } from "html-to-image";
import { downloadImage } from "../components/Flow/FlowConstants";
import { useStrokeState, useInteractiveState, useFreehandState, useMouseState, useSelectedState, useElkLayout, useMouseCursorState, useDraggableState, useHistory, useButtonStore, useFlowActions, useViewportState, useEdgeState } from ".";

// one hook to rule them all
const useFlowControls = (initialNodes: any = [], initialEdges: any = [], flowRef?: any,  fitOnLoad: boolean = true, id='flow') => {
  // state
  const [ready, setReady] = useState(false);          // used to prevent some hooks from running until the flow is ready
  const [canFit, setCanFit] = useState(false);        // used to prevent the flow from fitting until the nodes are initialized

  // data
  const reactFlow = useReactFlow();
  const store = useStoreApi();
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  
  // const storeState = useStore((state: any) => state);
  const rfInstanceDom = document.getElementById(id);

  // sub-hooks
  const nodesInitialized = useNodesInitialized({ includeHiddenNodes: true });
  const selectedState = useSelectedState(reactFlow);
  const interactiveState = useInteractiveState();
  const strokeState = useStrokeState();
  const dragState = useDraggableState(reactFlow, flowRef);
  const mouseState = useMouseState(rfInstanceDom, ready);
  const viewportState = useViewportState(reactFlow, rfInstanceDom, ready);
  const freehandState = useFreehandState(reactFlow, mouseState, interactiveState, viewportState, strokeState, ready);
  const mouseCursorState = useMouseCursorState(interactiveState, freehandState);
  const edgeState = useEdgeState(reactFlow, rfInstanceDom, viewportState, fitOnLoad);
  const flowActions = useFlowActions(canFit, reactFlow, strokeState, selectedState, viewportState);
  const layoutState = useElkLayout(reactFlow, flowActions, ready);
  const history = useHistory(reactFlow, viewportState, ready && flowActions.fitOnInitDone);

  // button store
  const buttonStore = useButtonStore(ready, flowActions, reactFlow, strokeState, freehandState, selectedState, layoutState, viewportState, history, interactiveState);

  useEffect(() => {
    if (canFit && fitOnLoad) {
      flowActions.fitNodesWithOffset();
      setReady(true);
    }
  }, [canFit, fitOnLoad, flowActions.fitNodesWithOffset, reactFlow]);

  useEffect(() => {
    if (!canFit && nodesInitialized && reactFlow.viewportInitialized) {
      setCanFit(true);
    }
  }, [nodesInitialized, reactFlow, reactFlow.viewportInitialized, canFit]);

  return useMemo(() => ({
    ...reactFlow,
    ...selectedState,
    ...mouseState,
    ...strokeState,
    ...freehandState,
    ...interactiveState,
    ...layoutState,
    ...mouseCursorState,
    ...dragState,
    ...edgeState,
    ...history,
    ...viewportState,
    ...flowActions,
    ...buttonStore,
    store,
    id,
    nodes,
    setNodes,
    onNodesChange,
    edges,
    setEdges,
    onEdgesChange,
    ready,
    nodesInitialized,
  }), [
    reactFlow,
    selectedState,
    mouseState,
    strokeState,
    freehandState,
    interactiveState,
    layoutState,
    mouseCursorState,
    dragState,
    edgeState,
    history,
    viewportState,
    flowActions,
    buttonStore,
    store,
    id,
    nodes,
    setNodes,
    onNodesChange,
    edges,
    setEdges,
    onEdgesChange,
    ready,
    nodesInitialized,
  ]);
};

export default useFlowControls;

