import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';

import { TestFlow } from './pages';
import { generatePageName, renderRoutes } from './utils';

import './App.css';
import { Dark } from './themes';

export interface Page {
  path: string;
  component?: React.ReactNode;
  name?: string;
};

export const Pages: Page[] = [
  { path: "test-flow", component: <TestFlow />, name: generatePageName('/'),  },
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
