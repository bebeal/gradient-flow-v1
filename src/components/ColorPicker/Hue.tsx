  import { FC, useRef, useState, useEffect, useCallback } from "react";
  import styled from "styled-components";
import { Color } from "./ColorUtils";

  const HueBar = styled.div<any>`
    width: 100%;
    height: 16px;
    position: relative;
    height: ${props => props.size}px;
    border-radius: 2px;
    background: linear-gradient(to right, #f00 0%, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%);
    border: 1px solid ${props => props.theme.border};
    overflow: hidden;
  `;

  const HuePointer = styled.div<any>`
    position: absolute;
    height: 100%;
    width: ${props => props.pointerSize}px;
    border-radius: 4px;
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.6);
    background: #FFFFFF;
    top: 0;
    border: 1px solid ${props => props.theme.background};
  `;

  interface HueProps {
    hsv: any;
    onChange: (color: any) => void;
    size?: number;
    pointerSize?: number;
  };

  const Hue: FC<HueProps> = ({ hsv, onChange, size=16, pointerSize=4 }) => {
    const hueBar = useRef<any>(null);
    const [dragging, setDragging] = useState(false);

    const calculateHue = useCallback((e: any) => {
      if (hueBar.current) {
        const hueBarRect = hueBar.current.getBoundingClientRect();
        let x = e.clientX - hueBarRect.left;
        x = Math.max(0, Math.min(x, hueBarRect.width - pointerSize));
        let hue = 359 * (x / (hueBarRect.width - pointerSize));
        onChange?.(new Color({ h: hue, s: hsv.s, v: hsv.v, a: hsv.a })); // 'v' is used instead of 'l'
      }
    }, [pointerSize, onChange, hsv]);

    useEffect(() => {
      const handleMouseMove = (e: any) => {
        e.preventDefault();
        if (dragging) {
          calculateHue(e);
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
    }, [dragging, calculateHue]);

    const handleMouseDown = (e: any) => {  
      setDragging(true);
      calculateHue(e);
    };

    return (
      <HueBar ref={hueBar} onMouseDown={handleMouseDown} size={size} style={{cursor: dragging ? 'grab': 'pointer'}}>
        <HuePointer pointerSize={pointerSize} style={{
          left: `calc(${(hsv.h * 100 / 359)}% - ${(hsv.h * pointerSize) / 359}px)`}}
        />
      </HueBar>
    );
  };

  export default Hue;
