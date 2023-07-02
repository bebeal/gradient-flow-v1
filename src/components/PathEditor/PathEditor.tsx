import React from 'react';
import styled, { useTheme } from 'styled-components';
import StrokePicker, { StrokePickerProps } from '../StrokePicker/StrokePicker';
import ColorPicker, { ColorPickerProps } from '../ColorPicker/ColorPicker';
import { Divider } from '../../constants';

const PathEditorContainer = styled.div<any>`
  display: flex;
  flex-direction: column;
  gap: 4px;
  height: 100%;
  padding: 8px;
  box-sizing: initial;
  background: ${(props) => props.theme.background};
  border: 1px solid ${(props) => props.theme.border};
  border-radius: 4px;
  box-shadow: 0 0 0 1px rgba(0,0,0,.15), 0 8px 16px rgba(0,0,0,.15);
  width: auto;
  pointer-events: auto;
  cursor: auto;
`;

export interface PathEditorProps {
  color: any;
  onColorChange?: (color: any) => void;
  disableAlpha?: boolean;
  presetColors?: string[];
  strokeWidth?: number;
  strokeStyle?: string;
  onStrokeChange?: (strokeWidth: number, strokeStyle: string) => void;
};

const PathEditor: React.FC<PathEditorProps> = (props) => {
  const { strokeWidth=1, strokeStyle='solid', onStrokeChange, color='#ff0072', onColorChange = () => {}, disableAlpha = false, presetColors =  ['#D0021B', '#F5A623', '#F8E71C', '#8B572A', '#7ED321', '#417505', '#BD10E0', '#9013FE', '#4A90E2', '#50E3C2', '#B8E986', '#000000', '#4A4A4A', '#9B9B9B', '#FFFFFF'] } = props;
  
  return (
    <PathEditorContainer>
      <StrokePicker color={color} strokeWidth={strokeWidth} strokeStyle={strokeStyle} onStrokeChange={onStrokeChange} />
      <Divider />
      <ColorPicker color={color} onColorChange={onColorChange} disableAlpha={disableAlpha} presetColors={presetColors} />
    </PathEditorContainer>
  );
};

export default PathEditor;
