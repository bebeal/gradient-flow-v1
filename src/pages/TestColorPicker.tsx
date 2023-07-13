import { useState } from "react";
import PathEditor from "../components/PathEditor/PathEditor";
import ColorResult, { ColorText, Hex, HexValue, Rgb } from "../components/ColorPicker/ColorResult";
import { Color } from "../components/ColorPicker";
import { Columns, Rows } from "../constants";

const TestColorPicker = () => {
  const [color, setColor] = useState('#ff0072');
  const [strokeWidth, setStrokeWidth] = useState(1);
  const [strokeStyle, setStrokeStyle] = useState('solid');

  const handleStrokeChange = (strokeWidth: number, strokeStyle: string) => {
    setStrokeWidth(strokeWidth);
    setStrokeStyle(strokeStyle);
  };

  const handleColorChange = (colorResult: any) => {
    setColor(colorResult.toHexString());
  };
  const orientation = 'column';

  return (
    <div style={{width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
    <div style={{width: '50%', height: '100%', display: 'flex'}}>
      <PathEditor color={color} onColorChange={handleColorChange} strokeWidth={strokeWidth} strokeStyle={strokeStyle} onStrokeChange={handleStrokeChange} />
    </div>
    <Rows gap={40}>
    <Rgb color={color} orientation={orientation} />
    <Hex color={color} orientation={orientation} />
    </Rows>
    </div>
  )
};

export default TestColorPicker;
