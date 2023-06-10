import React, { forwardRef } from 'react';
import styled from 'styled-components';

export interface NFNodeProps {

};

const NFNodeWrapper = styled.div<NFNodeProps>`
  
`;

const NFNode: React.FC<NFNodeProps> = forwardRef<any, NFNodeProps>((props, ref) => {
  return (
    <NFNodeWrapper {...props} ref={ref}>
      NFNode
    </NFNodeWrapper>
  );
});

export default NFNode;
