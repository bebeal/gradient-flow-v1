import styled, { useTheme } from "styled-components";
import { FlowControlPanelButtonProps } from "./FlowControlPanelButton";
import LabeledAttributes from "../../LabeledAttribute/LabeledAttribute";
import { Label, LabeledArea, Padding, noop } from "../../../constants";
import { forwardRef, useCallback, useRef, useState } from "react";
import { ChevronSort } from "../../../svgs";
import Select from "../../Select/Select";
import Popup from "../../Popup/Popup";
import { nanoid } from "nanoid";

export const BaseButton = styled.div<any>`
  z-index: 50;
  color: ${(props) => props.theme.controlsColor};
  fill: ${(props) => props.theme.controlsColor};
  background: ${(props) => props.theme.controlsBackground};
  border: 0.5px solid ${(props) => props.theme.controlsBorder};
  border-radius: 4px;

  font-size: 0.65rem;
  font-weight: bold;
  text-align: center;
  text-transform: capitalize;
  font-family: 'Berkeley Mono', 'Roboto', sans-serif;

  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;

  ${(props) => props.active && `
    background: ${props.theme.controlsBackgroundHover};
  `}

  ${(props) => props.disabled && `
    opacity: 0.5;
    cursor: not-allowed;
  `}

  ${(props) => props.hoverable && `
  cursor: pointer;
  &:hover {
    background: ${props.theme.controlsBackgroundHover};
  }
 `}
`;

BaseButton.defaultProps = {
  hoverable: true,
  active: false,
  disabled: false,
};

const StyledButton = styled(BaseButton).attrs<any>((props: any) => ({
  as: 'button',
  style: {
    color: props.color || props.theme.controlsColor,
  },
}))<any>`
  > svg {
    width: 100%;
    height: 100%;
    padding: 6px;
  }
  
  width: 100%;
  height: 100%;
  display: flex;
`;

export const Button = forwardRef((props: any, ref: any) => {
  const { color, children, onClick, ...rest } = props;
  const clickFn = useCallback((event: any) => {
    if (onClick) {
      onClick(event);
    }
  }, [onClick]);

  return (
    <StyledButton {...rest} ref={ref} color={color} onClick={clickFn}>
      {children}
    </StyledButton>
  );
});

export const InputStyled = styled.input<any>`
z-index: 50;
display: flex;
justify-content: center;
align-items: center;
text-align: center;
width: 100%;
height: auto;
min-width: 4ch;
padding: 0px 4px;
margin: 1px;
background: ${(props) => props.theme.minimapMaskBackground};
color: ${(props) => props.theme.controlsColor};
border: 1px solid ${(props) => props.theme.controlsBorder};
border-radius: 4px;
&:focus, &:focus-visible {
  outline: 1px solid ${(props) => props.theme.controlsColor};
}
&:hover {
  border: 1px solid ${(props) => props.theme.controlsColor};
}
`;

export const Input = (props: any) => {
  const { value, onChange, ...rest } = props;
  return (
    <InputStyled value={value} onChange={onChange} />
  )
};

export const LabeledAttribute = (props: any) => {
  const { obj, layout='column', precision=2 } = props;
  return (
    <Button hoverable={false} {...props}>
      <LabeledAttributes layout={layout} precision={precision}>
        {obj}
      </LabeledAttributes>
    </Button>
  );
};


export const Labeled = ({label, children}: any) => {
  return (
    <LabeledArea>
      {label && label.length > 0 && <Label>{label}:</Label>}
      {children}
    </LabeledArea>
  );
};


export const LabeledSelector = (props: any) => {
  const { label, onChange, options, value=options[0], ...rest } = props;
  const onChangeCallback = useCallback((value: any) => {
    onChange(value);
  }, [onChange]);
  return (
    <Button {...rest} hoverable={false}>
      <Labeled label={label}>
          <Select value={value} onChange={onChangeCallback} options={options} /> 
      </Labeled>
    </Button>
  )
};

export const LabeledInput = (props: any) => {
  const { label, onChange, value, ...rest } = props;
  const onChangeCallback = useCallback((e: any) => {
    onChange(e?.target?.value);
  }, [onChange]);
  return (
    <Button {...rest} hoverable={false}>
      <Labeled label={label}>
          <Input value={value} onChange={onChangeCallback} />
      </Labeled>
    </Button> 
  );
}

export const ClickableButton = (props: any) => {
  const { onClick, children, color, ...rest } = props;
  const clickFn = useCallback((event: any) => {
    if (onClick) {
      onClick(event);
    }
  }, [onClick]);
  return <Button {...rest} onClick={clickFn} color={color}>{children}</Button>
};

export const ToggleButton = (props: any) => {
  const { onClick, defaultValue, activeValue, active, color, ...rest } = props;
  const clickFn = useCallback((event: any) => {
    if (onClick) {
      onClick(event);
    }
  }, [onClick]);
  return ( <Button {...rest} onClick={clickFn} active={active} color={color}>{active && activeValue ? activeValue : defaultValue}</Button> )
};

export const PopupButton = (props: any) => {
  const { buttonIcon, isOpen, onClose, togglePopup, children, color, ...rest } = props;
  const buttonRef = useRef<any>();
  const clickFn = useCallback((event: any) => {
    if (togglePopup) {
      togglePopup(event);
    }
  }, [togglePopup]);
  return (
    <>
      <Button {...rest} ref={buttonRef} active={isOpen} onClick={clickFn} color={color}>
        {buttonIcon}
      </Button>
      <Popup buttonRef={buttonRef} isOpen={isOpen} onClose={onClose}>
        {children}
      </Popup>
    </>
  )
};
