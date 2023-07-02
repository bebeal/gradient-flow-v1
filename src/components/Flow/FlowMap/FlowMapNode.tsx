import { forwardRef } from "react";
import { MiniMapNodeProps } from "reactflow";
import styled from "styled-components";

export interface FlowMapNodeProps extends MiniMapNodeProps {
  onClick?: any;
};

const FlowMapRectNode = styled.rect<any>`
  pointer-events: all;
  cursor: pointer;
  fill: ${(props) => props.fill || props.theme.nodeBackground};
  stroke: ${(props) => props.stroke || props.theme.nodeColor};
  &:hover {
    cursor: pointer;
    opacity: 0.8;
    stroke: ${(props) => props.theme.nodeBorderHover};
  }
`;

const FlowMapNode: React.FC<FlowMapNodeProps> = forwardRef<any, FlowMapNodeProps>((props, ref) => {
  const { id, x, y, width, height, style, color, strokeColor, strokeWidth, className, borderRadius, shapeRendering, onClick, ...rest } = props;
  const { background, backgroundColor } = style || {};
  const fill = (color || background || backgroundColor) as string;

  return (
    <FlowMapRectNode 
      ref={ref} 
      x={x}
      y={y}
      rx={borderRadius}
      ry={borderRadius}
      width={width}
      height={height}
      fill={fill}
      stroke={strokeColor}
      strokeWidth={strokeWidth}
      onClick={onClick ? (event: any) => onClick(event, id) : undefined}

    />
  );
});

export default FlowMapNode;
