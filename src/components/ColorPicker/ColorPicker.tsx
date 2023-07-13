import React, { FC, MouseEvent, useCallback, useEffect, useRef, useState } from 'react';
import styled, { useTheme } from 'styled-components';
import Alpha from './Alpha';
import Presets from './Presets';
import Hue from './Hue';
import Saturation from './Saturation';
import { Color, ColorInputObject } from './ColorUtils';
import { Columns, Divider, Rows } from '../../constants';
import ColorResult from './ColorResult';

const ColorPickerWrapper = styled.div<any>`
  background: ${(props) => props.theme.controlsBackground};
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
`;

export const ShowOverflow = styled.div`
  
  `;

export interface ColorPickerProps {
  color: any;
  onColorChange?: (color: any) => void;
  disableAlpha?: boolean;
  presetColors?: string[];
}

// TODO: fix circular logic with hook state update vs this state
const ColorPicker: FC<ColorPickerProps> = (props) => {
  const { color: initialColor, onColorChange = () => {}, disableAlpha = false, presetColors } = props;
  const [color, setColor] = useState<any>(new Color(initialColor));
  
  useEffect(() => {
    setColor(new Color(initialColor));
  }, [initialColor]);

  const handleColorChange = useCallback((updatedValue: any) => {
    const newColor = new Color({ ...color, ...updatedValue });
    onColorChange(newColor);
  }, [color, onColorChange]);

  return (
    <ColorPickerWrapper>
      <Columns>
        <Saturation hsv={color.toHsva()} onChange={handleColorChange} />
        <Rows gap={0}>
          <Columns gap={0}>
          <Hue hsv={color.toHsva()} onChange={handleColorChange} />
            {!disableAlpha && <Alpha rgb={color.toRgba()} onChange={handleColorChange} />}
          </Columns>
          <ColorResult color={color.toHexString()}/>
        </Rows>
      </Columns>
      <Divider height={'1px'} margin={'4px'} />
      <Presets colors={presetColors} color={color.toHexString()} onChange={handleColorChange} />
    </ColorPickerWrapper>
  );
};


export default React.memo(ColorPicker);