import { FC, useRef, useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import { Color } from "./ColorUtils";


const HueBar = styled.div.attrs<any>((props: any) => ({
  style: {
    border: `1px solid ${props.theme.controlsColor}`,
    cursor: props.dragging ? "grab" : "pointer",
    height: props.size + "px",
  },
}))<any>`
  border-radius: 2px;
  background: linear-gradient(
    to right,
    #f00 0%,
    #ff0 17%,
    #0f0 33%,
    #0ff 50%,
    #00f 67%,
    #f0f 83%,
    #f00 100%
  );
  width: 100%;
  position: relative;
  overflow: hidden;
`;


const HuePointer = styled.div.attrs<any>((props: any) => ({
  style: {
    width: props.pointerSize + "px",
    border: `0.5px solid ${props.theme.controlsBorder}`,
    left: `calc(${(props.hsv.h * 100) / 359}% - ${ (props.hsv.h * props.pointerSize) / 359 }px)`

  },
}))<any>`
  position: absolute;
  height: 100%;
  border-radius: 4px;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.6);
  background: #ffffff;
  top: 0;
`;

interface HueProps {
  hsv: any;
  onChange: (color: any) => void;
  size?: number;
  pointerSize?: number;
}

const Hue: FC<HueProps> = ({ hsv, onChange, size = 16, pointerSize = 3 }) => {
  const hueBar = useRef<any>(null);
  const [dragging, setDragging] = useState(false);

  const calculateHue = useCallback(
    (e: any) => {
      if (!hueBar.current) return;
      const hueBarRect = hueBar.current.getBoundingClientRect();
      let x = e.clientX - hueBarRect.left;
      x = Math.max(0, Math.min(x, hueBarRect.width - pointerSize));
      let hue = 359 * (x / (hueBarRect.width - pointerSize));
      onChange?.(new Color({ h: hue, s: hsv.s, v: hsv.v, a: hsv.a })); // 'v' is used instead of 'l'
    },
    [pointerSize, onChange, hsv]
  );

  const handleMouseDown = useCallback((e: any) => {
    if (!hueBar.current) return;
    // e.preventDefault();
    // e.stopPropagation();
    setDragging(true);
    calculateHue(e);
  }, [calculateHue]);

  const handleMouseMove = useCallback((e: any) => {
    if (!hueBar.current) return;
    if (dragging) {
      // e.preventDefault();
      // e.stopPropagation();
      calculateHue(e);
    }
  }, [dragging, calculateHue]);

  const handleMouseUp = useCallback((e: any) => {
    if (!hueBar.current) return;
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
    <HueBar
      ref={hueBar}
      onMouseDown={handleMouseDown}
      pointerSize={pointerSize}
      size={size}
      dragging={dragging}
    >
      <HuePointer
        pointerSize={pointerSize}
        hsv={hsv}
      />
    </HueBar>
  );
};

export default Hue;
