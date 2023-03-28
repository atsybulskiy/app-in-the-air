import {Orders} from '../pages/orders/Orders';
import {Trip} from '../pages/trip/Trip';
import {Reservation} from '../pages/reservation/Reservation';

interface IRoutes {
  path: string;
  content: () => JSX.Element;
}

export const paths = {
  main: '/',
  orders: '/orders',
  flight: (id = ':id') => `/flight/${id}`,
  reservation: (id = ':id') => `/reservation/${id}`
};

export const MainRoutes: IRoutes[] = [
  {
    path: paths.main,
    content: () => <Orders/>
  }, {
    path: paths.flight(),
    content: () => <Trip/>
  }, {
    path: paths.reservation(),
    content: () => <Reservation/>
  }
];
