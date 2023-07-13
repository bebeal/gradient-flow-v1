import React, { useState, ReactNode, useRef, useEffect, useLayoutEffect, useCallback } from 'react';
import styled, { useTheme } from 'styled-components';
import { Box, Flex } from '../../constants';
import { createPortal } from 'react-dom';
import { ChevronSort } from '../../svgs/icons';
import { nanoid } from 'nanoid';

export const SelectButton = styled.div<any>`
  border: 1px solid ${(props) => props.theme.controlsBorder};
  background: ${(props) => props.theme.minimapMaskBackground};
  border-radius: 4px;
  padding: 0px 4px;

  display: flex;
  width: 100%;
  height: auto;
  justify-content: center;
  align-items: center;
  padding: 2px;

  white-space: normal;
  overflow-wrap: break-word;
  word-wrap: break-word;
  word-break: break-all; 

  z-index: 50
  pointer-events: all;

  &:focus, &:focus-visible {
    outline: none;
  }

  > svg {
    width: 0.7rem !important;
  }

  &:hover {
    border: 1px solid ${(props) => props.theme.controlsColor};
  }
  
`;


export const Dropdown = styled.div<any>`
  z-index: 50;
  color: ${(props) => props.theme.controlsColor};
  background: ${(props) => props.theme.minimapMaskBackground};
  border: 1px solid ${(props) => props.theme.controlsBorder};
  border-radius: 4px;
  position: absolute;
  top: ${(props) => props.rect.bottom}px;
  left: ${(props) => props.rect.left}px;
  width: ${(props) => props.rect.width}px;
  height: auto;
  padding: 2px;
  overflow-y: auto;
  &:hover {
    border: 1px solid ${(props) => props.theme.controlsColor};
  }
`;

export const Option = styled.div<any>`
  border-radius: 4px;
  width: 100%;
  height: 100%;
  font-weight: bold;
  margin: 0;
  padding: 1px;
  text-align: center;
  text-transform: capitalize;
  font-size: 0.7rem;
  color: ${(props) => props.theme.controlsColor};
  background: ${(props) => props.theme.minimapMaskBackground};
  cursor: pointer;

  white-space: normal;
  overflow-wrap: break-word;
  word-wrap: break-word;

  &:hover {
    background: ${(props) => props.theme.controlsBackgroundHover};
  }
`;

interface SelectOptionProps {
  value: string;
  children: ReactNode;
  onSelect: (value: string) => void;
};

const SelectOption = ({ value, children, onSelect, closeMenu }: SelectOptionProps & { closeMenu: () => void; }) => {
  return (
    <Option onClick={(event: any) => { event.stopPropagation(); onSelect(value); closeMenu(); }}> {children} </Option>
  );
};

export interface SelectProps {
  value?: any;
  onChange: (value: any) => void;
  options: any[];
};

const Select = (props: SelectProps) => {
  const { value, onChange, options } = props;
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLButtonElement>(null);
  const [rect, setRect] = useState<DOMRect | null>(null);
  
  const toggling = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  const closeMenu = useCallback(() => {
    setIsOpen(false);
  }, []);

  useLayoutEffect(() => {
    if (isOpen && ref.current) {
      setRect(ref.current.getBoundingClientRect());
    }
  }, [isOpen]);

  // Close dropdown if clicked outside of it
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (ref.current && !ref.current.contains(event.target)) {
        closeMenu();
      }
    }
    if (isOpen) {
      document.addEventListener('click', handleClickOutside);
    } else {
      document.removeEventListener('click', handleClickOutside);
    }
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen, closeMenu]);

  const onChangeCallback = useCallback((value: string) => {
    onChange(value);
  }, [onChange]);

  return (
    <>
      <SelectButton ref={ref} onClick={toggling}>{value} {ChevronSort} </SelectButton>
      {isOpen && rect &&
        createPortal(
          <Dropdown rect={rect}>
            {options.map((option, index) => (
              <SelectOption key={`selected-${option}-${index}`} value={option} onSelect={onChangeCallback} closeMenu={closeMenu}>
                {option}
              </SelectOption>
            ))}
          </Dropdown>,
          document.body
        )
      }
    </>
  );
};

export default Select;
