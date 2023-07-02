import React, { forwardRef, useImperativeHandle, useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { Copy, CopySuccess } from '../../svgs';

const FitWrapper = styled.div<any>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: fit-content;
  height: auto;
  border-radius: 4px;
  padding: 4px;
  cursor: pointer;
`;

const ClickAnimation = createGlobalStyle`
  @keyframes click {
    0% { transform: scale(1); }
    50% { transform: scale(1.2); }
    100% { transform: scale(1); }
  }
`;

const StyledButton = styled.div<any>`
  display: flex;
  width: fit-content;
  height: fit-content;
`;

const Icon = styled.div<any>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: fit-content;
  height: fit-content;
  margin-right: ${(props: any) => props.hasText ? '2px' : '0'};
  animation: ${(props: any) => props.clicked ? 'click' : 'none'} 0.4s linear;
`;

const Text = styled.div<any>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: fit-content;
  height: fit-content;
  margin-left: 2px;
  font-size: 1rem;
`;

export interface CopyButtonProps {
  contentToCopy?: string;
  text?: string | string[];
  size?: string;
};


const CopyButton = forwardRef(({
  contentToCopy="",
  text="",
  size="16px",
}: CopyButtonProps, ref) => {
  const [clicked, setClicked] = useState(false);
  const hasText = text && text.length > 0;
  const baseText = hasText && typeof(text) === 'string' ? text : text[0];
  const successText = hasText && typeof(text) === 'string' ? text : text.length > 1 ? text[1] : text[0];
  const baseIcon = <div style={{display: 'flex', width: size, height: size}}>{Copy}</div>;
  const successIcon = <div style={{display: 'flex', width: size, height: size}}>{CopySuccess}</div>;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(contentToCopy);
      setClicked(true);
      setTimeout(() => setClicked(false), 300);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

    // Expose copyToClipboard function to parent via ref
    useImperativeHandle(ref, () => ({
      copyToClipboard
    }));
  
  return (
    <FitWrapper onClick={copyToClipboard}>
      <ClickAnimation />
      <StyledButton clicked={clicked}>
        <Icon hasText={hasText} clicked={clicked}>{clicked ? successIcon : baseIcon}</Icon>
        { hasText &&
          <Text>{clicked ? successText : baseText}</Text>
        }
      </StyledButton>
    </FitWrapper>
  )
});

export default CopyButton;
