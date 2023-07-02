import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';

import { TestFlow } from './pages';
import { generatePageName, renderRoutes } from './utils';

import './App.css';
import { Dark } from './themes';
import TestGrid from './pages/TestGrid';
import { Attribute, Label, LabeledArea } from './constants';
import TestDraw from './pages/TestDraw';
import TestAccordion from './pages/TestAccordion';
import TestTerminal from './pages/TestTerminal';
import TestCodeHighlight from './pages/TestCodeHighlight';
import TestMultiTerminal from './pages/TestMultiTerminal';
import TestTabs from './pages/TestTabs';
import TestControlPanel from './pages/TestControlPanel';

export const IntanceLabeledAttribute = (
  <LabeledArea theme={Dark}>
  <Label theme={Dark}>Label</Label>
  <Attribute theme={Dark}>Value</Attribute>
</LabeledArea>
);

export interface Page {
  path: string;
  component?: React.ReactNode;
  name?: string;
};

export const Pages: Page[] = [
  { path: "test-flow", component: <TestFlow />, name: generatePageName('/test-flow'),  },
  { path: "test-grid", component: <TestGrid />, name: generatePageName('/test-grid'),  },
  { path: "test-label", component: IntanceLabeledAttribute, name: generatePageName('/test-label'),  },
  { path: "test-draw", component: <TestDraw />, name: generatePageName('/test-draw'), },
  { path: "test-accordion", component: <TestAccordion />, name: generatePageName('/test-accordion'),},
  { path: "test-terminal", component: <TestTerminal />, name: generatePageName('/test-terminal'),},
  { path: "test-multiterminal", component: <TestMultiTerminal />, name: generatePageName('/test-multiterminal'),},
  { path: "test-codehighlight", component: <TestCodeHighlight />, name: generatePageName('/test-codehighlight'),},
  { path: "test-tabs", component: <TestTabs />, name: generatePageName('/test-tabs'),},
  { path: "test-controlpanel", component: <TestControlPanel />, name: generatePageName('/test-controlpanel'),},
  { path: "*", component: <div>404</div>, name: generatePageName('/'), },


];

export const injectPage = (path: string, component: React.ReactNode, name: string = generatePageName('/')) => {
  Pages.push({ path, component });
}

export const PageNames = Pages.map((page: any) => page.name);

export const AppTheme = Dark;

const AppWrapper = styled.div<any>`
  width: 100vw;
  height: 100vh;
  display: flex;
`;

const App = () => {
  return (
    <ThemeProvider theme={AppTheme}>
      <AppWrapper>
        <Router>
          <Routes>
            {renderRoutes(Pages)}
          </Routes>
        </Router>
      </AppWrapper>
    </ThemeProvider>
  );
};

export default App;
