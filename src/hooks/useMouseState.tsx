import { useState, useEffect, useCallback } from 'react';

const useMouseState = (rfInstanceDom: any) => {
  const [flowCoords, setFlowCoords] = useState({ x: 0, y: 0 });
  const [mouseCoords, setMouseCoords] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (event: any) => {
      const rect = rfInstanceDom?.getBoundingClientRect() || {left: 0, top: 0};
      
      const flowX = (event.clientX - rect.left);
      const flowY = (event.clientY - rect.top);

      setFlowCoords({ 
        x: flowX, 
        y: flowY
      });
      setMouseCoords({ x: event.clientX, y: event.clientY });
    };
    window.addEventListener("mousemove", updateMousePosition);
    return () => window.removeEventListener("mousemove", updateMousePosition);
  }, [rfInstanceDom]);

  return {
    flowCoords,
    mouseCoords
  }
};

export default useMouseState;
