import React, { forwardRef, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import styled, { useTheme } from 'styled-components';
import ReactFlow, { Node, ConnectionMode, OnSelectionChangeParams, ReactFlowProps, useEdgesState, useNodesInitialized, useNodesState, useOnSelectionChange, useReactFlow, useStoreApi, getRectOfNodes, useStore } from "reactflow";
import { FlowEdgeTypes, FlowGlobals, FlowNodeTypes, FlowEdgeOptions, FlowFitViewOptions } from './FlowConstants';
import { FlowBackground } from './FlowBackground';
import { FlowEdge } from './FlowEdges';
import { FlowMap } from './FlowMap';
import { fetchNodeColor, fetchNodeStrokeColor } from './FlowConstants';
import FlowMapNode from './FlowMap/FlowMapNode';
import FlowPanel from '../Panel/Panel';
import FlowDrawing from './FlowDrawing/FlowDrawing';
import { useFlowControls } from '../../hooks';
import FlowControls from './FlowControls/FlowControls';
import { StrokeStyles } from '../StrokePicker/StrokePicker';
import FlowDraggableNodes from './FlowDraggableNodes/FlowDraggableNodes';
import { Space } from '../../constants';
import { Accordion } from '../Accordion/Accordion';
import Tabs from '../Tabs/Tabs';

export interface FlowProps extends ReactFlowProps {
  viewportControls?: any;
  flowPanelProps?: any;
  flowBackground?: boolean;
  flowBackgroundProps?: any;
  flowMap?: boolean;
  flowMapProps?: any;
  flowSettings?: boolean;
  flowSettingsProps?: any;
  flowDroppableNodes?: boolean;
  flowDroppableNodesProps?: any;
  debug?: boolean;
  debugProps?: any;
  fitOnLoad?: boolean;
  leftPanelWidth?: number;
  rightPanelWidth?: number;
};

const FlowWrapper = styled.div<any>`
  display: flex;
  flex-direction: row;
  height: 100%;
  width: 100%;
`;

const ReactFlowStyled = styled(ReactFlow)<any>`
  z-index: 50;
  pointerEvents: all;
  display: flex;
  width: 100%;
  height: 100%;
  flex-grow: 1;
  background: ${(props) => props.theme.background};
`;

const Flow = forwardRef<any, FlowProps>(({
  nodes: initialNodes =[],
  edges: initialEdges =[],
  nodeTypes = FlowNodeTypes,
  edgeTypes = FlowEdgeTypes,
  defaultEdgeOptions = FlowEdgeOptions,
  fitViewOptions = FlowFitViewOptions,
  connectionMode = ConnectionMode.Loose,
  elevateNodesOnSelect = true,
  elevateEdgesOnSelect = true,

  minZoom = 0,
  maxZoom = 3,
  flowBackground = true,
  flowBackgroundProps = {
    gap: [10, 10],
  },
  flowPanelProps = {
    handleSize: 12,
  },
  flowMap = true,
  flowMapProps = {
    zoomable: true,
    pannable: true,
    nodeColor: fetchNodeColor,
    nodeStrokeColor: fetchNodeStrokeColor,
    nodeComponent: FlowMapNode,
  },
  flowSettings = true,
  flowSettingsProps = {
    showZoom: true,
    showFitView: true,
    showInteractive: true,
    showSnapShot: true,
    showAttribution: true,
    showZoomInput: true,
    showLayoutSelect: true,
    showFreehandMode: true,
    showPathEditor: true,
    showDebugInfo: false,
  },
  flowDroppableNodes = true,
  flowDroppableNodesProps = {
    nodeTypes: ['FlowNode', 'Terminal', 'Circle', 'Triangle'],
  },
  debug = true,
  debugProps = {
    showZoom: false,
    showFitView: false,
    showInteractive: false,
    showSnapShot: false,
    showAttribution: false,
    showZoomInput: false,
    showLayoutSelect: false,
    showFreehandMode: false,
    showPathEditor: false,
    showDebugInfo: true,
  },
  fitOnLoad = true,
  leftPanelWidth = 15,
  rightPanelWidth = 15,
  ...otherProps
}, flowWrapperRef) => {
  const theme: any = useTheme();
  const leftPanelRef = useRef<any>(null);
  const flowRef = useRef<any>(null);
  const rightPanelRef = useRef<any>(null);
  const flowControls = useFlowControls(flowRef, fitOnLoad);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);


  return (
    <FlowWrapper ref={flowWrapperRef}>
        <FlowPanel ref={leftPanelRef} panelPosition='left' width={leftPanelWidth + '%'} {...flowPanelProps}>
          { flowDroppableNodes && <><FlowDraggableNodes {...flowDroppableNodesProps} /><Space /></> }
          { flowControls && (  <Accordion expanded={true} title="Flow Controls"><FlowControls flowControls={flowControls} {...flowSettingsProps} /></Accordion> ) }
          { flowMap && ( <><Accordion expanded={true} title="Flow Map"><FlowMap flowControls={flowControls} onNodeClick={(event: any, node: any) => flowControls.centerNode(node)} {...flowMapProps} /></Accordion></> ) }
        </FlowPanel>
        <ReactFlowStyled
          id={"flow"}
          ref={flowRef}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          nodes={nodes}
          edges={edges}
          defaultNodes={[]}
          defaultEdges={[]}
          onMouseDown={(event: any) => flowControls.handleMouseDown(event)}
          onPaneMouseMove={(event: any) => flowControls.handleMouseMove(event)}
          onMouseUp={(event: any) => flowControls.handleMouseUp(event)}
          panOnDrag={flowControls.panOnDrag}
          nodesDraggable={flowControls.nodesDraggable}
          nodesConnectable={flowControls.nodesConnectable}
          elementsSelectable={flowControls.elementsSelectable}
          minZoom={minZoom}
          maxZoom={maxZoom}
          fitViewOptions={fitViewOptions}
          defaultEdgeOptions={defaultEdgeOptions}
          connectionMode={flowControls.connectionMode}
          onPaneClick={flowControls.onPaneClick}
          onDragOver={flowControls.onDragOver}
          onDrop={flowControls.onDrop}
          onConnect={flowControls.onConnect}
          connectionLineComponent={flowControls.connectionLineComponent}
        >
          <FlowGlobals mouseCursor={flowControls.mouseCursor} />
          {flowBackground && (<FlowBackground {...flowBackgroundProps} />)}
          <FlowDrawing path={flowControls.path} color={flowControls.color} strokeWidth={flowControls.strokeWidth} strokeDasharray={StrokeStyles[flowControls.strokeStyle]} />
        </ReactFlowStyled>
        <FlowPanel ref={rightPanelRef} width={rightPanelWidth + '%'} panelPosition='right' {...flowPanelProps}>
          <Tabs tabs={
            [
              {
                key: 'Debug Menu',
                label: 'Debug Menu',
                content: <FlowControls flowControls={flowControls} {...debugProps} />,
              },
              {
                key: 'Flow',
                label: 'Flow',
                content: <>Flow</>,
              }
            ]
          } />
        </FlowPanel>
    </FlowWrapper>
  );
});

export default Flow;

