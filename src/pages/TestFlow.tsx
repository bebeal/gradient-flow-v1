import React from "react";
import styled from "styled-components";
import { CenteredFlexBox } from "../constants";
import { ExampleEdges, ExampleNodes, HierarchicalEdges, HierarchicalNodes } from "../test-data";
import { FlowProvider } from "../components";

const TestFlowWrapper = styled.div<any>`
  width: 100%;
  height: 100%;
`;

interface TestFlowProps {
  nodesForFlow?: any[];
  edgesForFlow?: any[];
};

const TestFlow = (props: TestFlowProps) => {
  const {
    nodesForFlow = HierarchicalNodes,
    edgesForFlow = HierarchicalEdges,
  } = props;

  return (
    <CenteredFlexBox>
      <TestFlowWrapper>
        <FlowProvider initialNodes={nodesForFlow} initialEdges={edgesForFlow} />
      </TestFlowWrapper>
    </CenteredFlexBox>
  )
};

export default TestFlow;
