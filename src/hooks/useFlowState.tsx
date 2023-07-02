import { useCallback, useEffect, useState } from "react";
import { nanoid } from "nanoid";

const useFlowState = (storeState: any, reactFlow: any, rfInstanceDom: any, nodesInitialized: any) => {
  const [pan, setPan] = useState({ x: 0, y: 0 });

    useEffect(() => {
      if (!nodesInitialized) return;
      setPan({x: storeState?.transform[0], y: storeState?.transform[1]});
    }, [nodesInitialized, storeState?.transform]);

    const nodesMap = reactFlow.getNodes().reduce((acc: any, node: any) => {
      acc[node?.data?.label || node?.id || nanoid()] = node
      return acc;
    }, {});
    const edgesMap = reactFlow.getEdges().reduce((acc: any, edge: any) => {
      acc[edge?.data?.label || edge?.id || nanoid()] = edge
      return acc;
    }, {});

  const getFlowSize = useCallback(() => {
    if (!rfInstanceDom) return { width: 0, height: 0 };
    const boundingBox = rfInstanceDom!.getBoundingClientRect();
    return { width: boundingBox.width, height: boundingBox.height };
  }, [rfInstanceDom]);

  return {
    pan,
    setPan,
    getFlowSize,
    nodesMap,
    edgesMap
  };
};

export default useFlowState;
