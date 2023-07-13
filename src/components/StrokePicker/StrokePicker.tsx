import React, { useState } from 'react';
import styled, { useTheme } from 'styled-components';
import ColorPicker from '../ColorPicker/ColorPicker';
import Slider from '../Slider/Slider';

export interface StrokePickerProps {
  strokeWidth?: number;
  strokeStyle?: string;
  onStrokeChange?: (strokeWidth: number, strokeStyle: string) => void;
  color?: any;
};

export const StrokeStyles: any = {
  'solid': '',
  'dashed': '5,5',
  'dotted': '1,2',
  'double': '10,5,1,5'
};
export const StrokeStyleOptions = Object.keys(StrokeStyles);

const StrokeContainer = styled.div<any>`
  display: flex;
  flex-direction: column;
  background: ${(props) => props.theme.controlsBackground};
`;

const StrokeOptionWrapper = styled.div<any>`
background: ${(props) => props.theme.controlsBackground};
padding: 8px;
border: 1px solid ${(props) => props.selected ? props.theme.primary : props.theme.controlsBorder};
border-radius: 4px;
box-shadow: 0 0 0 1px rgba(0,0,0,.15), 0 8px 16px rgba(0,0,0,.15);
display: flex;
cursor: pointer;

`;

const StrokeOptionRow = styled.div`
  display: flex;
  gap: 4px;
`;

const StrokePicker: React.FC<StrokePickerProps> = ({ strokeWidth: initialStrokeWidth = 2, strokeStyle: initialStrokeStyle = StrokeStyleOptions[0], onStrokeChange, color='#ff0072' }) => {
  const [selectedThickness, setSelectedThickness] = useState<number>(initialStrokeWidth);
  const [selectedStyle, setSelectedStyle] = useState<string>(initialStrokeStyle);

  const handleThicknessChange = (thickness: number) => {
    setSelectedThickness(thickness);
    if (onStrokeChange) {
      onStrokeChange(thickness, selectedStyle);
    }
  };

  const handleStyleChange = (style: string) => {
    setSelectedStyle(style);
    if (onStrokeChange) {
      onStrokeChange(selectedThickness, style);
    }
  };

  return (
    <StrokeContainer>
      <StrokeOptionRow>
        <Slider
          min={0}
          max={10}
          value={selectedThickness}
          onChange={(value: number) => handleThicknessChange(value)}
          color={color}
        />
      </StrokeOptionRow>
      <StrokeOptionRow>
        {StrokeStyleOptions.map((style, index) => (
          <StrokeOptionWrapper onClick={() => handleStyleChange(style)} key={`stroke-${style}-${index}`} selected={style === selectedStyle}>
          <svg width={"100%"} height={"100%"} viewBox="0 0 24 24">
            <rect width="100%" height="100%" fill="transparent" stroke={color} strokeWidth={selectedThickness} strokeDasharray={StrokeStyles[style]} />
          </svg>
          </StrokeOptionWrapper>
        ))}
      </StrokeOptionRow>
    </StrokeContainer>
  );
};

export default StrokePicker;
