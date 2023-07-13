import React, { useState, forwardRef, useCallback, useEffect, useRef, useMemo, useContext } from "react";
import styled, { ThemeProvider, useTheme } from "styled-components";
import { getEdgeParams, getFloatingEdgeProperties } from "./EdgeUtils";
import { Dark } from "../../../themes";
import { useEdgeHandler } from "../../../hooks";

export const DashedLine = styled.path<any>`
  stroke-width: 1;
  fill: none;
  stroke-dasharray: ${(props) => props.dashLength};
  pointer-events: all;
  animation: dashdraw 0.5s linear infinite;
  stroke: ${(props) => props.isHovered || props.selected ? props.theme.primary : "#b1b1b7"};
  stroke-linecap: round;
`;

const FlowEdge = (props: any) => {
  const edgeHandler = useEdgeHandler({...props, markerStart: 'url(#dot)', markerEnd: 'url(#dot)' });

  const getLine = useCallback(() => {
    return (<DashedLine dashLength={edgeHandler?.dashLength} totalLength={edgeHandler?.pathLength} isHovered={edgeHandler?.isHovered} d={edgeHandler?.path} animated={edgeHandler?.animated} id={edgeHandler?.id} markerStart={edgeHandler?.markerStart} markerEnd={edgeHandler?.markerEnd} selected={edgeHandler?.selected} color={edgeHandler?.style?.color} />);
  }, [edgeHandler?.animated, edgeHandler?.dashLength, edgeHandler?.id, edgeHandler?.isHovered, edgeHandler?.markerEnd, edgeHandler?.markerStart, edgeHandler?.path, edgeHandler?.pathLength, edgeHandler?.selected, edgeHandler?.style?.color]);

  return (
    <>
      {edgeHandler?.path && ( getLine() )}
      {edgeHandler?.InteractionComponent}
      {edgeHandler?.EdgeLabel}
    </>
  )
};

export default React.memo(FlowEdge);
