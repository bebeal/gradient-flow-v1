import { toPng } from "html-to-image";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Edge, FitViewOptions, getRectOfNodes, Node } from "reactflow";
import { FlowFitViewOptions, downloadImage } from "../components";

const useFlowActions = (ready: any, reactFlow: any, strokeState: any, selectedState: any, viewportState: any) => {
  const [fitOnInitDone, setFitOnInitDone] = useState(false);

  const goToReactFlow = useCallback(() => { window.open('https://reactflow.dev/', '_blank') }, []);

  const onPaneClick = useCallback(() => { 
    strokeState.closeColorPicker() 
  }, [strokeState]);

  // Get the size (width, height) of the given node
  const getNodeSize = useCallback((id: any) => {
    const node = reactFlow.getNode(id);
    return { width: node?.width, height: node?.height };
  }, [reactFlow]);

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

  // Fits the viewport to bounds of the given nodes
  const fitNodesWithOffset = useCallback(( nodes?: any, offset: { x: number; y: number } = { x: 0, y: 0 }, fitViewOptions: FitViewOptions = FlowFitViewOptions) => {
    if (!ready) return;
    window.requestAnimationFrame(() => {
      const nodesToCenter = nodes || reactFlow.getNodes() || [];
      if (nodesToCenter.length === 0) return;
      const rect = getRectOfNodes(nodesToCenter);
      const newRect = { x: rect.x + offset.x, y: rect.y + offset.y, width: rect.width, height: rect.height, };
      reactFlow.fitBounds(newRect, fitViewOptions);
    });
    if (ready && !fitOnInitDone) {
      setFitOnInitDone(true);
    }
  }, [ready, fitOnInitDone, reactFlow]);

  // Center the given node
  const centerNode = useCallback((node: Node<any>, select: any = true) => {
    if (select) {
      selectedState.selectNode(node);
    }
    fitNodesWithOffset([node]);
  }, [fitNodesWithOffset, selectedState]);

  return useMemo(() => {
    return {
      goToReactFlow,
      onPaneClick,
      getNodeSize,
      takeSnapshot,
      fitNodesWithOffset,
      centerNode,
      fitOnInitDone,
    }
  }, [
    goToReactFlow,
    onPaneClick,
    getNodeSize,
    takeSnapshot,
    fitNodesWithOffset,
    centerNode,
    fitOnInitDone,
  ]);
};

export default useFlowActions;
