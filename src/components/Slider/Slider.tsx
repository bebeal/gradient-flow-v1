import React, { useState, useRef, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import { nanoid } from 'nanoid';

const SliderWrapper = styled.div`
  width: 100%;
  height: 25px;
  display: flex;
  align-items: center;
  background: ${props => props.theme.controlsBackground};
  border-radius: 10px;
`;

const SliderTrack = styled.div`
  height: 2px;
  position: relative;
  flex-grow: 1;
  background: ${props => props.theme.controlsColor};
  border-radius: 10px;
  margin: 0 10px;
  cursor: pointer;
  pointer-events: all;
`;

const SliderThumb = styled.div.attrs((props: any) => ({
  style: {
    left: `calc(${((props.value - props.min) / (props.max - props.min)) * 100}% - ${props.thumbSize / 2}px)`,
    cursor: props.mouseDown ? 'grab' : 'pointer',
    background: props.color,
    width: props.thumbSize + 'px',
    height: props.thumbSize + 'px',
  },
}))<any>`
  position: absolute;
  border-radius: 50%;
  box-shadow: 0px 0px 5px #0003;
  user-select: none;
  top: 50%;
  transform: translateY(-50%);
`;

const Notch = styled.div.attrs((props: any) => ({
  style: {
    width: props.notchSize + 'px',
    height: props.notchSize + 'px',
    left: ((props.value - props.min) / (props.max - props.min)) * 100 + '%',
    background: props.theme.controlsColor,
  },
}))<any>`
  position: absolute;
  border-radius: 50%;
  user-select: none;
  top: 50%;
  transform: translateY(-50%);
`;

export interface SliderProps {
  min: number;
  max: number;
  value: number;
  onChange: (value: number) => void;
  color?: string;
  thumbSize?: number;
  notchSize?: number;
};

const Slider = ({ min, max, value, onChange, color, thumbSize = 10, notchSize=4 }: SliderProps) => {
  const [mouseDown, setMouseDown] = useState(false);
  const sliderRef = useRef<HTMLDivElement | null>(null);

  const changeValue = useCallback((event: any) => {
    if (!sliderRef.current) return;

    const sliderRect = sliderRef.current.getBoundingClientRect();
    const clickPosInSlider = event.clientX - sliderRect.left;
    const sliderWidth = sliderRect.width;
    let newValue = ((clickPosInSlider / sliderWidth) * (max - min)) + min;

    if (newValue < min) newValue = min;
    if (newValue > max) newValue = max;
    onChange(newValue);
  }, [min, max, onChange]);

  const handleMouseDown = useCallback((event: any) => {
    if (!sliderRef.current) return;
    event.preventDefault();
    event.stopPropagation();
    setMouseDown(true);
    changeValue(event);
  }, [changeValue]);

  const handleMouseMove = useCallback((event: any) => {
    if (!mouseDown || !sliderRef.current) return;
    changeValue(event);
  }, [changeValue, mouseDown]);

  const handleMouseUp = useCallback(() => {
    if (!sliderRef.current) return;
    setMouseDown(false);
  }, []);

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  const getNotches = () => {
    const notches = [];
    for (let i = min; i <= max; i++) {
      notches.push(<Notch key={`notch-${i}-${nanoid()}`} value={i} min={min} max={max} notchSize={notchSize} />);
    }
    return notches;
  }

  return (
    <SliderWrapper>
      <SliderTrack
        ref={sliderRef}
        onClick={changeValue}
        onMouseDown={handleMouseDown}
      >
        {notchSize > 0 && getNotches()}
        <SliderThumb 
          thumbSize={thumbSize}
          color={color} 
          min={min}
          max={max}
          value={value}
          mouseDown={mouseDown}
        />
      </SliderTrack>
    </SliderWrapper>
  );
};

export default Slider;
