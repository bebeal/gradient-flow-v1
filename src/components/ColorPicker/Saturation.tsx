import React from "react";
import { FC, useRef, useState, useCallback, useEffect } from "react";
import styled from "styled-components";
import { Color } from "./ColorUtils";
import { Relative } from "../../constants";

const ColorTooltip = styled.div.attrs<any>((props: any) => ({
  style: {
    left: `${props.pointerPosition.left}%`,
    top: `${props.pointerPosition.top}%`,
    background: props.theme.background,
    border: `2px solid ${props.color}`,
  },
}))<any>`
  overflow: visible;
  position: absolute;
  z-index: 9999;
  padding: 4px;
  border-radius: 10px;
  font-size: 12px;
  white-space: nowrap;
  transform: translate(-50%, calc(-100% - 10px));
`;

const SaturationMask = styled.div.attrs<any>((props: any) => ({
  style: {
    background: props.background,
  },
}))<any>`
  width: 100%;
  height: 100%;
  position: absolute;
  pointer-events: none;
`;

const SaturationWrapper = styled.div.attrs<any>((props: any) => ({
  style: {
    border: `1px solid ${props.theme.controlsColor}`,
    background: `hsl(${props.hsv.h}, 100%, 50%)`,
    cursor: props.dragging ? "grab" : "pointer",
  },
}))<any>`
  z-index: 50;
  width: 100%;
  height: 175px;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
`;

const SaturationPointer = styled.div.attrs<any>((props: any) => ({
  style: {
    left: props.pointerPosition.left + "%",
    top: props.pointerPosition.top + "%",
    width: props.pointerSize + "px",
    height: props.pointerSize + "px",
  },
}))<any>`
  position: absolute;
  border-radius: 50%;
  background: transparent;
  border: 1px solid #ffffff;
  box-shadow: 0 0 0 2px ${props => props.theme.background}, 0 0 0 1px ${props => props.theme.controlsColor},
    inset 0 0 1px 1px rgba(0, 0, 0, 0.3), 0 0 1px 2px rgba(0, 0, 0, 0.4);
  transform: translate(-50%, -50%);
`;

const RelativeOverflow = styled.div<any>`
  position: relative;
  overflow: visible;
`;

interface SaturationProps {
  hsv?: any;
  onChange?: (color: any) => void;
  pointerSize?: number;
}

const Saturation: FC<SaturationProps> = (props) => {
  const { hsv, onChange, pointerSize = 10 } = props;
  const [dragging, setDragging] = useState<any>(false);
  const container = useRef<any>(null);
  const [pointerPosition, setPointerPosition] = useState<any>({
    left: hsv?.s * 100,
    top: (1 - hsv?.v) * 100,
  });

  const calculateChange = useCallback((e: any) => {
      if (!container.current) return;
      const { top, left, width, height } = container.current.getBoundingClientRect();
      const x = typeof e.pageX === "number" ? e.pageX : e.touches[0].pageX;
      const y = typeof e.pageY === "number" ? e.pageY : e.touches[0].pageY;

      let relativeX = x - (window.scrollX + left);
      let relativeY = y - (window.scrollY + top);

      relativeX = Math.max(0, Math.min(relativeX, width));
      relativeY = Math.max(0, Math.min(relativeY, height));

      const saturation = relativeX / width;
      const brightness = 1 - relativeY / height;
      onChange?.(
        new Color({
          h: hsv.h,
          s: saturation * 100,
          v: brightness * 100,
          a: hsv.a,
        })
      );
    }, [hsv.a, hsv.h, onChange]);

  const handleMouseMove = useCallback((e: any) => {
      if (!container.current || !dragging) return;
      // e.preventDefault();
      // e.stopPropagation();
      calculateChange(e);
  }, [calculateChange, dragging]);

  const handleMouseUp = useCallback((e: any) => {
      if (!container.current) return;
      // e.preventDefault();
      // e.stopPropagation();
      setDragging(false);
  }, []);

  const handleMouseDown = useCallback((e: any) => {
    if (!container.current) return;
    // e.stopPropagation();
    // e.preventDefault();
    setDragging(true);
    calculateChange(e);
  }, [calculateChange]);

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  useEffect(() => {
    setPointerPosition({ left: hsv.s, top: 100 - hsv.v });
  }, [hsv.s, hsv.v]);

  return (
    <RelativeOverflow>
          {dragging && (
        <ColorTooltip color={new Color(hsv).toHexString()} pointerPosition={pointerPosition}>
          {`${new Color(hsv).toHexString()}`}
        </ColorTooltip>
      )}
    <SaturationWrapper onMouseDown={handleMouseDown} ref={container} hsv={hsv} dragging={dragging} >
      <SaturationMask background={"linear-gradient(to right, #fff, rgba(255,255,255,0))"} />
      <SaturationMask background={"linear-gradient(to top, #000, rgba(0,0,0,0))"} />
      <SaturationPointer pointerPosition={pointerPosition} pointerSize={pointerSize} />
    </SaturationWrapper>
    </RelativeOverflow>
  );
};

export default Saturation;
