import { useParams } from 'react-router-dom';

import styles from './trip.module.scss';

import { PageHeader } from '../../components/common/page-header/PageHeader';
import { People } from '../../components/common/people/People';
import { Flight } from '../../components/flight/Flight';
import { useGetOrderQuery } from '../../redux';
import { Loader } from '../../components/common/loader/Loader';
import { CommonOrder, OrderTypes } from '../../models/IOrder';

export const Trip = () => {
  let { id } = useParams<{ id: string }>();
  const { data, isLoading } = useGetOrderQuery(id || '');
  const trip = data as CommonOrder<OrderTypes.Flight>;

  return (
    <div className="container">
      <PageHeader message={'Success, have a nice flight!'} email={'testamike@gmail.com'} />
      {isLoading ? <Loader /> : (
        <>
          <div className="row mb-4">
            <div className="col-6">
              <div className="label">Booking reference</div>
              <div className={styles.ref}>{trip.booking_reference}</div>
            </div>
            <div className="col-3">
              <div className="label">Order amount</div>
              <div className={styles.amount}>${trip.total_price}</div>
            </div>
          </div>
          <div className="label mb-0">Booked flights</div>
          <Flight flight={trip.outbound} className="mb-3" />
          <Flight flight={trip.return} className="mb-4" />
          <div className="label">Passengers</div>
          <People peoples={trip.passengers} />
        </>
      )}
    </div>
  );
};
