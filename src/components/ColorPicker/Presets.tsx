import { FC, useEffect } from "react";
import styled, { useTheme } from "styled-components";
import { Color, Direction, areColorsEqual } from "./ColorUtils";
import React from "react";

const PresetsWrapper = styled.div.attrs<any>((props: any) => ({
  style: {
    gridTemplateColumns: props.direction === Direction.Horizontal ? 'repeat(auto-fill, minmax(16px, 1fr))' : 'auto',
    gridTemplateRows: props.direction === Direction.Vertical ? 'repeat(auto-fill, minmax(16px, 1fr))' : 'auto',
  },
}))<any>`
  display: grid;
  gap: 6px;
  width: auto;
  height: 100%;
  overflow: hidden;
`;

const PresetColor = styled.div.attrs<any>((props: any) => ({
  style: {
    background: props.color,
    width: props.size + 'px',
    height: props.size + 'px',
    border: `1px solid ${props.border ? props.border : props.theme.controlsColor}`,
  },
}))<any>`
  cursor: pointer;
  border-radius: 4px;
`;

export interface PresetsProps {
  color?: any;
  colors?: string[];
  onChange: (color: any) => void;
  direction?: Direction;
  size?: number;
};

const Presets: FC<PresetsProps> = ({
  color,
  colors=['#D0021B', '#F5A623', '#F8E71C', '#8B572A', '#7ED321', '#417505', '#BD10E0', '#9013FE', '#4A90E2', '#50E3C2', '#B8E986', '#000000', '#4A4A4A', '#9B9B9B', '#FFFFFF'], 
  onChange,
  direction = Direction.Horizontal,
  size = 16,
}: PresetsProps) => {
  const theme: any = useTheme();
  const handlePresetColorClick = (presetColor: string) => {
    onChange(new Color(presetColor));
  };

  return (
  <PresetsWrapper direction={direction}>
    {colors.map((presetColor, i) => (
      <PresetColor key={`preset-${presetColor}-${i}`} color={presetColor} onClick={() => handlePresetColorClick(presetColor)} size={size} border={areColorsEqual(color, presetColor) ? theme.primary : undefined} />
    ))}
  </PresetsWrapper>
  );
};

export default React.memo(Presets);
