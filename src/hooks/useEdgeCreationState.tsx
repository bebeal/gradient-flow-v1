import { useCallback, useState } from "react";
import { Edge, Connection, DefaultEdgeOptions, addEdge, useEdgesState } from "reactflow";
import { FlowEdgeOptions } from "../components";
import { FlowConnection } from "../components/Flow/FlowConnections";

const useEdgeCreationState = (storeState?: any, reactFlow?: any, rfInstanceDom?: any, layoutState?: any, fitOnLoad: boolean = true) => {
  const [connectionLineComponent, setConnectionLineComponent] = useState(() => FlowConnection);

  const getNodeById = useCallback((id: string) => {
    return reactFlow.getNodes().find((node: any) => node.id === id);
  }, [reactFlow]);

  const getCustomEdge = useCallback((connection: any) => {
    const targetNode = getNodeById(connection.target!);
    const sourceNode = getNodeById(connection.source!);
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
      reactFlow.setNodes((prevNodes: any) => prevNodes.map((node: any) => node.id === newTargetNode.id ? newTargetNode : node));
    }
    
    const defaultEdgeOptions = {...FlowEdgeOptions, type: targetNodeIsTerminal ? 'terminal' : FlowEdgeOptions.type};
    
    const newEdge = {
      ...connection,
      ...defaultEdgeOptions,
      animated: true,
      id: `e-${reactFlow.getEdges().length}`,
      data: {
        label: `e-${reactFlow.getEdges().length}`,
      }
    };
    
    return newEdge;
  }, [getNodeById, reactFlow]);
  

  const onConnect = useCallback((params: any) => {
    const customEdge: any = getCustomEdge(params);
    reactFlow.addEdges([customEdge]);
    if (fitOnLoad) {
      layoutState.fitNodesWithOffset();
    }
  }, [getCustomEdge, fitOnLoad]);

  return {
    connectionLineComponent,
    setConnectionLineComponent,
    onConnect
  };
  
};

export default useEdgeCreationState;
