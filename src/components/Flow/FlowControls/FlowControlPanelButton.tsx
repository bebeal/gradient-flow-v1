import { Resizable } from "re-resizable";
import { forwardRef, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { DraggableCore } from "react-draggable";
import styled from "styled-components";
import { Fit, Relative } from "../../../constants";

export interface FlowControlPanelButtonProps {
  id?: string;
  cellSize?: [any, any];
  component?: any;
  w?: any;
  h?: any;
  x?: any;
  y?: any;
  editable?: boolean;
  draggable?: boolean;
  resizeable?: boolean;
};

export const ButtonWrapper = styled.div<any>`
  display: flex;
  width: ${props => props.width}px;
  height: auto;
  position: relative;
  overflow: hidden;

  ${(props) => props.isDragging && `
    cursor: grabbing;
    border: 1px dashed ${props.theme.primary};
  `}
`;

export const DraggableWrapper = styled.div<any>`
  position: absolute;
  z-index: 50;
  transform: ${props => `translate(${props.x}px, ${props.y}px)`};
`;

export const FitWrapper = styled(Fit)<any>`

`;


export const FlowControlPanelButton = (props: FlowControlPanelButtonProps) => {
  const { id, x = 0, y = 0, w = '100%', h = '100%', cellSize=[1, 1], editable = false, draggable = true, resizeable = true, component = <></>, } = props;
  const ref = useRef<any>(null);

  const isDraggable = draggable && editable;
  const isResizable = resizeable && editable;

  const [isDragging, setIsDragging] = useState(false);
  const [dragPosition, setDragPosition] = useState({ x: x * cellSize[0], y: y * cellSize[1] });
  const [size, setSize] = useState({ width: w * cellSize[0], height: h * cellSize[1] });
  const ButtonComponent = component;

  const onStartDrag = useCallback((event: any) => {
    if (!isDraggable || !ref.current) return;
    // event.preventDefault();
    // event.stopPropagation();
    setIsDragging(true);
  }, [isDraggable]);

  const onStopDrag = useCallback((event: any) => {
    if (!isDraggable || !ref.current) return;
    // event.preventDefault();
    // event.stopPropagation();
    setIsDragging(false);
  }, [isDraggable]);

  const onDrag = useCallback((event: any, data: any) => {
    if (!isDraggable || !ref.current) return;
    // event.preventDefault();
    // event.stopPropagation();
    const newX = dragPosition.x + data.deltaX;
    const newY = dragPosition.y + data.deltaY;
    setDragPosition({ x: newX, y: newY });
  }, [dragPosition, isDraggable]);

  useEffect(() => {
    if(cellSize[0] > 0 && cellSize[1] > 0){
      setSize({ width: w * cellSize[0], height: h * cellSize[1] });
      setDragPosition({ x: x * cellSize[0], y: y * cellSize[1] });
    }
  }, [cellSize, w, h, x, y]);

  return (
    <DraggableCore handle={id} scale={1} nodeRef={ref} grid={cellSize} disabled={!isDraggable} onStart={onStartDrag} onStop={onStopDrag} onDrag={onDrag}>
      <DraggableWrapper id={id} className={id} ref={ref} x={dragPosition.x} y={dragPosition.y} isDragging={isDragging}>
        <ButtonWrapper width={size.width} height={size.height}>
          {ButtonComponent(props)}
        </ButtonWrapper>
      </DraggableWrapper>
    </DraggableCore>
  );
};

export default FlowControlPanelButton;
