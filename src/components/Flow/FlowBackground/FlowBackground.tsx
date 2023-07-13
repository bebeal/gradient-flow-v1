import React, { forwardRef } from "react";
import { Background, BackgroundProps } from "reactflow";
import styled from "styled-components";

export const BackgroundStyled = styled(Background)<any>`
  width: 100%;
  height: 100%;
`;

export interface FlowBackgroundProps extends BackgroundProps {
  
};

const FlowBackground: React.FC<FlowBackgroundProps> = forwardRef<any, FlowBackgroundProps>((props, ref) => {
  const { id } = props;

  return (
    <BackgroundStyled {...props} id={id} ref={ref} />
  );
});

export default FlowBackground;
