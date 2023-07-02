import React, { createContext, forwardRef } from 'react';
import styled from 'styled-components';
import { OnSelectionChangeParams, ReactFlow, ReactFlowProps, ReactFlowProvider, useReactFlow } from "reactflow";
import Flow, { FlowProps } from './Flow';

import 'reactflow/dist/style.css';
import useFlowControls from '../../hooks/useFlowControls';

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
