  import React from "react";
  import { FC, useRef, useState, useCallback, useEffect } from "react";
  import styled from "styled-components";
import { Color } from "./ColorUtils";


  const SaturationMask = styled.div<any>`
    width: 100%;
    height: 100%;
    position: absolute;
  `;

  const SaturationWrapper = styled.div<any>`
    width: 175px;
    height: 175px;
    position: relative;
    overflow: hidden;
    border-radius: 4px;
    border: 0.5px solid ${props => props.theme.border};
  `;

  const SaturationPointer = styled.div<any>`
    position: absolute;
    width: ${(props) => props.pointerSize}px;
    height: ${(props) => props.pointerSize}px;
    border-radius: 50%;
    background: transparent;
    border: 1px solid #FFFFFF;
    box-shadow: 0 0 0 3px #000, 0 0 0 1.5px #fff, inset 0 0 1px 1px rgba(0,0,0,.3),
    0 0 1px 2px rgba(0,0,0,.4);
    transform: translate(-50%, -50%);
    
`;

interface SaturationProps {
  hsv?: any;
  onChange?: (color: any) => void;
  pointerSize?: number;
};

const Saturation: FC<SaturationProps> = (props) => {
  const { hsv, onChange, pointerSize = 10 } = props;
  const container = useRef<HTMLDivElement>(null);
  const [pointerPosition, setPointerPosition] = useState({ left: `${hsv.s * 100}%`, top: `${(1 - hsv.v) * 100}%` });
  const [dragging, setDragging] = useState(false);

  const calculateChange = useCallback((e: any) => {
    if (!container.current) return;
    const { top, left, width, height } = container.current.getBoundingClientRect();
    const x = typeof e.pageX === 'number' ? e.pageX : e.touches[0].pageX;
    const y = typeof e.pageY === 'number' ? e.pageY : e.touches[0].pageY;
    
    let relativeX = x - (window.scrollX + left);
    let relativeY = y - (window.scrollY + top);
    
    relativeX = Math.max(0, Math.min(relativeX, width));
    relativeY = Math.max(0, Math.min(relativeY, height));
    
    const saturation = relativeX / width;
    const brightness = 1 - (relativeY / height);
    setPointerPosition({ left: `${saturation * 100}%`, top: `${(1 - brightness) * 100}%` });
    onChange?.(new Color({ h: hsv.h, s: saturation * 100, v: brightness * 100, a: hsv.a }));
  }, [onChange, hsv]);

  useEffect(() => {
    const handleMouseMove = (e: any) => {
      e.preventDefault();
      if (dragging) {
        calculateChange(e);
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
  }, [calculateChange, dragging]);

  const handleMouseDown = (e: any) => {
    e.preventDefault();
    setDragging(true);
    calculateChange(e);
  };

  useEffect(() => {
    setPointerPosition({ left: `${hsv.s}%`, top: `${100 - hsv.v}%` });
  }, [hsv]);

  return (
    <SaturationWrapper onMouseDown={handleMouseDown} ref={container} color={hsv} style={{background: `hsl(${hsv.h}, 100%, 50%)`, cursor: dragging ? 'grab': 'pointer'}}>
      <SaturationMask style={{background: 'linear-gradient(to right, #fff, rgba(255,255,255,0))'}} />
      <SaturationMask style={{background: 'linear-gradient(to top, #000, rgba(0,0,0,0))'}} />
      <SaturationPointer dragging={dragging} pointerSize={pointerSize} style={pointerPosition}/>
    </SaturationWrapper>
  );
};


export default Saturation;
