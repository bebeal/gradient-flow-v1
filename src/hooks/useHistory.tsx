import { useCallback, useEffect, useMemo, useState } from "react";

const useHistory = (reactFlow: any, viewportState: any, isFlowReady: boolean = false) => {
  const [saveState, setSaveState] = useState<any>(null);
  const [initialSave, setInitialSave] = useState(false);

  const save = useCallback(() => {
    if (!reactFlow) return;
    setTimeout(() => {
      const saveState = reactFlow.toObject();
      setSaveState(saveState);
    }, 300);
  }, [reactFlow]);

  const restore = useCallback(() => {
    if (saveState) {
      reactFlow.setNodes(saveState.nodes);
      reactFlow.setEdges(saveState.edges);
      reactFlow.setViewport(saveState.viewport);
    }
  }, [reactFlow, saveState]);

  useEffect(() => {
    if (isFlowReady && !initialSave) {
      save();
      setInitialSave(true);
    }
  }, [isFlowReady, initialSave, save]);

  return useMemo(() => {
    return {
      save,
      restore,
    }
  }, [
    save,
    restore,
  ]);
};

export default useHistory;
