import { useCallback, useEffect, useState } from "react";

const useZoomState = (storeState: any, reactFlow: any) => {
  const [minZoomReached, setMinZoomReached] = useState(false);
  const [maxZoomReached, setMaxZoomReached] = useState(false);

  const onZoomInputChange = useCallback((event: any) => {
    const zoom = event.target.value;

    // Ensure input is a real number
    if (isNaN(zoom)) {
      console.log("Invalid input: Zoom level must be a real number");
      return;
    }

    // Ensure input is non-negative
    const parsedZoom = Number(zoom);
    if (parsedZoom < 0) {
      console.log("Invalid input: Zoom level can't be negative");
      return;
    }

    const currentZoom = reactFlow.getZoom();
    if (parsedZoom !== currentZoom && parsedZoom) {
      reactFlow.zoomTo(parsedZoom);
    }
  }, [reactFlow]);

  useEffect(() => {
    setMinZoomReached(parseFloat(storeState.transform[2].toFixed(2)) <= parseFloat(storeState.minZoom.toFixed(2)));
    setMaxZoomReached(parseFloat(storeState.transform[2].toFixed(2)) >= parseFloat(storeState.maxZoom.toFixed(2)));
  }, [storeState.transform, storeState.minZoom, storeState.maxZoom]);

  return {
    minZoomReached,
    maxZoomReached,
    onZoomInputChange,
  }
};

export default useZoomState;
