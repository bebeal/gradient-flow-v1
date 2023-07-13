import { useCallback, useEffect, useMemo, useState } from "react";
import { FlowFitViewOptions, Layout } from "../components/Flow/FlowConstants";
import { AllOptions, collide } from "./elkOptions";
import ELK from "elkjs/lib/elk.bundled.js";

const useElkLayout = (reactFlow: any, flowActions: any, ready: any) => {
  const initialOptions = Object.entries(AllOptions).reduce((acc: any, [key, value]: any) => ({ ...acc, [key]: Array.isArray(value) ? value[0] : value }), {});
  const [elkOptions, setElkOptions] = useState<any>(initialOptions);
  const elk: any = useMemo(() => new ELK(), []);
  const [isFlowReady, setIsFlowReady] = useState(ready);
  const [elkActivated, setElkActivated] = useState(false);

  useEffect(() => {
    if (ready && !isFlowReady) {
      setIsFlowReady(true);
    }
  }, [ready, isFlowReady]);

  const getHandlePositionFromDirection =  useCallback((direction: any = elkOptions.Direction) => {
    if (direction === "DOWN" || direction === "UNDEFINED") {
      return {
        sourceHandle: "bottom",
        targetHandle: "top",
      }
    } else if (direction === "UP") {
      return {
        sourceHandle: "top",
        targetHandle: "bottom",
      }
    } else if (direction === "LEFT") {
      return {
        sourceHandle: "left",
        targetHandle: "right",
      }
    } else {
      return {
        sourceHandle: "right",
        targetHandle: "left",
      }
    }
  }, [elkOptions.Direction]);

  const FormatOptions = useCallback((options: any = elkOptions) => {
    return {
      "elk.algorithm": options?.Algorithm,
      'elk.direction': options?.Direction,
      "elk.alignment": options?.Alignment,

      "elk.layered.crossingMinimization.strategy": options?.CrossingMinimalization,
      "elk.layered.cycleBreaking.strategy": options?.CycleBreaking,
      "elk.layered.nodePlacement.strategy": options?.NodePlacement,
      "elk.layered.mergeEdges": "true",
      "elk.layered.spacing.nodeNodeBetweenLayers": options?.NodeNodeBetweenLayers,
      "elk.layered.spacing.edgeEdgeBetweenLayers": options?.EdgeEdgeBetweenLayers,

      "elk.edgeRouting": options?.EdgeRouting,
      "elk.hierarchyHandling": options?.HierarchyHandling,
      "elk.feedbackEdges": "true",
      "elk.spacing.nodeNode": "150",
    };
  }, [elkOptions]);


  const applyElkToFlow = useCallback(async (nodes: any = reactFlow.getNodes(), edges: any = reactFlow.getEdges(), options: any = elkOptions, handlePos = getHandlePositionFromDirection()) => {
    const graph = {
      id: "root",
      layoutOptions: FormatOptions(options),
      children: nodes,
      edges: edges
    };

    elk.layout(graph).then((layoutedGraph: any) => {
      layoutedGraph.children.forEach((node: any) => {
        node.position = { x: node.x, y: node.y };
      });

      layoutedGraph.edges.forEach((edge: any) => {
        edge.sourceHandle = handlePos.sourceHandle;
        edge.targetHandle = handlePos.targetHandle;
      });
          
      window.requestAnimationFrame(() => {
        reactFlow.setNodes(layoutedGraph.children);
        reactFlow.setEdges(layoutedGraph.edges);
        // window.requestAnimationFrame(() => {
          flowActions.fitNodesWithOffset();
        // });
      });

    })

  }, [FormatOptions, elk, elkOptions, flowActions.fitNodesWithOffset, getHandlePositionFromDirection, reactFlow]);

  const handleElkChange = useCallback((value: string, name: string) => {
    setElkActivated(true);
    setElkOptions((prevState: any) => ({ ...prevState, [name]: value }));
  }, []);

  useEffect(() => {
    window.requestAnimationFrame(() => {
      if (isFlowReady && elkActivated) {
        applyElkToFlow();
      }
    });
  }, [applyElkToFlow, elkActivated, elkOptions, isFlowReady]);

  return useMemo(() => {
    return {
      elkActivated,
      elkOptions,
      handleElkChange,
      applyElkToFlow
    };
  }, [
    elkActivated,
    elkOptions,
    handleElkChange,
    applyElkToFlow
  ]);
};

export default useElkLayout;
