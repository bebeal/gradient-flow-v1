import { FC, useRef, useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { Checkboard } from "./ColorUtils";

const Mask = styled.div.attrs<any>((props: any) => ({
  style: {
    background: `linear-gradient(to right, rgba(${props.rgb.r},${props.rgb.g},${props.rgb.b},0) 0%, rgba(${props.rgb.r},${props.rgb.g},${props.rgb.b},1) 100%)`,
  },
}))<any>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const AlphaBar = styled.div.attrs<any>((props: any) => ({
  style: {
    background: `linear-gradient(to right, rgba(${props.rgb.r},${props.rgb.g},${props.rgb.b},0) 0%, rgba(${props.rgb.r},${props.rgb.g},${props.rgb.b},1) 100%)`,
    height: props.size + "px",
    border: `1px solid ${props.theme.controlsColor}`,
    cursor: props.dragging ? 'grab': 'pointer'
  },
}))<any>`
  overflow: hidden;
  border-radius: 2px;
  position: relative;
  width: 100%;
`;

const AlphaPointer = styled.div.attrs<any>((props: any) => ({
  style: {
    width: props.pointerSize + "px",
    border: `0.5px solid ${props.theme.controlsBorder}`,
    left: `calc(${props.rgb.a * 100}% - ${props.rgb.a * props.pointerSize}px)`
  },
}))<any>`
  border-radius: 4px;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.6);
  background: #FFFFFF;
  top: 0;
  position: absolute;
  height: 100%;
`;

interface AlphaProps {
  rgb: any;
  onChange: (color: any) => void;
  size?: number;
  pointerSize?: number;
};

const Alpha: FC<AlphaProps> = ({ rgb, onChange, size=16, pointerSize=3 }) => {
  const alphaBar = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState(false);

  const calculateAlpha = useCallback((e: any) => {
    if (!alphaBar.current) return;
    const { left, width } = alphaBar.current!.getBoundingClientRect();
    let x = e.pageX - left;
    x = Math.max(0, Math.min(x, width));
    let a = +(x / width)
    a = Math.min(1, Math.max(0, a));
    onChange?.({ ...rgb, a: a });
  }, [rgb, onChange]);


  const handleMouseDown = useCallback((e: any) => {
    if (!alphaBar.current) return;
    // e.preventDefault();
    // e.stopPropagation();
    setDragging(true);
    calculateAlpha(e);
  }, [calculateAlpha]);

  const handleMouseMove = useCallback((e: any) => {
    if (!alphaBar.current) return;
    if (dragging) {
      // e.preventDefault();
      // e.stopPropagation();
      calculateAlpha(e);
    }
  }, [dragging, calculateAlpha]);

  const handleMouseUp = useCallback((e: any) => {
    if (!alphaBar.current) return;
    // e.preventDefault();
    // e.stopPropagation();
    setDragging(false);
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  return (
    <AlphaBar ref={alphaBar} onMouseDown={handleMouseDown} size={size} rgb={rgb}>
      <Checkboard />
      <Mask rgb={rgb} />
      <AlphaPointer pointerSize={pointerSize} size={size} rgb={rgb}/>
    </AlphaBar>
  );
};

export default Alpha;
