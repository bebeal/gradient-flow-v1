import React, { useState, ReactNode } from 'react';
import styled, { css } from 'styled-components';
import { ChevronDown, ChevronUp } from '../../svgs/icons';
import { Divider } from '../../constants';

export interface AccordionProps {
  children?: ReactNode;
  title?: string;
  expanded?: boolean;
}

const AccordionWrapper = styled.div`
  width: 100%;
  background: ${props => props.theme.controlsBackground};
  color: #E4E6EB;
`;

const AccordionItemButton = styled.button<any>`
  border: 2px solid${(props) => props.theme.controlsBorder};
  color: #E4E6EB;
  width: 100%;
  text-align: left;
  padding: 10px 0 10px 0;
  background: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  &:hover {
    background: ${props => props.theme.controlsBackgroundHover};
  }

  ${({ open }) =>
  open &&
  css`
    border-bottom: none;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  `}
`;

const AccordionItemContent = styled.div<any>`
  padding: 0;
  border: 2px solid ${(props) => props.theme.controlsBorder};

  ${({ open }) =>
  open &&
  css`
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  `}
`;

const AccordionIcon = styled.div<{open: boolean}>`
  transform: rotate(0deg);
  transition: transform 0.3s ease-in-out;
  width: 16px;
  height: 16px;
  margin-right: 4px;
  display: flex;
  color: #E4E6EB;
  fill: #E4E6EB;
  stroke: #E4E6EB;

  ${({ open }) =>
    open &&
    css`
      transform: rotate(180deg);
    `}
`;

const Accordion: React.FC<AccordionProps> = ({ children, title, expanded: initialExpanded = false }) => {
  const [isOpen, setIsOpen] = useState(initialExpanded);

  return (
    <AccordionWrapper>
      <AccordionItemButton open={isOpen} onClick={() => setIsOpen(!isOpen)}>
        <AccordionIcon open={isOpen}>
          {ChevronDown}
        </AccordionIcon>
        {title}
      </AccordionItemButton>
      {isOpen && (
        <AccordionItemContent open={isOpen}>
          {children}
        </AccordionItemContent>
      )}
    </AccordionWrapper>
  );
};

export { Accordion };
