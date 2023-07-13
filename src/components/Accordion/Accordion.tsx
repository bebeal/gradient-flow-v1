import React, { useState, ReactNode, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { ChevronDown, ChevronUp } from '../../svgs/icons';
import { Divider, noop, getOpaqueColor } from '../../constants';
import { Color } from '../ColorPicker';

export interface AccordionProps {
  children?: ReactNode;
  title?: string;
  expanded?: boolean;
  onClick?: () => void;
  checkToEnable?: boolean;
  onToggleMode?: (enabled: boolean) => void;
  fontSize?: string;
  padding?: string;
  alignItems?: string;
  justifyContent?: string;
  iconSize?: string;
  margin?: string;
}

const AccordionWrapper = styled.div<any>`
  display: flex;
  width: 100%;
  flex-direction: column;
  height: auto;
  background: ${props => props.theme.controlsBackground};
  color: #E4E6EB;
  overflow: hidden;
  box-shadow: 0px 0px 10px rgba(0,0,0,0.1);

  ${(props) =>
    !props.enabled ? css`

    `:``
  }
`;

const AccordionItemButton = styled.button<any>`
  position: relative;
  overflow: hidden;
  font-size: ${(props) => props.fontSize || '0.7rem'};
  border: 1px solid ${(props) => getOpaqueColor(props.theme.controlsColor) || 'transparent'};
  border-radius: 4px;
  color: #E4E6EB;
  width: 100%;
  height: 100%
  text-align: left;
  background: ${props => props.theme.controlsBackground};
  padding: ${(props) => props.padding || "10px 0 10px 0"};
  cursor: pointer;
  display: flex;
  align-items: ${(props) => props.alignItems || 'center'};
  justify-content: ${(props) => props.justifyContent || 'flex-start'};
  font-weight: bold;
  ${(props) =>
    props.enabled ? css`
      &:hover {
        background: ${props => props.theme.controlsBackgroundHover};
      }
    `
    : css`
  `}


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
  border: 1px solid ${(props) => getOpaqueColor(props.theme.controlsColor) || 'transparent'};
  border-radius: 4px;
  width: 100%;
  height: auto;
  display: flex;
  overflow: auto;
  transition: all 0.3s ease;
  ${(props) =>
  props.open &&
  css`
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    border-top: 1px solid ${getOpaqueColor(props.theme.controlsColor)};
  `}
`;

const AccordionIcon = styled.div<any>`
  transform: rotate(0deg);
  justify-content: center;
  align-items: center;
  transition: transform 0.3s ease-in-out;
  width: ${(props) => props.iconSize || '16px'};
  height: 100%;
  margin: ${(props) => props.margin || '0 4px 0 4px'};
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

const StyledCheckbox = styled.input.attrs({ type: 'checkbox' })<any>`
  width: 10px;
  height: 10px;
  margin-left: 10px;
  cursor: pointer;
  pointer-events: auto !important;
  opacity: 1 !important;
  filter: brightness(1.6);
`;

const Accordion: React.FC<AccordionProps> = ({ 
  children, 
  title, 
  expanded: initialExpanded = false, 
  onClick,
  checkToEnable=false,
  onToggleMode=noop,
  
  fontSize='0.7rem',
  padding='10px 0 10px 0',
  alignItems='center',
  justifyContent='flex-start',
  iconSize='16px',
  margin='0 4px 0 4px',
}) => {
  const [enabled, setEnabled] = useState(!checkToEnable);
  const [isOpen, setIsOpen] = useState(!checkToEnable && initialExpanded);

  useEffect(() => {
    setIsOpen(!checkToEnable && initialExpanded);
  }, [checkToEnable, initialExpanded]);

  const handleToggle = (event: any) => {
    event.stopPropagation();
    if (checkToEnable) {
      setEnabled(!enabled);
      if (onToggleMode) {
        onToggleMode(!enabled);
      }
    }
  }

  return (
    <AccordionWrapper enabled={enabled}>
      <AccordionItemButton alignItems={alignItems} justifyContent={justifyContent} padding={padding} fontSize={fontSize} enabled={enabled} open={isOpen} onClick={onClick ? onClick : () => setIsOpen(!isOpen)}>
        <>
        <AccordionIcon margin={margin} iconSize={iconSize} open={isOpen}>
          {ChevronDown}
        </AccordionIcon>
        {title}
        </>
        {/* {checkToEnable && (
          <StyledCheckbox
            checked={enabled}
            onChange={handleToggle}
            aria-label='Enable Accordion'
          />
        )} */}
      </AccordionItemButton>
      {isOpen && (
        <AccordionItemContent open={isOpen} enabled={enabled}>
          {children}
        </AccordionItemContent>
      )}
    </AccordionWrapper>
  );
};

export { Accordion };
