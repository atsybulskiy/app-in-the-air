import { LoaderFunction } from '@remix-run/router/utils';

import { Trip } from '../pages/trip/Trip';
import { Orders, ordersLoader } from '../pages/orders/Orders';
import { Reservation } from '../pages/reservation/Reservation';
import { orderLoader } from '../pages/common/orderLoader';

interface IRoutes {
  path: string;
  content: () => JSX.Element;
  loader?: LoaderFunction;
}

export const paths = {
  main: '/',
  orders: 'orders',
  trip: (id = ':id') => `trip/${id}`,
  reservation: (id = ':id') => `reservation/${id}`
};

export const MainRoutes: IRoutes[] = [
  {
    path: paths.main,
    content: () => <Orders />,
    loader: ordersLoader
  },
  {
    path: paths.trip(),
    content: () => <Trip />,
    loader: orderLoader
  },
  {
    path: paths.reservation(),
    content: () => <Reservation />,
    loader: orderLoader
  }
];
