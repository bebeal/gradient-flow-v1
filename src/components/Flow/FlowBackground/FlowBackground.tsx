import React, { forwardRef } from "react";
import { Background } from "reactflow";
import styled from "styled-components";

export const BackgroundStyled = styled(Background)<any>`
  width: 100%;
  height: 100%;
`;

export interface FlowBackgroundProps {
};

const FlowBackground: React.FC<FlowBackgroundProps> = forwardRef<any, FlowBackgroundProps>((props, ref) => {
  const { } = props;

  return (
    <BackgroundStyled ref={ref} />
  );
});

export default FlowBackground;
