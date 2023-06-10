import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Page } from "./App";

/* For App.tsx */
export const renderRoutes = (pages: Page[]) => {
  return pages.map((page: any) => (
    <Route key={page.path} path={page.path} element={
      <>
        {page.component}
      </>
    } />
  ));
}

export const generatePageName = (path: string) => {
  const name = path.split('/').pop();
  if (name) {
    return name.split('-').map(word => word[0].toUpperCase() + word.slice(1)).join(' ');
  }
  return '';
};

export const generatePagePath = (name: string) => {
  return '/' + (name.toLowerCase().split(' ').join('-'));
};


