import { Link } from 'react-router-dom';
import { format, parseISO } from 'date-fns';

import styles from './order.module.scss';
import hotel from '../../assets/images/hotel.svg';

import { CommonOrder, OrderTypes } from '../../models/IOrder';
import { paths } from '../../shared/config/routes/routes';

interface IProps {
  order: CommonOrder;
}

export const Order = ({ order }: IProps) => {
  const isFlight = order.type === OrderTypes.Flight;

  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <img src={isFlight ? order.outbound.company.logo : hotel} alt={''} />
      </div>
      <div className={styles.info}>
        <div className={styles.title}>
          {isFlight ? `${order.outbound.origin.city} - ${order.outbound.destination.city}` : order.hotel_name}
        </div>
        <div className={styles.meta}>
          {isFlight ? (
            <div>
              {format(parseISO(order.outbound.departure_date), 'dd')} -{' '}
              {format(parseISO(order.return.arrival_date), 'dd MMM')}
            </div>
          ) : (
            <div>
              {format(parseISO(order.check_in_date), 'dd')} - {format(parseISO(order.check_out_date), 'dd MMM')}
            </div>
          )}

          <div>{isFlight ? order.passengers?.join(', ') : order.guests.join(', ')}</div>
          <div>
            {isFlight ? `Bookref: ${order.booking_reference}` : `Confirmation number: ${order.confirmation_number}`}
          </div>
        </div>
      </div>
      <div>
        <div className={styles.price}>${order.total_price}</div>
        <Link className={styles.link} to={isFlight ? paths.trip(order.id) : paths.reservation(order.id)}>
          Order Details
        </Link>
      </div>
    </div>
  );
};
