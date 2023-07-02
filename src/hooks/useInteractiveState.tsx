import { useCallback, useEffect, useState } from "react";
import { ConnectionMode } from "reactflow";

const useInteractiveState = () => {
  const [nodesDraggable, setNodesDraggable] = useState(true);
  const [nodesConnectable, setNodesConnectable] = useState(true);
  const [elementsSelectable, setElementsSelectable] = useState(true);
  const [panOnDrag, setPanOnDrag] = useState(true);
  const [elementsHoverable, setElementsHoverable] = useState(true);

  const [isInteractive, setIsInteractive] = useState(true);
  const [connectionMode, setConnectionMode] = useState(ConnectionMode.Loose);

  const togglePanOnDrag = () => setPanOnDrag((val) => !val);
  const toggleNodesDraggable = () => setNodesDraggable((val) => !val);
  const toggleNodesConnectable = () => setNodesConnectable((val) => !val);
  const toggleElementsSelectable = () => setElementsSelectable((val) => !val);
  const toggleElementsHoverable = () => setElementsHoverable((val) => !val);

  const toggleIsInteractive = () => {
    const newIsInteractive = !isInteractive;
    setPanOnDrag(newIsInteractive);
    setNodesDraggable(newIsInteractive);
    setNodesConnectable(newIsInteractive);
    setElementsSelectable(newIsInteractive);
    setIsInteractive(newIsInteractive);
  };

  const toggleConnectionMode = () =>
    setConnectionMode((val) =>
      val === ConnectionMode.Loose
        ? ConnectionMode.Strict
        : ConnectionMode.Loose
    );

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
  };
};

export default useInteractiveState;
