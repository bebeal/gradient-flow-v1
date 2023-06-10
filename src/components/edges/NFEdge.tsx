import React, { forwardRef } from 'react';
import styled from 'styled-components';

export interface NFEdgeProps {

};

const NFEdgeWrapper = styled.div<NFEdgeProps>`
  
`;

const NFEdge: React.FC<NFEdgeProps> = forwardRef<any, NFEdgeProps>((props, ref) => {
  return (
    <NFEdgeWrapper {...props} ref={ref}>
      NFEdge
    </NFEdgeWrapper>
  );
});

export default NFEdge;
