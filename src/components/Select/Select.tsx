import React, { useState, ReactNode, useRef, useEffect } from 'react';
import styled, { useTheme } from 'styled-components';
import { Box } from '../../constants';
import { createPortal } from 'react-dom';
import { ChevronSort } from '../../svgs/icons';

export const SelectButton = styled.button<any>`
  z-index: 50;
  font-family: 'Berkeley Mono', 'Roboto', sans-serif;
  color: ${(props) => props.theme.controlsColor};
  background: transparent;
  border: none;
  border-radius: 4px;
  font-size: 0.8rem;
  width: 100%;
  height: 100%;
  font-weight: bold;
  margin: 0;
  padding: 0px;
  text-align: left;
  text-transform: capitalize;
  cursor: pointer;

  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;

  &:focus, &:focus-visible {
    outline: none;
  }
`;

export const Dropdown = styled.div<any>`
  z-index: 50;
  font-family: 'Berkeley Mono', 'Roboto', sans-serif;
  color: ${(props) => props.theme.controlsColor};
  background: ${(props) => props.theme.controlsBackground};
  border: 0.5px solid ${(props) => props.theme.controlsBorder};
  border-radius: 4px;
`;

export const Option = styled.div<any>`
  z-index: 50;
  font-family: 'Berkeley Mono', 'Roboto', sans-serif;
  color: ${(props) => props.theme.controlsColor};
  background: ${(props) => props.theme.controlsBackground};
  cursor: pointer;
  &:hover {
    background: ${(props) => props.theme.controlsBackgroundHover};
  }

  border-radius: 4px;
  padding: 2px;
  width: 100%;
  font-size: 0.8rem;
  font-weight: bold;
  margin: 0;
  padding: 2px;
  text-align: left;
  text-transform: capitalize;
  position: relative;
`;

interface SelectOptionProps {
  value: string;
  children: ReactNode;
  onSelect: (value: string) => void;
};

const SelectOption = ({ value, children, onSelect, closeMenu }: SelectOptionProps & { closeMenu: () => void; }) => {
  const theme = useTheme();
  return (
    <Option theme={theme} onClick={() => {
      onSelect(value);
      closeMenu();
    }}>
      {children}
    </Option>
  );
};

export interface SelectProps {
  value?: any;
  onChange: (value: any) => void;
  options: any[];
};

const Select = (props: SelectProps) => {
  const theme = useTheme();
  const { value, onChange, options } = props;
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLButtonElement>(null);
  const [rect, setRect] = useState<DOMRect | null>(null);

  const toggling = () => {
    setIsOpen(!isOpen);
  };
  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    if (ref.current) {
      setRect(ref.current.getBoundingClientRect());
    }
  }, [isOpen]);

  return (
    <>
      <SelectButton ref={ref} theme={theme} onClick={toggling}>{/* selected={!isOpen} */}
        {value}
        {ChevronSort}
      </SelectButton>
      {isOpen && rect &&
        createPortal(
          <Dropdown theme={theme} style={{
            position: 'fixed',
            top: rect.bottom,
            left: rect.left,
            width: rect.width,
          }}>
            {options.map((option) => (
              <SelectOption key={option} value={option} onSelect={onChange} closeMenu={closeMenu}>
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
