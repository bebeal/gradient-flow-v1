import React, { useState, useEffect, useRef, useCallback } from 'react';
import styled from 'styled-components';

const SliderWrapper = styled.div`
  width: 100%;
  height: 25px;
  display: flex;
  align-items: center;
  background: ${(props) => props.theme.background};
  border-radius: 10px;
`;

const SliderTrack = styled.div`
  height: 2px;
  position: relative;
  flex-grow: 1;
  background: ${(props) => props.theme.controlsColor};
  border-radius: 10px;
  margin: 0 10px;
  cursor: pointer;
`;

const SliderThumb = styled.div`
  position: absolute;
  width: 10px;
  height: 10px;
  background: ${(props) => props.color};
  border-radius: 50%;
  box-shadow: 0px 0px 5px #0003;
  cursor: pointer;
  user-select: none;
  transform: translateY(-25%);
`;

const Notch = styled.div<any>`
  position: absolute;
  height: 4px;
  width: 4px;
  background: ${(props) => props.theme.controlsColor};
  border-radius: 50%;
  box-shadow: 0px 0px 5px #0003;
  transform: translateY(-25%);
  cursor: pointer;
`;

export interface SliderProps {
  min: number;
  max: number;
  value: number;
  onChange: (value: number) => void;
  color?: string;
};

const Slider = (props: SliderProps) => {
  const { min, max, value, onChange, color } = props;
  const [mouseDown, setMouseDown] = useState(false);
  const sliderWrapperRef = useRef<HTMLDivElement | null>(null);
  const translatePercentage = ((value - min) / (max - min)) * 100;

  const handleMouseDown = (event: any) => {
    event.preventDefault();
    setMouseDown(true);
  }

  const handleMouseUp = useCallback((event: any) => {
    event.preventDefault();
    setMouseDown(false);
  }, []);

  const changeValue = useCallback((event: any, round: boolean = false) => {
    if (!sliderWrapperRef.current) return;
    const rect = sliderWrapperRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const translate = Math.min(Math.max(x / rect.width, 0), 1);
    let newValue = min + translate * (max - min);
    if (round) {
      newValue = Math.round(newValue);
      if (newValue < min) newValue = min;
      if (newValue > max) newValue = max;
    }
    onChange(newValue);
  }, [min, max, onChange]);

  const handleMouseMove = useCallback((event: any, round: boolean = false) => {
    event.preventDefault();
    if (!mouseDown || !sliderWrapperRef.current) return;
    changeValue(event, round);
  }, [mouseDown, changeValue]);

  useEffect(() => {
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mouseDown, handleMouseUp, handleMouseMove, value]);

  const notches = [];
  for (let i = Math.floor(min); i <= Math.ceil(max); i++) {
    notches.push(
      <Notch onClick={(e: any) => changeValue(e, true)} key={i} style={{left: `${(((i - min) / (max - min)) * 100)}%`}} />
    );
  }

  return (
    <SliderWrapper ref={sliderWrapperRef}>
      <SliderTrack onClick={(e) => changeValue(e, true)}>
        {notches}
        <SliderThumb 
          color={color} 
          style={{ left: `calc(${translatePercentage}%)`, cursor: mouseDown ? 'grab' : 'pointer' }}
          onMouseDown={handleMouseDown}
        />
      </SliderTrack>
    </SliderWrapper>
  );
};

export default Slider;
