import { useState } from "react";
import { Color } from "./ColorUtils";
import styled from "styled-components";
import { Rows, Columns, Centered, Container } from "../../constants";

export const ColorResultStyled = styled.div.attrs<any >((props) => ({
  style: {
    '--color': props.color,
    'animation': props.blinking ? 'blink 1s linear' : 'none',
  },
}))<any>`

  @keyframes blink {
    0% { border-color: ${props => props.theme.controlsColor}; }
    50% { border-color: ${props => props.theme.primary}; }
    100% { border-color: ${props => props.theme.controlsColor}; }
  }

  display: flex;
  width: 32px;
  padding-bottom: 36px;
  box-sizing: border-box; 

  border: 1px solid ${props => props.theme.controlsColor};
  border-radius: 4px;
  background: var(--color);
  cursor: pointer;

`;


export const ColorText = styled.div<any>`
  z-index: 50;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: black;
  font-size: 12px;
  text-align: center;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: ${props => props.orientation || 'column'};
  justify-content: center;
  align-items: center;
`;

export const RgbText = styled.div<any>`
  z-index: 50;
  display: flex;
  flex-direction: ${props => props.orientation || 'column'};
  text-align: left;
  justify-content: center;
`;

export const Rgb = ({ color, orientation='row' }: any) => {
  const c: any = new Color(color).toRgba();
  return (
  <RgbText orientation={orientation}>
    <Container>R:<Centered>{c.r.toFixed(0)}</Centered></Container>
    <Container>G:<Centered>{c.g.toFixed(0)}</Centered></Container>
    <Container>B:<Centered>{c.b.toFixed(0)}</Centered></Container>
  </RgbText>
);
  };


export const HexText = styled.div<any>`
  z-index: 50;
  display: flex;
  flex-direction: ${props => props.orientation || 'column'};
  align-items: center;
`;

export const HexValue = styled.div<any>`
  z-index: 50;
  display: flex;
  flex-direction: ${props => props.orientation || 'column'};
  align-items: center;
`;

export const Hex = ({ color, orientation='row' }: any) => {
  const hex = new Color(color).toHexString().replace('#', '').toUpperCase();
  console.log(hex)
  const R = hex.slice(0,2);
  const G = hex.slice(2,4);
  const B = hex.slice(4,6);
  return (
    <HexText orientation={orientation}>
      <Container>{orientation === 'row' ? '#' : '##'}</Container>
      <Container>{R}</Container>
      <Container>{G}</Container>
      <Container>{B}</Container>
    </HexText>
  );
};

export interface ColorResultProps {
  color: string;
};

const ColorResult = ({ color: propColor}: ColorResultProps) => {
  const color = new Color(propColor)
  const [blinking, setBlinking] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(color.toHexString());

    setBlinking(true);

    setTimeout(() => {
      setBlinking(false);
    }, 800);
  };

  return (
    <ColorResultStyled color={propColor} blinking={blinking} onClick={copyToClipboard}></ColorResultStyled>
  )
};

export default ColorResult;
