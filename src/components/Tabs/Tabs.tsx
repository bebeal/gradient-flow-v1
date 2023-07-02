import React, { useState, ReactElement } from 'react';
import styled, { ThemeProvider } from 'styled-components';

type TabType = {
  label: string,
  icon?: ReactElement,
  content: any
};

type TabsProps = {
  tabs: any[],
  initialTab?: number,
  borders?: boolean,
  borderSize?: number,
  borderRadius?: number,
};

type IconPosition = 'top' | 'left' | 'right' | 'bottom';

type TabProps = {
  index: number,
  active: boolean,
  borderRadius?: number,
  borderSize?: number,
  borders?: boolean,
  onClick: () => void,
  label?: string,
  icon?: ReactElement,
  iconPosition?: IconPosition,
}

const FlexDirectionMap: any = {
  'top': 'column',
  'bottom': 'column-reverse',
  'right': 'row-reverse',
  'left': 'row',
};

const LabelWrapper = styled.div<any>`
  display: flex;
  flex-direction: ${({ iconPosition }) => FlexDirectionMap[iconPosition] || 'row'};
  align-items: center;
  justify-content: center;
  gap: 5px;
`;

const IconWrapper = styled.div<any>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: auto;
  height: 16px;
`;

const TabWrapper = styled.div<any>`
display: flex;
background: ${(props) => props.theme.controlsBackground};
border-radius: ${(props) => props.borderRadius}px ${(props) => props.borderRadius}px 0 0;
`;

const TabButton = styled.button<any>`
  display: flex;
  border-radius: ${(props) => props.borderRadius}px ${(props) => props.borderRadius}px 0 0;
  border: none;
  width: 100%;
  height: 100%;
  padding: 8px;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  text-wrap: nowrap;
  background: ${(props) => props.theme.controlsBackground};
  color: ${(props) => props.theme.nodeColor};
  fill: ${(props) => props.theme.nodeColor};
  cursor: pointer;
  position: relative;

  ${props => props.active ? `
    border: ${props.borderSize}px solid ${props.borders ? props.theme.primary: props.theme.controlsBorder};
    border-bottom: ${props.borderSize}px solid ${props.borders ? props.theme.controlsBorder: 'transparent'};
    color: ${props.theme.primary};
    fill: ${props.theme.primary};
    ` : `
    border-bottom: ${props.borderSize}px solid transparent;
    `}
`;

const getTabPanelBorderRadius = (activeTab: any, numTabs: any, borderRadius: any) => {
  if (activeTab === 0) {
    return `0 ${borderRadius}px ${borderRadius}px ${borderRadius}px`;
  } else if (activeTab === numTabs - 1) {
    return `${borderRadius}px 0 ${borderRadius}px ${borderRadius}px`;
  } else {
    return `${borderRadius}px`;
  }
};

const TabPanel = styled.div<any>`
  padding: 8px;
  height: 100%;
  width: 100%;
  overflow: hidden;
  background: ${(props) => props.theme.controlsBackground};
  border: ${(props) => props.borderSize}px solid ${(props) => props.borders ? props.theme.primary : props.theme.controlsBorder};
  border-radius: ${(props) => getTabPanelBorderRadius(props.activeTab, props.numTabs, props.borderRadius)};
  margin-top: -${(props) => props.borderSize}px;
  color: ${(props) => props.theme.nodeColor};
`;

const Tab = ({ index=0, active, onClick, label, icon, iconPosition='left', borders=true, borderSize=2, borderRadius=4 }: TabProps) => (
  <TabButton index={index} borderSize={borderSize} borders={borders} borderRadius={borderRadius} active={active} onClick={onClick}>
    <LabelWrapper iconPosition={iconPosition}>
      {icon && <IconWrapper>{icon}</IconWrapper>}
      {label}
    </LabelWrapper>
  </TabButton>
);

const Tabs = ({ tabs, initialTab = 0, borders=true, borderSize=1, borderRadius=2 }: TabsProps) => {
  const [activeTab, setActiveTab] = useState(initialTab);

  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };

  return (
      <div>
        <TabWrapper borderSize={borderSize} borders={borders} borderRadius={borderRadius}>
          {tabs.map((tab, index) => (
            <Tab
              index={index}
              borderSize={borderSize}
              borders={borders}
              borderRadius={borderRadius}
              key={index}
              active={activeTab === index} 
              onClick={() => handleTabClick(index)} 
              label={tab.label} 
              icon={tab.icon}
            />
          ))}
        </TabWrapper>
        <TabPanel borderSize={borderSize} borders={borders} borderRadius={borderRadius} activeTab={activeTab} numTabs={tabs.length}>
          {tabs[activeTab]?.content}
        </TabPanel>
      </div>
  );
};

export default Tabs;
