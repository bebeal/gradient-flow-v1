import React, { forwardRef, useCallback } from "react";
import { Background, MiniMap, useReactFlow } from "reactflow";
import styled, { useTheme } from "styled-components";
import FlowMapNode from "./FlowMapNode";
import { fetchNodeColor, fetchNodeStrokeColor } from "../FlowConstants";

export const MapWrapper = styled.div<any>`
  border-right: 0.5px solid ${(props) => props.theme.controlsBorder};
`;

export const MapStyled = styled(MiniMap)<any>`
  z-index: 50;
  background-color: ${(props) => props.theme.background};
  border: 0.5px solid ${(props) => props.theme.controlsBorder};
  margin: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex: 1;

  .react-flow__minimap-mask {
    fill:  ${(props) => props.theme.minimapMaskBackground};
    fill-opacity: 0.6;
    stroke: ${(props) => props.theme.controlsBorder};
    stroke-width: 2px;
    stroke-opacity: 1;
    height: 100%;
    width: 100%;
  }

  > svg {
    height: 100%;
    width: 100%;
  }

`;

export interface FlowMapProps {
  flowControls: any;
  zoomable?: boolean;
  pannable?: boolean;
  onNodeClick?: any;
  nodeComponent?: any;
  nodeColor?: any,
  nodeStrokeColor?: any,
  nodes?: any,
};

const FlowMap = (props: FlowMapProps) => {
  const {
    zoomable = true,
    pannable = true,
    onNodeClick = () => {},
    nodeComponent = FlowMapNode,
    nodeColor = fetchNodeColor,
    nodeStrokeColor = fetchNodeStrokeColor,
  } = props;
  const theme = useTheme();
  const NodeComponent = nodeComponent;

  const getNode = useCallback((nodeProps: any) => {
    return (<NodeComponent {...nodeProps} />);
  }, [NodeComponent]);

  return (
    <MapWrapper>
      <MapStyled onNodeClick={onNodeClick} zoomable={zoomable} pannable={pannable} nodeColor={nodeColor} nodeStrokeColor={nodeStrokeColor} theme={theme} nodeComponent={getNode} />
    </MapWrapper>
  );
};

export default React.memo(FlowMap);
