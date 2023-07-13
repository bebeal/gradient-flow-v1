import React, { forwardRef, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import styled, { useTheme } from 'styled-components';
import ReactFlow, { Node, ConnectionMode, OnSelectionChangeParams, ReactFlowProps, useEdgesState, useNodesInitialized, useNodesState, useOnSelectionChange, useReactFlow, useStoreApi, getRectOfNodes, useStore, BackgroundVariant } from "reactflow";
import { FlowEdgeTypes, FlowGlobals, FlowNodeTypes, FlowEdgeOptions, FlowFitViewOptions } from './FlowConstants';
import { FlowBackground } from './FlowBackground';
import { FlowEdge } from './FlowEdges';
import { FlowMap } from './FlowMap';
import { fetchNodeColor, fetchNodeStrokeColor } from './FlowConstants';
import FlowMapNode from './FlowMap/FlowMapNode';
import FlowDrawing from './FlowDrawing/FlowDrawing';
import { useButtonStore, useFlowControls } from '../../hooks';
import { StrokeStyles } from '../StrokePicker/StrokePicker';
import FlowDraggableNodes from './FlowDraggableNodes/FlowDraggableNodes';
import { Box, Flex, Relative, Space } from '../../constants';
import { Accordion } from '../Accordion/Accordion';
import Tabs from '../Tabs/Tabs';
import FlowControlPanel from './FlowControls/FlowControlPanel';
import Panel from '../Panel/Panel';
import PathEditor from '../PathEditor/PathEditor';
import FlowMarker from './FlowMarkers/FlowMarker';
import LabeledAttributes from '../LabeledAttribute/LabeledAttribute';
import FlowState from './FlowControls/FlowState';

export const OnTop = styled.div<any>`
  z-index: 50;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  cursor: inherit;
  pointer-events: none;
  overflow: hidden;
`;

export interface FlowProps extends ReactFlowProps {
  initialNodes?: any[];
  initialEdges?: any[];
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
  showStateInTabs?: boolean;
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
  initialNodes =[],
  initialEdges =[],
  nodeTypes = FlowNodeTypes,
  edgeTypes = FlowEdgeTypes,
  defaultEdgeOptions = FlowEdgeOptions,
  fitViewOptions = FlowFitViewOptions,
  connectionMode = ConnectionMode.Loose,
  elevateNodesOnSelect = true,
  elevateEdgesOnSelect = true,

  minZoom = 0.1,
  maxZoom = 5,
  flowBackground = true,
  flowBackgroundProps = {
    gap: [25, 25],
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
  showStateInTabs = true,
  fitOnLoad = true,
  leftPanelWidth = 16,
  rightPanelWidth = 16,
  connectionRadius = 25,
  ...otherProps
}, flowWrapperRef) => {
  const theme: any = useTheme();
  const reactFlow = useReactFlow();
  const flowRef = useRef<any>(null);
  const flowControls = useFlowControls(initialNodes, initialEdges, flowRef, fitOnLoad);

  const ElkControlButtons = useMemo(() => {
    return [
      flowControls?.ElkControlButton?.Algorithm,
      flowControls?.ElkControlButton?.Direction,
      flowControls?.ElkControlButton?.Alignment,
      flowControls?.ElkControlButton?.CrossingMinimalization,
      flowControls?.ElkControlButton?.CycleBreaking,
      flowControls?.ElkControlButton?.EdgeRouting,
      flowControls?.ElkControlButton?.NodePlacement,
      flowControls?.ElkControlButton?.HierarchyHandling,
      flowControls?.ElkControlButton?.NodeSize,
      flowControls?.ElkControlButton?.EdgeStraightening,
      flowControls?.ElkControlButton?.NodeNodeBetweenLayers,
      flowControls?.ElkControlButton?.EdgeEdgeBetweenLayers,
    ];
  }, [
    flowControls.ElkControlButton.Algorithm,
    flowControls.ElkControlButton.Direction,
    flowControls.ElkControlButton.Alignment,
    flowControls.ElkControlButton.CrossingMinimalization,
    flowControls.ElkControlButton.CycleBreaking,
    flowControls.ElkControlButton.EdgeRouting,
    flowControls.ElkControlButton.NodePlacement,
    flowControls.ElkControlButton.HierarchyHandling,
    flowControls.ElkControlButton.NodeSize,
    flowControls.ElkControlButton.EdgeStraightening,
    flowControls.ElkControlButton.NodeNodeBetweenLayers,
    flowControls.ElkControlButton.EdgeEdgeBetweenLayers,
  ]);

  const BasicControlButtons = useMemo(() => {
    return [
      flowControls?.AttributionButton,
      flowControls?.PathEditorTool,
      flowControls?.PencilButton,
      flowControls?.SnapshotButton,
      flowControls?.ZoomInButton,
      flowControls?.ZoomOutButton,
      flowControls?.ZoomInputButton,
      flowControls?.FitViewButton,
      flowControls?.InteractiveButton,
      flowControls?.SaveButton,
      flowControls?.RestoreButton,
    ];
  }, [flowControls.AttributionButton, 
      flowControls.PathEditorTool,
      flowControls.PencilButton,
      flowControls.SnapshotButton,
      flowControls.ZoomInButton,
      flowControls.ZoomOutButton,
      flowControls.ZoomInputButton,
      flowControls.FitViewButton,
      flowControls.InteractiveButton,
      flowControls.SaveButton,
      flowControls.RestoreButton,
  ]);

  const BasicControls = useMemo(() => {
    return  <Accordion title={"Basic Controls"} expanded={true}><FlowControlPanel buttons={BasicControlButtons} /></Accordion>
  }, [BasicControlButtons]);

  const ElkControls = useMemo(() => {
    return <Accordion checkToEnable={true} title={"Elk Controls"} expanded={true}><FlowControlPanel buttons={ElkControlButtons} /></Accordion>
  }, [ElkControlButtons]);

  const Map = useMemo(() => {
    return <FlowMap {...flowMapProps} onNodeClick={flowControls?.centerNode} />
  }, [flowControls?.centerNode, flowMapProps]);

  const BasicNodes = useMemo(() => {
    return <FlowDraggableNodes title={"Basic Nodes"} nodeTypes={['FlowNode', 'Terminal', 'Circle', 'Triangle']} />
  }, []);

  const AddFlowMarker = useMemo(() => {
    return ( <FlowMarker/> )
  }, []);

  const FlowLeftPanel = useMemo(() => {
    return (
      <Panel panelPosition='left' width={leftPanelWidth + '%'} {...flowPanelProps}>
      { flowDroppableNodes && BasicNodes}
      { BasicControls }
      { ElkControls }
      { flowMap && Map }
    </Panel>
    )
  }, [BasicControls, BasicNodes, ElkControls, flowDroppableNodes, flowMap, leftPanelWidth, Map, flowPanelProps]);

  const PathEditorTool = useMemo(() => {
    return ( <PathEditor strokeWidth={flowControls.strokeWidth} strokeStyle={flowControls.strokeStyle} onStrokeChange={flowControls.handleStrokeChange} color={flowControls.color} onColorChange={flowControls.handleColorChange}/> ); 
  }, [flowControls.color, flowControls.handleColorChange, flowControls.handleStrokeChange, flowControls.strokeStyle, flowControls.strokeWidth]);

  const MakeButtons = useCallback((buttonList: any) => {
    return buttonList.map((button: any, index: number) => ({
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
  }, []);

  const getStateButtons = useMemo(() => {
   return MakeButtons([
      {'Mouse Coords': flowControls?.mouseCoords},
      {'Flow Coords': flowControls?.flowCoords},
      {'Flow Size': flowControls?.getFlowSize()},
      {'Flow View': { pan: flowControls?.pan, zoom: flowControls?.zoom}},
    ]);
  }, [MakeButtons, flowControls]);

  const StateTab = useMemo(() => {
    const buttons = getStateButtons;
    return ( 
      <>
      <FlowControlPanel buttons={buttons} /> 
      <FlowState flowControls={flowControls} />
      </>
    );
  }, [flowControls, getStateButtons]);

  const FlowRightPanel = useMemo(() => {
    return (
      <Panel width={rightPanelWidth + '%'} panelPosition='right' {...flowPanelProps}>
        <Tabs borders={false} tabs={[
          (flowControls?.selectedEdges?.length > 0 || flowControls?.selectedNodes?.length > 0) && { label: 'Selected', content: flowControls?.SelectedTab},
          showStateInTabs && { label: 'State', content: StateTab},
        ]} />
        {PathEditorTool}
    </Panel>
    )
  }, [PathEditorTool, StateTab, flowControls?.SelectedTab, flowControls?.selectedEdges?.length, flowControls?.selectedNodes?.length, flowPanelProps, rightPanelWidth, showStateInTabs]);

  return (
    <FlowWrapper ref={flowWrapperRef}>
        {AddFlowMarker}
        {FlowLeftPanel}
        <ReactFlowStyled
          nodes={flowControls?.nodes}
          edges={flowControls?.edges}
          onNodesChange={flowControls?.onNodesChange}
          onEdgesChange={flowControls?.onEdgesChange}
          id={flowControls?.id}
          ref={flowRef}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          minZoom={minZoom}
          maxZoom={maxZoom}
          fitView={false}
          fitViewOptions={fitViewOptions}
          defaultEdgeOptions={defaultEdgeOptions}
          connectionMode={flowControls.connectionMode}
          onMouseDown={flowControls.handleMouseDown}
          onMouseMove={flowControls.handleMouseMove}
          onMouseUp={flowControls.handleMouseUp}
          panOnDrag={flowControls.panOnDrag}
          nodesDraggable={flowControls.nodesDraggable}
          nodesConnectable={flowControls.nodesConnectable}
          elementsSelectable={flowControls.elementsSelectable}
          onPaneClick={flowControls.onPaneClick}
          onDragOver={flowControls.onDragOver}
          onDrop={flowControls.onDrop}
          onConnect={flowControls.onConnect}
          onEdgesDelete={flowControls.onEdgesDelete}
          connectionLineComponent={flowControls.connectionLineComponent}
          connectionRadius={connectionRadius}
          selectNodesOnDrag={true}
        >
          {flowBackground && (<FlowBackground id="flow-background-1" {...flowBackgroundProps} />)}
          {flowBackground && (<FlowBackground lineWidth={0.1} id="flow-background-2"  gap={100} offset={1} variant={BackgroundVariant.Lines}  />)}
          <OnTop>
            <FlowDrawing path={flowControls?.path} color={flowControls?.color} strokeWidth={flowControls?.strokeWidth} strokeDasharray={StrokeStyles[flowControls?.strokeStyle]} />
          </OnTop>
        </ReactFlowStyled>
        {FlowRightPanel}
        <FlowGlobals mouseCursor={flowControls.mouseCursor} />
    </FlowWrapper>
  );
});

export default Flow;

