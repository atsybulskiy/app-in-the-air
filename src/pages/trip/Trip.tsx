import {useParams} from 'react-router-dom';

import styles from './trip.module.scss';

import {useOrder} from '../../hooks/useOrder';
import {CommonOrder, OrderTypes} from '../../models/IOrder';
import {PageHeader} from '../../components/common/page-header/PageHeader';
import {People} from '../../components/common/people/People';
import {Flight} from '../../components/flight/Flight';

export const Trip = () => {
  const {id} = useParams<{ id: string }>();
  const {order: flight, isLoading} = useOrder<CommonOrder<OrderTypes.Flight>>(id);

  return <>
    {isLoading || !flight ? <div className="text-center">Loading...</div> : (
      <div className="container">
        <PageHeader message={'Success, have a nice flight!'} email={'testamike@gmail.com'}/>
        <div className="row mb-4">
          <div className="col-6">
            <div className="label">Booking reference</div>
            <div className={styles.ref}>{flight?.booking_reference}</div>
          </div>
          <div className="col-3">
            <div className="label">Order amount</div>
            <div className={styles.amount}>${flight?.total_price}</div>
          </div>
        </div>
        <div className="label mb-0">Booked flights</div>
        <Flight flight={flight.outbound} className="mb-3"/>
        <Flight flight={flight.return} className="mb-4"/>
        <div className="label">Passengers</div>
        <People peoples={flight?.passengers}/>
      </div>)
    }
  </>;
};
