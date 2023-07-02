import { useCallback, useState } from "react";
import { FlowFitViewOptions, Layout } from "../components/Flow/FlowConstants";
import { FitViewOptions, getRectOfNodes } from "reactflow";

const useLayoutState = (reactFlow: any, storeState: any) => {
  const layoutOptions = Object.values(Layout);
  const [layout, setLayout] = useState<Layout>(Layout.Default);

  const handleLayoutChange = useCallback((newLayout: any) => {
    setLayout(newLayout);
  }, []);

  // Fits the viewport to bounds of the given nodes
  const fitNodesWithOffset = useCallback(( nodes?: any, offset: { x: number; y: number } = { x: 0, y: 0 }, fitViewOptions: FitViewOptions = FlowFitViewOptions) => {
    if (reactFlow.viewportInitialized) {
      const rect = getRectOfNodes(nodes || reactFlow.getNodes());
      const newRect = { x: rect.x + offset.x, y: rect.y + offset.y, width: rect.width, height: rect.height, };
      reactFlow.fitBounds(newRect, fitViewOptions);
    }
  }, [reactFlow]);

  return {
    layout,
    setLayout,
    handleLayoutChange,
    layoutOptions,
    fitNodesWithOffset,
  };
};

export default useLayoutState;
