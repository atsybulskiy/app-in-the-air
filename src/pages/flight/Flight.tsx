import {useParams} from 'react-router-dom';
import {format, parseISO} from 'date-fns';

import styles from './flight.module.scss';
import {ReactComponent as NextIcon} from '../../assets/images/ic_next_24.svg';

import {useOrder} from '../../hooks/useOrder';
import {Order, OrderTypes} from '../../models/IOrder';
import {PageHeader} from '../../components/common/page-header/PageHeader';
import {People} from '../../components/common/people/People';

export const Flight = () => {
  const {id} = useParams<{ id: string }>();
  const {order: flight, isLoading} = useOrder<Order<OrderTypes.Flight>>(id);

  if (isLoading) {
    return <div className={'text-center'}>Loading...</div>;
  }

  return <div className={'container'}>
    <PageHeader message={'Success, have a nice flight!'}/>
    <div className={'row mb-4'}>
      <div className={'col-6'}>
        <div className={'label'}>booking reference</div>
        <div className={styles.ref}>{flight?.booking_reference}</div>
      </div>
      <div className={'col-3'}>
        <div className={'label'}>Order amount</div>
        <div className={styles.amount}>${flight?.total_price}</div>
      </div>
    </div>
    <div className={'label mb-0'}>Booked flights</div>
    <div className={'row align-items-center mb-3'}>
      <div className={'col-3 d-flex align-items-center'}>
        <div className={'flex-grow-1'}>
          <div
            className={styles.date}>{flight && format(parseISO(flight.outbound_departure_date), 'MMM dd, HH:MM')}</div>
          <div className={styles.airport}>{flight?.outbound_origin}</div>
        </div>
        <NextIcon/>
      </div>
      <div className={'col-3'}>
        <div className={styles.date}>{flight && format(parseISO(flight.outbound_arrival_date), 'MMM dd, HH:MM')}</div>
        <div className={styles.airport}>{flight?.outbound_destination}</div>
      </div>
      <div className={'col-3 border-start py-2'}>
        <img src={flight?.flight_company_logo} className={styles.logo} alt=""/>
        <div className={styles.number}>{flight?.outbound_flight_number}</div>
        <div className={styles.company}>{flight?.flight_company}</div>
      </div>
    </div>
    <div className={'row align-items-center mb-4'}>
      <div className={'col-3 d-flex align-items-center'}>
        <div className={'flex-grow-1'}>
          <div className={styles.date}>{flight && format(parseISO(flight.return_departure_date), 'MMM dd, HH:MM')}</div>
          <div className={styles.airport}>{flight?.return_origin}</div>
        </div>
        <NextIcon/>
      </div>
      <div className={'col-3'}>
        <div className={styles.date}>{flight && format(parseISO(flight.return_arrival_date), 'MMM dd, HH:MM')}</div>
        <div className={styles.airport}>{flight?.return_destination}</div>
      </div>
      <div className={'col-3 border-start py-2'}>
        <img src={flight?.flight_company_logo} className={styles.logo} alt=""/>
        <div className={styles.number}>{flight?.return_flight_number}</div>
        <div className={styles.company}>{flight?.flight_company}</div>
      </div>
    </div>
    <div className={'label'}>Passengers</div>
    <People peoples={flight?.passengers}/>
  </div>;
};
