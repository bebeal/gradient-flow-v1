import React, { FC, MouseEvent, useCallback, useEffect, useRef, useState } from 'react';
import styled, { useTheme } from 'styled-components';
import Alpha from './Alpha';
import Presets from './Presets';
import Hue from './Hue';
import Saturation from './Saturation';
import { BarOptions, BarsWithResult, Color, ColorInputObject, ColorResult } from './ColorUtils';
import { Divider } from '../../constants';

const ColorPickerWrapper = styled.div<any>`
  background: ${(props) => props.theme.background};
`;

export interface ColorPickerProps {
  color: any;
  onColorChange?: (color: any) => void;
  disableAlpha?: boolean;
  presetColors?: string[];
}

const ColorPicker: FC<ColorPickerProps> = (props) => {
  const { color: initialColor, onColorChange = () => {}, disableAlpha = false, presetColors =  ['#D0021B', '#F5A623', '#F8E71C', '#8B572A', '#7ED321', '#417505', '#BD10E0', '#9013FE', '#4A90E2', '#50E3C2', '#B8E986', '#000000', '#4A4A4A', '#9B9B9B', '#FFFFFF'] } = props;
  const [color, setColor] = useState(new Color(initialColor));

  const handleColorChange = useCallback((updatedValue: ColorInputObject) => {
    const newColor = new Color({ ...color, ...new Color(updatedValue) });
    setColor(newColor);
    onColorChange(newColor);
  }, [color, onColorChange]);

  return (
    <ColorPickerWrapper>
      <Saturation hsv={color.toHsva()} onChange={handleColorChange} />
      <BarsWithResult>
        <BarOptions>
        <Hue hsv={color.toHsva()} onChange={handleColorChange} />
          {!disableAlpha && <Alpha rgb={color.toRgba()} onChange={handleColorChange} />}
        </BarOptions>
        <ColorResult color={color.toHexString()}/>
      </BarsWithResult>
      <Divider />
      <Presets colors={presetColors} onChange={handleColorChange} />
    </ColorPickerWrapper>
  );
};


export default ColorPicker;