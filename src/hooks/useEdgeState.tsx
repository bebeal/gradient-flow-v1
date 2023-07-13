import { useCallback, useMemo, useState } from "react";
import { Edge, Connection, DefaultEdgeOptions, addEdge, useEdgesState } from "reactflow";
import { FlowEdgeOptions } from "../components";
import { FlowConnection } from "../components/Flow/FlowConnections";

const useEdgeState = (reactFlow?: any, rfInstanceDom?: any, viewportState?: any, fitOnLoad: boolean = true) => {
  const [connectionLineComponent, setConnectionLineComponent] = useState(() => FlowConnection);


  const getCustomEdge = useCallback((connection: any) => {
    const targetNode = reactFlow.getNode(connection.target!)
    const sourceNode = reactFlow.getNode(connection.source!);
    const targetNodeIsTerminal = targetNode.type === 'Terminal';
    
    if (targetNodeIsTerminal && sourceNode?.data?.code && sourceNode?.data?.code.length > 0) {
      const newTargetNode = { 
        ...targetNode, 
        data: { 
          ...targetNode?.data, 
          code: { 
            ...targetNode.data?.code, 
            [connection.source]: sourceNode?.data?.code 
          } 
        } 
      };
      const nodes = reactFlow.getNodes();
      const nodeIndex = nodes.findIndex((node: any) => node.id === newTargetNode.id);
      nodes[nodeIndex] = newTargetNode;
      reactFlow.setNodes(nodes);
    }
    
    const defaultEdgeOptions = {...FlowEdgeOptions, type: targetNodeIsTerminal ? 'Terminal' : FlowEdgeOptions.type};
    const numEdges = reactFlow.getEdges()?.length || 0;    
    const newEdge = {
      ...connection,
      ...defaultEdgeOptions,
      animated: true,
      id: `e-${numEdges}`,
      data: {
        label: `e-${numEdges}`,
      }
    };
    return newEdge;
  }, [reactFlow]);
  
  const onConnect = useCallback((params: Connection | Edge) => {
    const customEdge: any = getCustomEdge(params);
    reactFlow.setEdges((eds: any) => addEdge(customEdge, eds));
  }, [getCustomEdge, reactFlow]);

  const onEdgesDelete = useCallback((edges: Edge[]) => {
    edges.forEach((edge: Edge) => {
      if (edge.type === 'Terminal') {
        const targetNode = reactFlow.getNode(edge.target);
        const newTargetData = {...targetNode?.data};
        delete newTargetData?.code?.[edge.source];
        if (Object.keys(newTargetData?.code).length === 0) {
          delete newTargetData?.parseFromMarkdown;
          delete newTargetData?.code;
        } else if (Object.keys(newTargetData?.code).length === 1) {
          const onlyCode: any = newTargetData?.code[Object.keys(newTargetData?.code)[0]];
          newTargetData.code = onlyCode;
        }
        const newTargetNode = { 
          ...targetNode, 
          data: {...newTargetData},
        };
        reactFlow.setNodes((prevNodes: any) => prevNodes.map((node: any) => node.id === newTargetNode.id ? newTargetNode : node));
      }
    });
  }, [reactFlow]);


  return useMemo(() => {
  return {
    connectionLineComponent,
    setConnectionLineComponent,
    onConnect,
    onEdgesDelete
  };
}, [
  connectionLineComponent,
  setConnectionLineComponent,
  onConnect,
  onEdgesDelete
]);
  
};

export default useEdgeState;
