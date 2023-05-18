import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { routes } from './routes/routes';
import { authApi, useAppSelector } from './redux';
import { Loader } from './components/common/loader/Loader';

const router = createBrowserRouter(routes);

export const App = () => {
  const { isAuth } = useAppSelector((state) => state.userState);

  const { isLoading } = authApi.endpoints.checkAuth.useQuery(null, {
    skip: !localStorage.getItem('token')
  });

  console.log('%c⇒ isAuth', 'color: #89DDF7', isAuth, isLoading);

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
