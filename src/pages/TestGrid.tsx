import React from "react";
import styled from "styled-components";
import { Attribute, CenteredFlexBox, Label, LabeledArea } from "../constants";
import { ExampleEdges, ExampleNodes, HierarchicalEdges, HierarchicalNodes } from "../test-data";
import { FlowProvider } from "../components";
import Grid from "../components/Grid/Grid";

const TestGridWrapper = styled.div<any>`
  width: 100%;
  height: 100%;
  border: 1px solid white;
`;

interface TestGridProps {
};

const TestGrid = (props: TestGridProps) => {
  const {} = props;

  return (
    <CenteredFlexBox>
      <TestGridWrapper>
        <Grid />
      </TestGridWrapper>
    </CenteredFlexBox>
  )
};

export default TestGrid;
