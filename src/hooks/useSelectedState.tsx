// import { useState, useCallback, useEffect, useMemo } from "react";
// import { useOnSelectionChange, OnSelectionChangeParams, useStore } from "reactflow";
// import { Box, Columns, Label, Padding } from "../constants";
// import LabeledAttributes from "../components/LabeledAttribute/LabeledAttribute";
// import Tabs from "../components/Tabs/Tabs";
// import { Accordion } from "../components/Accordion/Accordion";

// const useSelectedState = (reactFlow: any) => {
//   const [selectedNodes, setSelectedNodes] = useState<any[]>([]);
//   const [selectedEdges, setSelectedEdges] = useState<any[]>([]);

//   const selectNode = useCallback((node: any) => {
//     reactFlow.addSelectedNodes([node.id]);
//   }, [reactFlow]);

//   const getSelectedNodes = useCallback(() => {
//     return selectedNodes;
//   }, [selectedNodes]);

//   const selectEdge = useCallback((edge: any) => {
//     reactFlow.addSelectedEdges([edge.id]);
//   }, [reactFlow]);

//   const getSelectedEdges = useCallback(() => {
//     return selectedEdges;
//   }, [selectedEdges]);

//   // re-render selected edges to be on top, change order of edges in svg world
//   const renderSelectedEdgesOnTop = useCallback(() => {
//     const currentEdges = reactFlow.getEdges();
//     if (!currentEdges || currentEdges.length === 0) {
//       return;
//     }
//     const unselectedEdges = currentEdges.filter((edge: any) => !edge.selected);
//     const newEdges = [...unselectedEdges, ...selectedEdges];
//     reactFlow.setEdges(newEdges);
//   }, [reactFlow, selectedEdges]);  

//     // Triggered when a node or edge is selected, updates the selectedNodes and selectedEdges state
//   const onSelectionChange = useCallback((params: OnSelectionChangeParams) => {
//     setSelectedNodes(params.nodes);
//     setSelectedEdges(params.edges);
//   }, []);
//   useOnSelectionChange({ onChange: onSelectionChange });

//   const SelectedTab = useMemo(() => {
//     const selectedNodesTab = {
//       label: 'Selected Nodes',
//       content: selectedNodes?.length > 0 ? (
//         <Padding padding={'8px'}>
//           {selectedNodes.map((node: any, index: any) => {
//             return (
//               <Accordion key={`selected-node-${node?.id ?? node?.label ??  index}`} title={node?.id ?? node?.label ?? index} expanded={index === 0}>
//                   <LabeledAttributes id={`selected-node-attribute-${node?.id ?? node?.label ??  index}`} expand={false} layout={"column"} >{node}</LabeledAttributes>
//               </Accordion>
//             );
//           })}
//           </Padding>
//       ) : undefined
//     };
//     const selectedEdgesTab = {
//       label: 'Selected Edges',
//       content: selectedEdges?.length > 0 ? (
//         <Padding padding={'8px'}>
//           {selectedEdges.map((edge: any, index: any) => {
//             return (
//               <Accordion key={`selected-edge-${edge?.id ?? edge?.label ??  index}`} title={edge?.id ?? edge?.label ?? index} expanded={index === 0}>
//                 <LabeledAttributes id={`selected-edge-attribute-${edge?.id ?? edge?.label ??  index}`} expand={false} layout={"column"}>{edge}</LabeledAttributes>
//               </Accordion>
//             );
//           })}
//           </Padding>
//       ) : undefined
//     };
//     return (
//       <Tabs overflow={'auto'} tabs={[selectedNodesTab, selectedEdgesTab]} />
//     )
//   }, [selectedNodes, selectedEdges]);

//   const getSelectedTab = useCallback(() => {
//     return selectedNodes.length > 0 || selectedEdges.length > 0 ? SelectedTab : undefined;
//   }, [SelectedTab, selectedEdges.length, selectedNodes.length]);

//   useEffect(() => {
//     renderSelectedEdgesOnTop();
//   }, [selectedEdges]);

//   return useMemo(() => {
//       return {
//       getSelectedTab,
//       renderSelectedEdgesOnTop,
//       selectedNodes, 
//       setSelectedNodes,
//       selectedEdges, 
//       setSelectedEdges,
//       selectNode,
//       getSelectedNodes,
//       selectEdge,
//       getSelectedEdges,
//     }
//   }, [
//     getSelectedTab,
//     renderSelectedEdgesOnTop,
//     selectedNodes,
//     setSelectedNodes,
//     selectedEdges,
//     setSelectedEdges,
//     selectNode,
//     getSelectedNodes,
//     selectEdge,
//     getSelectedEdges,
//   ]);
// };

// export default useSelectedState;

import { useState, useCallback, useEffect, useMemo } from "react";
import { useOnSelectionChange, OnSelectionChangeParams, useReactFlow, Node, Edge} from "reactflow";

import LabeledAttributes from "../components/LabeledAttribute/LabeledAttribute";
import Tabs from "../components/Tabs/Tabs";
import { Accordion } from "../components/Accordion/Accordion";
import { Padding } from "../constants";

const useSelectedState = (reactFlow: any) => {
  const [selectedNodes, setSelectedNodes] = useState<Node[]>([]);
  const [selectedEdges, setSelectedEdges] = useState<Edge[]>([]);

  const selectNode = useCallback((node: Node) => {
    reactFlow.addSelectedNodes([node.id]);
  }, [reactFlow]);

  const selectEdge = useCallback((edge: Edge) => {
    reactFlow.addSelectedEdges([edge.id]);
  }, [reactFlow]);

  const renderSelectedEdgesOnTop = useCallback(() => {
    const currentEdges = reactFlow.getEdges();
    if (!currentEdges || currentEdges.length === 0) {
      return;
    }
    const unselectedEdges = currentEdges.filter((edge: Edge) => !edge.selected);
    const newEdges = [...unselectedEdges, ...selectedEdges];
    reactFlow.setEdges(newEdges);
  }, [selectedEdges]);

  const onSelectionChange = useCallback((params: OnSelectionChangeParams) => {
    setSelectedNodes(params.nodes);
    setSelectedEdges(params.edges);
  }, []);
  useOnSelectionChange({ onChange: onSelectionChange });

  const createTabContent = (items: any, itemType: any) => {
    return items?.length > 0 ? (
      <Padding padding={'4px'}>
        {items.map((item: any, index: any) => (
          <Accordion key={`selected-${itemType}-${item.id || item.label || index}`} title={item.id || item.label || index} expanded={false}>
            <LabeledAttributes id={`selected-${itemType}-attribute-${item.id || item.label || index}`} expand={false} layout={"column"}>{item}</LabeledAttributes>
          </Accordion>
        ))}
      </Padding>
    ) : undefined;
  };

  const SelectedTab = useMemo(() => {
    const selectedNodesTab = {
      label: 'Selected Nodes',
      content: createTabContent(selectedNodes, 'node')
    };
    const selectedEdgesTab = {
      label: 'Selected Edges',
      content: createTabContent(selectedEdges, 'edge')
    };
    return (
      <Tabs overflow={'auto'} borders={false} tabs={[selectedNodesTab, selectedEdgesTab]} />
    );
  }, [selectedNodes, selectedEdges]);

  return {
    SelectedTab,
    renderSelectedEdgesOnTop,
    selectedNodes, 
    setSelectedNodes,
    selectedEdges, 
    setSelectedEdges,
    selectNode,
    selectEdge,
  };
};

export default useSelectedState;
