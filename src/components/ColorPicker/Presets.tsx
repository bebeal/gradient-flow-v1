import { FC } from "react";
import styled from "styled-components";
import { Color, Direction } from "./ColorUtils";

const PresetsWrapper = styled.div<any>`
  display: grid;
  gap: 6px;
  ${({ direction }) =>
  direction === Direction.Horizontal
    ? "grid-template-columns: repeat(auto-fill, minmax(16px, 1fr));"
    : "grid-template-rows: repeat(auto-fill, minmax(16px, 1fr));"}
`;

const PresetColor = styled.div<any>`
  background: ${props => props.color};
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  border: 0.5px solid ${props => props.theme.border};
  cursor: pointer;
  border-radius: 4px;
`;

export interface PresetsProps {
  colors: string[];
  onChange: (color: any) => void;
  direction?: Direction;
  size?: number;
};

const Presets: FC<PresetsProps> = ({
  colors, 
  onChange,
  direction = Direction.Horizontal,
  size = 16,
}: PresetsProps) => {

  const handlePresetColorClick = (presetColor: string) => {
    onChange(new Color(presetColor));
  };

  return (
  <PresetsWrapper direction={direction}>
    {colors.map((color, i) => (
      <PresetColor key={i} color={color} onClick={() => handlePresetColorClick(color)} size={size} style={{cursor: 'pointer'}} />
    ))}
  </PresetsWrapper>
  );
};

export default Presets;
