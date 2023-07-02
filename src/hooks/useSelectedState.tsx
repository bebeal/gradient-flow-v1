import { useState, useCallback, useEffect } from "react";
import { useOnSelectionChange, OnSelectionChangeParams, useStore } from "reactflow";

const useSelectedState = (storeState: any, reactFlow: any) => {
  const [selectedNodes, setSelectedNodes] = useState<any[]>([]);
  const [selectedEdges, setSelectedEdges] = useState<any[]>([]);

  const selectNode = useCallback((node: any) => {
    storeState.addSelectedNodes([node.id]);
    // setSelectedNodes([...selectedNodes, node]);
  }, [storeState]);

  const getSelectedNodes = useCallback(() => {
    return selectedNodes;
  }, [selectedNodes]);

  const selectEdge = useCallback((edge: any) => {
    storeState.addSelectedEdges([edge.id]);
    // setSelectedEdges([...selectedEdges, edge]);
  }, [storeState]);

  const getSelectedEdges = useCallback(() => {
    return selectedEdges;
  }, [selectedEdges]);

  // re-render selected edges to be on top, change order of edges in svg world
  const renderSelectedEdgesOnTop = useCallback(() => {
    const currentEdges = storeState.edges;
    if (!currentEdges || currentEdges.length === 0) {
      return;
    }
    const unselectedEdges = currentEdges.filter((edge: any) => !edge.selected);
    const newEdges = [...unselectedEdges, ...selectedEdges];
    reactFlow.setEdges(newEdges);
  }, [reactFlow, selectedEdges, storeState.edges]);  

    // Triggered when a node or edge is selected, updates the selectedNodes and selectedEdges state
  const onSelectionChange = useCallback((params: OnSelectionChangeParams) => {
    setSelectedNodes(params.nodes);
    setSelectedEdges(params.edges);
  }, []);
  useOnSelectionChange({ onChange: onSelectionChange });

  useEffect(() => {
    renderSelectedEdgesOnTop();
  }, [selectedEdges]);

  return {
    renderSelectedEdgesOnTop,
    selectedNodes, 
    setSelectedNodes,
    selectedEdges, 
    setSelectedEdges,
    selectNode,
    getSelectedNodes,
    selectEdge,
    getSelectedEdges,
  };
};

export default useSelectedState;
