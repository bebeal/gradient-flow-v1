import { useState, useEffect, useCallback } from 'react';

const useMouseState = (rfInstanceDom: any, flowControlsReady: boolean = false) => {
  const [flowCoords, setFlowCoords] = useState({ x: 0, y: 0 });
  const [mouseCoords, setMouseCoords] = useState({ x: 0, y: 0 });

  const updateMousePosition = useCallback((event: any) => {
      if (!rfInstanceDom || !flowControlsReady) return;

      const rect = rfInstanceDom?.getBoundingClientRect() || {left: 0, top: 0};
      
      const flowX = (event.clientX - rect.left);
      const flowY = (event.clientY - rect.top);

      setFlowCoords({ 
        x: flowX || 0, 
        y: flowY || 0,
      });
      setMouseCoords({ x: event.clientX, y: event.clientY });
      
  }, [rfInstanceDom, flowControlsReady]);

  useEffect(() => {
    if (!rfInstanceDom || !flowControlsReady) return;
    
    window.addEventListener("mousemove", updateMousePosition);
    
    return () => window.removeEventListener("mousemove", updateMousePosition);
  }, [flowControlsReady, rfInstanceDom, updateMousePosition]);

  return {
    flowCoords,
    mouseCoords,
  };
};

export default useMouseState;
