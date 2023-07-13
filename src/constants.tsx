import React from "react";
import styled from "styled-components";
import { Color } from "./components/ColorPicker";

export const getOpaqueColor = (hexColor: string, opacity: string = '0.5') => {
  const rgb = new Color(hexColor).toRgba();
  return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${opacity})`;
};


// Generic Styled Components
export const Fit = styled.div<any>`
  width: fit-content;
  height: fit-content;
`;

export const Flex = styled.div<any>`
  display: flex;
`;

export const FlexColumn = styled.div<any>`
  display: flex;
  flex-direction: column;
`;

export const FlexRow = styled.div<any>`
  display: flex;
  flex-direction: row;
`;

export const Box = styled.div<any>`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

export const FlexBox = styled.div<any>`
  display: flex;
  width: 100%;
  height: 100%;
`;

export const CenteredFlexBox = styled.div<any>`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

export const Relative = styled.div<any>`
  position: relative;
`;

export const Absolute = styled.div<any>`
  position: absolute;
`;

export const RelativeFlex = styled.div<any>`
  position: relative;
  display: flex;
`;

export const AbsoluteFlex = styled.div<any>`
  position: absolute;
  display: flex;
`;

export const FullRelativeFlex = styled.div<any>`
  position: relative;
  display: flex;
  width: 100%;
  height: 100%;
`;

export const FullAbsoluteFlex = styled.div<any>`
  position: absolute;
  display: flex;
  width: 100%;
  height: 100%;
`;

export const EmptySpace = styled.div<any>`
  flex: 1 1 0;
  width: ${(props) => props.width ? props.width : '100%'};
  height: ${(props) => props.height ? props.height : '100%'};
  overflow: hidden;
  padding: 0;
  margin: 0;
  display: flex;
`;

export const Disabled = styled.div<any>`
  pointer-events: all;
  opacity: 0.5;
  width: 100%;
  height: 100%;
  display: flex;
  cursor: not-allowed !important;
`;

export const Label = styled.label<any>`
  font-size: ${(props) => props.fontSize || '0.7rem'};
  font-weight: bold;
  color: #E4E6EB;
  letter-spacing: 1;
  width: auto;
  height: 100%;
  pointer-events: none;
  display: flex;
  text-transform: ${(props) => (props.capitalizeLabel ? 'capitalize' : 'none')};
  background: transparent;

  align-items: ${(props) => props.alignItems || 'flex-start'};

  white-space: normal;
  overflow-wrap: break-word;
  word-wrap: break-word;
  word-break: break-all; 
`;

export const Attribute = styled.div<any>`
  margin-left: 4px;
  width: auto;
  height: 100%;
  display: flex;
  font-size: ${(props) => props.fontSize || '0.65rem'};
  color: #E4E6EB;
  align-items: center;
  justify-content: center;
`;

export const LabeledArea = styled.div<any>`
  display: flex;
  flex-direction: ${(props) => props.direction || 'column'};
  border: ${(props) => props.border || '1px solid transparent'};
  border-radius: ${(props) => props.borderRadius || '0px'};
  align-items: ${(props) => props.alignItems || 'flex-start'};
  justify-content: ${(props) => props.justifyContent || 'flex-start'};
  text-align: ${(props) => props.textAlign || 'left'};
  padding: 4px;
  width: ${(props) => props.width || '100%'};
  height: ${(props) => props.height || 'auto'};
  overflow-x: ${(props) => props.overflowX || 'hidden'};
  overflow-y: ${(props) => props.overflowY || 'hidden'};
`;

export const Divider = styled.hr<any>`
  height: ${(props) => props.height || '0.1px'};
  display: flex;
  border: 0;
  margin: ${(props) => props.margin || '0px'};
  background: ${(props) => getOpaqueColor(props.theme.controlsColor)};
  border-radius: 2px;
`;

export const LightBorder = styled.div<any>`
  border: 1px solid ${(props) => props.theme.controlsColor};
  border-radius: 2px;
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100%;
  opacity: ${(props) => props.opacity || 0.5};
`;

export const Space = styled.div<any>`
  display: flex;
  flex: 1 1 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  padding: 0;
  margin: 0;
`;

export const noop = () => { };

export const Columns = styled.div<any>`
  flex-direction: column;
  display: flex;
  width: 100%;
  height: 100%;
  gap: ${(props) => props.gap || '4'}px;
  justify-content: ${(props) => props.justifyContent || 'center'};
  align-items: ${(props) => props.alignItems || 'stretch'};
`;

export const Rows = styled.div<any>`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  gap: ${(props) => props.gap || '4'}px;
  justify-content: ${(props) => props.justifyContent || 'center'};
  align-items: ${(props) => props.alignItems || 'center'};
`;

export const Centered = styled.div<any>`
  text-align: center;
  width: 100%;
`;

export const Container = styled.div<any>`
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: nowrap;
  margin: ${(props) => props.margin || '0 16px 0 0;'};
`;

export const Padding = styled.div<any>`
  width: 100%;
  height: 100%;
  padding: ${(props) => props.padding || '0 0 0 0'};
  margin: ${(props) => props.margin || '0 0 0 0'};
`;