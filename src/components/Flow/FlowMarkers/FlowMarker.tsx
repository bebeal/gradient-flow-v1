import styled, { useTheme } from "styled-components";


export interface CustomFlowMarker {
  
  fillColor?: string;
  strokeColor?: string;
  strokeWidth?: number;
};

const SvgWrapper = styled.svg`
  position: absolute;
  top: 0;
  left: 0;
`;

const FlowMarker = (props: CustomFlowMarker) => {
  const {
    fillColor,
    strokeColor='#b1b1b7',
    strokeWidth,
  } = props;
  const theme: any = useTheme();
  // stroke={props?.strokeColor ?? theme?.controlsColor ?? 'transparent'}
  return (
    <SvgWrapper>
      <defs>
        <marker id="dot"             
                viewBox="0 0 4 4"
                markerHeight={4}
                markerWidth={4}
                refX={1.5}
                refY={2} 
                orient="auto-start-reverse"
        >
          <circle cx="2" cy="2" r="1" fill={props?.fillColor ?? theme?.primary ?? 'currentColor'} stroke={props?.strokeColor ?? theme?.controlsColor ?? 'transparent'} strokeWidth={props?.strokeColor ?? '0.5'} />
        </marker>
      </defs>
      <defs>
        <marker id="funnel-selected"             
            viewBox="0 0 6 6"
            markerHeight={1.75}
            markerWidth={2.75}
            refX={-0.25}
            refY={3.25} 
            orient="auto-start-reverse"
        >
          <g opacity={'1'}>
            <path d="M 0    0 L 2.75    0 L 2 3 L 1 3 Z" fill={props?.strokeColor ?? theme?.controlsColor ?? 'transparent'} stroke={props?.strokeColor ?? theme?.controlsColor ?? 'transparent'} strokeWidth={props?.strokeWidth ?? '1'} transform="scale(0.9) rotate(-90 2.5 2.5)"  strokeLinejoin="round"/>
            <path d="M 0 -0.5 L 2.75 -0.5 L 2 3 L 1 3 Z" fill={props?.fillColor ?? theme?.primary ?? 'currentColor'} stroke={'none'} transform="scale(0.9) rotate(-90 2.5 2.5)" strokeLinecap="round" strokeLinejoin="round" />
            </g>
        </marker>
      </defs>
      <defs>
      <marker id="funnel"             
          viewBox="0 0 6 6"
          markerHeight={1.75}
          markerWidth={2.75}
          refX={0}
          refY={3.25} 
          orient="auto-start-reverse"
      >
        <g opacity={'0.7'}>
          <path d="M 0    0 L 2.75 0    L 2 3 L 1 3 Z" fill={props?.strokeColor ?? theme?.controlsColor ?? 'transparent'} stroke={props?.strokeColor ?? theme?.controlsColor ?? 'transparent'} strokeWidth={props?.strokeWidth ?? '1'} transform="scale(0.9) rotate(-90 2.5 2.5)"  strokeLinejoin="round"/>
          <path d="M 0 -0.5 L 2.75 -0.5 L 2 3 L 1 3 Z" fill={props?.fillColor ?? theme?.primary ?? 'currentColor'} stroke={'none'} transform="scale(0.9) rotate(-90 2.5 2.5)" strokeLinecap="round" strokeLinejoin="round" />
          </g>
      </marker>
      </defs>
    </SvgWrapper>
  );
};

export default FlowMarker;
