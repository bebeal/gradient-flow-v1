import { max } from "lodash";
import { useState, useCallback } from "react";
import { Node } from "reactflow";
import { StrokeStyleOptions, StrokeStyles } from "../components/StrokePicker/StrokePicker";
import { FlowNodeTypes } from "../components";

const useFreehandState = (storeState: any, reactFlow: any, mouseState: any, interactiveState: any, flowState: any, color: any = '#ff0072', strokeWidth: any = 1, strokeStyle: any = 'solid') => {
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
    if (!freehandMode) { return; }
    e.preventDefault();
    setDrawing(true);
    setPath([{x: mouseState.flowCoords.x, y: mouseState.flowCoords.y}]);
    setMins([mouseState.flowCoords.x, mouseState.flowCoords.y]);
    setMaxs([mouseState.flowCoords.x, mouseState.flowCoords.y]);
  }, [freehandMode, mouseState.flowCoords.x, mouseState.flowCoords.y]);

  const handleMouseMove = useCallback((e: any) => {
    if (!freehandMode) { return; }
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
  }, [freehandMode, drawing, mins, mouseState.flowCoords.x, mouseState.flowCoords.y, maxs]);

  const handleMouseUp = useCallback((e: any) => {
    if (!freehandMode || !drawing) { return; }
    setDrawing(false);
  
    const zoom = storeState.transform[2];
    const projectedPosition = reactFlow.project({ x: mins[0], y: mins[1] });  

    const newNode: Node = {
      id: getId(),
      type: 'Freeform',
      position: projectedPosition,
      data: { 
        color: color, 
        path: path,
        width: strokeWidth,
        strokeDasharray: StrokeStyles[strokeStyle],
        zoom: zoom,
        mins: mins,
        maxs: maxs,
      },
    };
    reactFlow.addNodes([newNode]);
    setPath([]);
  }, [freehandMode, drawing, storeState.transform, reactFlow, getId, color, path, strokeWidth, strokeStyle, mins, maxs]);

  return {
    freehandMode,
    toggleFreehandMode,
    drawing,
    path,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
  };
};

export default useFreehandState;
