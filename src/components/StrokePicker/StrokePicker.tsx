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
  background: ${(props) => props.theme.background};
`;

const StrokeOptionSquare = styled.svg<any>`
  width: 24px;
  height: 24px;
  margin: 8px;
  cursor: pointer;
`;

const StrokeOptionRow = styled.div`
  display: flex;
  gap: 4px;
`;

const StrokePicker: React.FC<StrokePickerProps> = ({ strokeWidth: initialStrokeWidth = 1, strokeStyle: initialStrokeStyle = StrokeStyleOptions[0], onStrokeChange, color='#ff0072' }) => {
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
        {StrokeStyleOptions.map((style) => (
          <StrokeOptionSquare
            color={color}
            key={style}
            onClick={() => handleStyleChange(style)}
          >
            <rect width="100%" height="100%" fill="transparent" stroke={color} strokeWidth={selectedThickness} strokeDasharray={StrokeStyles[style]} />
          </StrokeOptionSquare>
        ))}
      </StrokeOptionRow>
    </StrokeContainer>
  );
};

export default StrokePicker;
