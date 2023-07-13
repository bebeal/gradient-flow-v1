import React, { createContext, forwardRef, useRef } from 'react';
import styled from 'styled-components';
import { ReactFlowProvider } from "reactflow";
import Flow, { FlowProps } from './Flow';

import 'reactflow/dist/style.css';

export interface FlowProviderProps extends FlowProps {
  
};

const FlowProviderWrapper = styled.div<any>`
  width: 100%;
  height: 100%;
  display: flex;
`;

const FlowProvider: React.FC<FlowProviderProps> = (props) => {
  return (
    <FlowProviderWrapper>
      <ReactFlowProvider>
          <Flow {...props} />
      </ReactFlowProvider>
    </FlowProviderWrapper>
  );
};

export default FlowProvider;
