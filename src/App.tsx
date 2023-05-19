import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { routes } from './routes/routes';
import { authApi, useAppSelector } from './redux';
import { Loader } from './components/common/loader/Loader';

const router = createBrowserRouter(routes);

export const App = () => {
  const { token } = useAppSelector(state => state.authState);

  const { isLoading } = authApi.endpoints.checkAuth.useQuery(null, {
    skip: !token
  });

  if (isLoading) {
    return <Loader />;
  } else {
    return (
      <>
        <RouterProvider router={router} />
      </>
    );
  }
};
