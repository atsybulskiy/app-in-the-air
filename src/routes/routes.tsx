import { RouteObject } from 'react-router-dom';

import { Layout } from '../components/common/layout/Layout';
import { Orders } from '../pages/orders/Orders';
import { Reservation } from '../pages/reservation/Reservation';
import { orderLoader } from '../pages/common/orderLoader';
import { Trip } from '../pages/trip/Trip';
import { RootBoundary } from '../components/common/root-boundary/RootBoundary';

export const paths = {
  main: '/',
  orders: 'orders',
  trip: (id = ':id') => `trip/${id}`,
  reservation: (id = ':id') => `reservation/${id}`
};

export const routes: RouteObject[] = [
  {
    path: paths.main,
    element: <Layout />,
    errorElement: <RootBoundary />,
    children: [
      { index: true, element: <Orders /> },
      {
        path: paths.trip(),
        element: <Trip />
      },
      {
        path: paths.reservation(),
        element: <Reservation />,
        loader: orderLoader
      }
    ]
  }
];
