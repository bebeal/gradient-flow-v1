import { useCallback, useEffect, useMemo, useState } from "react";
import { ConnectionMode } from "reactflow";

const useInteractiveState = () => {
  const [nodesDraggable, setNodesDraggable] = useState(true);
  const [nodesConnectable, setNodesConnectable] = useState(true);
  const [elementsSelectable, setElementsSelectable] = useState(true);
  const [panOnDrag, setPanOnDrag] = useState(true);
  const [elementsHoverable, setElementsHoverable] = useState(true);

  const [isInteractive, setIsInteractive] = useState(true);
  const [connectionMode, setConnectionMode] = useState(ConnectionMode.Loose);

  const togglePanOnDrag = useCallback(() => setPanOnDrag((val) => !val), []);
  const toggleNodesDraggable = useCallback(() => setNodesDraggable((val) => !val), []);
  const toggleNodesConnectable =  useCallback(() => setNodesConnectable((val) => !val), []);
  const toggleElementsSelectable =  useCallback(() => setElementsSelectable((val) => !val), []);
  const toggleElementsHoverable =  useCallback(() => setElementsHoverable((val) => !val), []);

  const toggleIsInteractive = useCallback(() => {
    const newIsInteractive = !isInteractive;
    setPanOnDrag(newIsInteractive);
    setNodesDraggable(newIsInteractive);
    setNodesConnectable(newIsInteractive);
    setElementsSelectable(newIsInteractive);
    setIsInteractive(newIsInteractive);
  }, [isInteractive]);

  // useEffect(() => {
  //   if (!panOnDrag) {
  //     setIsInteractive(false);
  //   }
  // }, [panOnDrag]);

  const toggleConnectionMode = useCallback(() =>
    setConnectionMode((val) =>
      val === ConnectionMode.Loose
        ? ConnectionMode.Strict
        : ConnectionMode.Loose
    ), []);

    return useMemo(() => {
      return {
    panOnDrag,
    togglePanOnDrag,
    setPanOnDrag,
    nodesDraggable,
    toggleNodesDraggable,
    setNodesDraggable,
    nodesConnectable,
    toggleNodesConnectable,
    setNodesConnectable,
    elementsSelectable,
    toggleElementsSelectable,
    setElementsSelectable,
    elementsHoverable,
    toggleElementsHoverable,
    setElementsHoverable,
    isInteractive,
    toggleIsInteractive,
    setIsInteractive,
    connectionMode,
    toggleConnectionMode,
    setConnectionMode,
  }
  }, [
    panOnDrag,
    togglePanOnDrag,
    setPanOnDrag,
    nodesDraggable,
    toggleNodesDraggable,
    setNodesDraggable,
    nodesConnectable,
    toggleNodesConnectable,
    setNodesConnectable,
    elementsSelectable,
    toggleElementsSelectable,
    setElementsSelectable,
    elementsHoverable,
    toggleElementsHoverable,
    setElementsHoverable,
    isInteractive,
    toggleIsInteractive,
    setIsInteractive,
    connectionMode,
    toggleConnectionMode,
    setConnectionMode,
  ]);
};

export default useInteractiveState;
