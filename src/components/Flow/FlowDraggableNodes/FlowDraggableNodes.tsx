import React, { useCallback, useMemo } from 'react';
import styled from 'styled-components';
import { Accordion } from '../../Accordion/Accordion';
import { Relative } from '../../../constants';
import { FlowNodeTypes } from '../FlowConstants';
import { nanoid } from 'nanoid';

export interface FlowDraggableNodesProps {
  nodeTypes?: any[];
  title?: string;
};

const GridWrapper = styled.div<any>`
  position: relative;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 0;
  margin: 0;
  padding: 0;
  width: auto;
  justify-content: stretch;
  align-items: stretch;
`;

export const NodeBox = styled.div<any>`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  padding: 0.5rem;
  overflow: hidden;

  border: 1px solid ${(props) => props.theme.controlsBorder};
`;

export const NodeTypeComponentWrapper = styled.div<any>`
  position: relative;
  width: fit-content;
  height: fit-content;

  cursor: pointer;
`;

const FlowDraggableNodes: React.FC<FlowDraggableNodesProps> = ({ 
  nodeTypes=[], 
  title='Nodes'
}) => {

  const onDragStart = useCallback((event: any, nodeType: any) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  }, []);

  const getNodeComponent = useCallback((NodeTypeComponent: any, nodeType: any, index: number) => {
    return ( <NodeTypeComponent data={{label: nodeType, id: `${title}-draggable-node-${index}`}} inPanel={true} resizeable={false} /> );
  }, []);

  const NodeList = useMemo(() => {
    return (
      nodeTypes.map((nodeType: any, index: number) => {
        const NodeTypeComponent: any = FlowNodeTypes[nodeType];
        return (
          <NodeBox key={`${title}-draggable-node-${index}-box`}>
            <NodeTypeComponentWrapper draggable onDragStart={(e: any) => onDragStart(e, nodeType)}>
                {getNodeComponent(NodeTypeComponent, nodeType, index)}
              </NodeTypeComponentWrapper>
          </NodeBox>
          );
        })
    )
  }, [getNodeComponent, nodeTypes, onDragStart, title]);

  return (
    <Accordion expanded={true} title={title}>
      <GridWrapper>
        {NodeList}
      </GridWrapper>
    </Accordion>
  )
};

export default React.memo(FlowDraggableNodes);
