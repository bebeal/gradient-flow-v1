import React, { useState, useRef, useMemo, useEffect, useCallback } from 'react';
import LabeledAttributes from '../../LabeledAttribute/LabeledAttribute';
import FlowControlPanel from './FlowControlPanel';
import { throttle } from 'lodash';

const FlowState = (props: any) => {
  const [buttonList, setButtonList] = useState([]);
  
  const getNodesMap = (nodes: any) => {
    return Object.fromEntries(nodes);
  };

  const getEdgesMap = (edges: any) => {
    return edges?.reduce((acc: any, edge: any) => {
      acc[edge.id] = edge;
      return acc;
    }, {});
  };

  const updateButtonList = useCallback(() => {
    const storeState = props?.flowControls?.store?.getState();
    const nodesMap = getNodesMap(storeState?.nodeInternals);
    const edgesMap = getEdgesMap(storeState?.edges);
    const newButtonList: any = [
      {'Number of Nodes': (Object.keys(nodesMap))?.length || 0},
      {'Number of Edges': (Object.keys(edgesMap))?.length || 0},
      {'Nodes': nodesMap},
      {'Edges': edgesMap},
    ].map((button: any, index: number) => ({
      component: (props: any) => (
        <LabeledAttributes layout={"column"}>
          {button}
        </LabeledAttributes>
      ), 
      x: index % 2,
      y: Math.floor(index / 2),
      w: 1, 
      h: 1, 
    }));
    setButtonList(newButtonList);
  }, [props?.flowControls]);

    useEffect(() => {
      const id = requestAnimationFrame(updateButtonList);
      return () => cancelAnimationFrame(id);
    }, [updateButtonList]);

  return (
    <FlowControlPanel buttons={buttonList} />
  );
};

export default React.memo(FlowState);
