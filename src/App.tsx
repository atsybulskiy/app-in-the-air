import React from 'react';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';

import { MainRoutes, paths } from './routes/routes';
import { Layout } from './components/common/layout/Layout';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path={paths.main} element={<Layout />}>
      {MainRoutes.map((route) => (
        <Route path={route.path} element={route.content()} key={route.path} loader={route.loader} />
      ))}
    </Route>
  )
);

export const App = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};
