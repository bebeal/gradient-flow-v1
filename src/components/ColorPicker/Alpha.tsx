import { FC, useRef, useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { Checkboard } from "./ColorUtils";

const Mask = styled.div<any>`
position: absolute;
top: 0;
left: 0;
right: 0;
bottom: 0;
background: ${props => `linear-gradient(to right, rgba(${props.rgb.r},${props.rgb.g},${props.rgb.b},0) 0%, rgba(${props.rgb.r},${props.rgb.g},${props.rgb.b},1) 100%)`};
`;

const AlphaBar = styled.div<any>`
  position: relative;
  width: 100%;
  height: ${props => props.size}px;
  border-radius: 2px;
  border: 1px solid ${props => props.theme.border};
  background: ${props => `linear-gradient(to right, rgba(${props.rgb.r},${props.rgb.b},${props.rgb.b},0) 0%, rgba(${props.rgb.r},${props.rgb.g},${props.rgb.b},1) 100%)`};
  overflow: hidden;
`;

const AlphaPointer = styled.div<any>`
  position: absolute;
  height: 100%;
  width: ${props => props.pointerSize}px;
  border-radius: 4px;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.6);
  background: #FFFFFF;
  top: 0;
  border: 1px solid ${props => props.theme.background};
`;

interface AlphaProps {
  rgb: any;
  onChange: (color: any) => void;
  size?: number;
  pointerSize?: number;
};

const Alpha: FC<AlphaProps> = ({ rgb, onChange, size=16, pointerSize=4 }) => {
  const alphaBar = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState(false);

  const calculateAlpha = useCallback((e: any) => {
    const { left, width } = alphaBar.current!.getBoundingClientRect();
    let x = e.pageX - left;
    x = Math.max(0, Math.min(x, width));
    let a = +(x / width)
    a = Math.min(1, Math.max(0, a));
    onChange?.({ ...rgb, a: a });
  }, [rgb, onChange]);

  useEffect(() => {
    const handleMouseMove = (e: any) => {
      e.preventDefault();
      if (dragging) {
        calculateAlpha(e);
      }
    };

    const handleMouseUp = (e: any) => {
      e.preventDefault();
      setDragging(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    }
  }, [dragging, calculateAlpha]);

  const handleMouseDown = (e: any) => {
    e.preventDefault();
    setDragging(true);
    calculateAlpha(e);
  };

  return (
    <AlphaBar ref={alphaBar} onMouseDown={handleMouseDown} size={size} rgb={rgb} style={{cursor: dragging ? 'grab': 'pointer'}}>
      <Checkboard />
      <Mask rgb={rgb} />
      <AlphaPointer pointerSize={pointerSize} style={{left: `calc(${rgb.a * 100}% - ${rgb.a * pointerSize}px)`}} />
    </AlphaBar>
  );
};

export default Alpha;
