import {Link} from 'react-router-dom';
import {format, parseISO} from 'date-fns';

import styles from './order-item.module.scss';
import hotel from '../../images/hotel.svg';

import {paths} from '../../routes/routes';
import {Order, OrderTypes} from '../../models/IOrder';

interface IProps {
  order: Order;
}

export const OrderItem = ({order}: IProps) => {
  const isFlight = order.type === OrderTypes.Flight;

  return <div className={styles.container}>
    <div className={styles.logo}>
      <img src={isFlight ? order.flight_company_logo : hotel} alt={''}/>
    </div>
    <div className={styles.info}>
      <div
        className={styles.title}>{isFlight ? `${order.outbound_origin} - ${order.outbound_destination}` : order.hotel_name}</div>
      <div className={styles.meta}>
        {isFlight
          ? <div>{format(parseISO(order.outbound_departure_date), 'dd')} - {format(parseISO(order.return_arrival_date), 'dd MMM')}</div>
          : <div>{format(parseISO(order.check_in_date), 'dd')} - {format(parseISO(order.check_out_date), 'dd MMM')}</div>}

        <div>{isFlight ? order.passengers?.join(', ') : order.guests.join(', ')}</div>
        <div>{isFlight ? `Bookref: ${order.booking_reference}` : `Confirmation number: ${order.confirmation_number}`}</div>
      </div>
    </div>
    <div>
      <div className={styles.price}>${order.total_price}</div>
      <Link className={styles.link} to={isFlight ? paths.flight(order.id) : paths.reservation(order.id)}>Order
        Details</Link>
    </div>
  </div>;
};
