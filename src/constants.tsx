import React from "react";
import styled from "styled-components";

// Generic Styled Components
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
  font-size: ${(props) => props.fontSize || '80%'};
  font-weight: bold;
  transform: scale(0.95);
  color: #E4E6EB;
  letter-spacing: 1;
  width: auto;
  height: auto;
  display: flex;
  text-transform: ${(props) => (props.capitalizeLabel ? 'capitalize' : 'none')};
  margin-bottom: 2px;
  background: transparent;
  pointer-events: none;
`;

export const Attribute = styled.div<any>`
  width: 100%;
  display: flex;
  font-size: ${(props) => props.fontSize || '100%'};
  color: #E4E6EB;
  transform: scale(0.9);
  align-items: center;
  justify-content: center;
`;

export const LabeledArea = styled.div<any>`
  display: flex;
  flex-direction: ${(props) => props.direction || 'column'};
  border: ${(props) => props.border || 'none'};
  align-items: flex-start;
  padding: 0;
  width: 100%;
  height: auto;
  overflow: hidden;
`;

export const Divider = styled.hr<any>`
  width: 100%;
  height: 1px;
  border: none;
  background: ${(props) => props.theme.controlsColor};
  border-radius: 2px;
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
