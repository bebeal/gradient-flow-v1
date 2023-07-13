import { max } from "lodash";
import { useState, useCallback, useMemo } from "react";
import { Node } from "reactflow";
import { StrokeStyleOptions, StrokeStyles } from "../components/StrokePicker/StrokePicker";
import { FlowNodeTypes } from "../components";

const useFreehandState = (reactFlow: any, mouseState: any, interactiveState: any, flowState: any, strokeState: any, ready: boolean = false) => {
  const [freehandMode, setFreehandMode] = useState(false);
  const [drawing, setDrawing] = useState(false);
  const [path, setPath] = useState<any>([]);
  const [id, setId] = useState(0);
  const [mins, setMins] = useState<any>([]);
  const [maxs, setMaxs] = useState<any>([]);

  const getId = useCallback(() => {
    setId(id + 1);
    return `freehand-${id}`;
  }, [id]);

  const toggleFreehandMode = useCallback(() => {
    const newFreehandMode = !freehandMode;
    setFreehandMode(newFreehandMode);
    interactiveState.setPanOnDrag(!newFreehandMode);
  }, [freehandMode, interactiveState]);

  const handleMouseDown = useCallback((e: any) => {
    if (!freehandMode || !ready) { return; }
    e.preventDefault();
    setDrawing(true);
    setPath([{x: mouseState.flowCoords.x, y: mouseState.flowCoords.y}]);
    setMins([mouseState.flowCoords.x, mouseState.flowCoords.y]);
    setMaxs([mouseState.flowCoords.x, mouseState.flowCoords.y]);
  }, [freehandMode, mouseState.flowCoords.x, mouseState.flowCoords.y, ready]);

  const handleMouseMove = useCallback((e: any) => {
    if (!freehandMode || !ready) { return; }
    if (drawing) {
      e.preventDefault();
      setMins([Math.min(mins[0], mouseState.flowCoords.x), Math.min(mins[1], mouseState.flowCoords.y)]);
      setMaxs([Math.max(maxs[0], mouseState.flowCoords.x), Math.max(maxs[1], mouseState.flowCoords.y)]);
      const point = {
        x: mouseState.flowCoords.x,
        y: mouseState.flowCoords.y,
      };
      setPath((prevPath: any) => [...prevPath, point]);
    }
  }, [freehandMode, ready, drawing, mins, mouseState.flowCoords.x, mouseState.flowCoords.y, maxs]);

  const handleMouseUp = useCallback((e: any) => {
    if (!freehandMode || !drawing || !ready) { return; }
    setDrawing(false);
  
    const zoom = reactFlow?.getZoom() || 1;
    const projectedPosition = reactFlow.project({ x: mins[0], y: mins[1] });  

    const newNode: Node = {
      id: getId(),
      type: 'Freeform',
      position: projectedPosition,
      data: { 
        color: strokeState.color, 
        path: path,
        width: strokeState.strokeWidth,
        strokeDasharray: StrokeStyles[strokeState.strokeStyle],
        zoom: zoom,
        mins: mins,
        maxs: maxs,
      },
    };
    reactFlow.addNodes([newNode]);
    setPath([]);
  }, [freehandMode, drawing, ready, reactFlow, mins, getId, strokeState.color, strokeState.strokeWidth, strokeState.strokeStyle, path, maxs]);

  return useMemo(() => {
  return {
    freehandMode,
    toggleFreehandMode,
    drawing,
    path,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
  }
}, [
  freehandMode,
  toggleFreehandMode,
  drawing,
  path,
  handleMouseDown,
  handleMouseMove,
  handleMouseUp,
]);
};

export default useFreehandState;
