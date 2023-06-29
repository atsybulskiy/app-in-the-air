import { RouteObject } from 'react-router-dom';

import { Layout } from '../../../components/common/layout/Layout';
import { Orders } from '../../../pages/orders/Orders';
import { Reservation } from '../../../pages/reservation/Reservation';
import { Trip } from '../../../pages/trip/Trip';
import { RootBoundary } from '../../../components/common/root-boundary/RootBoundary';
import { Login } from '../../../pages/auth/login/Login';
import { Registration } from '../../../pages/auth/registration/Registration';
import { PrivateRoute } from '../../../components/common/private-route/PrivateRoute';

export const paths = {
  main: '/',
  orders: '/orders',
  trip: (id = ':id') => `/trip/${id}`,
  reservation: (id = ':id') => `/reservation/${id}`,
  registration: '/registration',
  login: '/login'
};

export const routes: RouteObject[] = [
  {
    path: paths.main,
    element: <Layout />,
    errorElement: <RootBoundary />,
    children: [
      {
        element: <PrivateRoute />,
        children: [{
          index: true,
          element: <Orders />
        },
          {
            path: paths.trip(),
            element: <Trip />
          },
          {
            path: paths.reservation(),
            element: <Reservation />
          }
        ]
      }
    ]
  },
  {
    path: paths.registration,
    element: <Registration />
  },
  {
    path: paths.login,
    element: <Login />
  }
];
