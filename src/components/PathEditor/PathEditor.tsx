import React from 'react';
import styled, { useTheme } from 'styled-components';
import StrokePicker, { StrokePickerProps } from '../StrokePicker/StrokePicker';
import ColorPicker, { ColorPickerProps } from '../ColorPicker/ColorPicker';
import { Divider, getOpaqueColor, noop } from '../../constants';

const PathEditorContainer = styled.div<any>`
  z-index: 50;
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
  height: auto;
  padding: 8px;
  background: ${(props) => props.theme.controlsBackground};
  border-radius: 4px;
  box-shadow: 0 0 0 1px rgba(0,0,0,.15), 0 8px 16px rgba(0,0,0,.15);
  border: 1px solid ${(props) => getOpaqueColor(props.theme.controlsColor) || 'transparent'};

  pointer-events: all;
  cursor: auto;
  position: relative;

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
  const { strokeWidth=1, strokeStyle='solid', onStrokeChange, color='#ff0072', onColorChange, disableAlpha = false, presetColors } = props;
  
  return (
    <PathEditorContainer>
      <StrokePicker color={color} strokeWidth={strokeWidth} strokeStyle={strokeStyle} onStrokeChange={onStrokeChange} />
      <Divider />
      <ColorPicker color={color} onColorChange={onColorChange} disableAlpha={disableAlpha} presetColors={presetColors} />
    </PathEditorContainer>
  );
};

export default PathEditor;
