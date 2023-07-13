import { useCallback, useEffect, useMemo, useState } from "react";
import { nanoid } from "nanoid";
import { set, throttle } from "lodash";
import { useStoreApi } from "reactflow";

// TODO: fix reactflow doesn't update properly based on store state
const useViewportState = (reactFlow: any, rfInstanceDom: any, ready: any) => {
  const store = useStoreApi();
  const [minZoomReached, setMinZoomReached] = useState(false);
  const [maxZoomReached, setMaxZoomReached] = useState(false);
  const [userInputZoom, setUserInputZoom] = useState<any>(0);
  const [pan, setPan] = useState({ x: -1, y: -1 });
  const [zoom, setZoom] = useState(-1);

  const getFlowSize = useCallback(() => {
    if (!rfInstanceDom) return { width: 0, height: 0 };
    const boundingBox = rfInstanceDom!.getBoundingClientRect();
    return { width: boundingBox.width, height: boundingBox.height };
  }, [rfInstanceDom]);

  const validateZoomInput = useCallback((zoom: any) => {
    const zoomNum = Number(zoom) 
    // Ensure input is a real number
    if (isNaN(zoomNum)) {
      console.log("Invalid input: Zoom level must be a real number");
      return reactFlow.getZoom();
    }

    // Ensure input is non-negative
    if (zoomNum <= 0) {
      console.log("Invalid input: Zoom level can't be negative");
      return;
    }

    return zoom;
  }, [reactFlow]);

  const onZoomInputChange = useCallback((value: any) => {
    if (!ready) return;
    setUserInputZoom(value);
    const parsedZoom = validateZoomInput(value);
    reactFlow.zoomTo(parsedZoom ?? reactFlow?.getZoom());
  }, [ready, validateZoomInput, reactFlow]);

  useEffect(() => {
    const unsubscribe = store.subscribe((state) => {
      const zoom = state?.transform?.[2] ?? 0;
      const panX = state?.transform?.[0] ?? 0;
      const panY = state?.transform?.[1] ?? 0;
      const minZoom = state?.minZoom ?? Infinity;
      const maxZoom = state?.maxZoom ?? Infinity;
      setMinZoomReached(zoom <= minZoom);
      setMaxZoomReached(zoom >= maxZoom);
      setZoom(zoom);
      setPan({ x: panX, y: panY });
    });
  
    return () => unsubscribe();
  }, [store]);

  return {
    pan,
    zoom,
    userInputZoom,
    setUserInputZoom,
    getFlowSize,
    minZoomReached,
    maxZoomReached,
    onZoomInputChange,
  };
};

export default useViewportState;
