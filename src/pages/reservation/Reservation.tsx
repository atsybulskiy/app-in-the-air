import {useParams} from 'react-router-dom';
import {format, parseISO} from 'date-fns';

import styles from './reservation.module.scss';
import map from '../../assets/images/map.png';
import {ReactComponent as NextIcon} from '../../assets/images/ic_next_24.svg';

import {useOrder} from '../../hooks/useOrder';
import {CommonOrder, OrderTypes} from '../../models/IOrder';
import {PageHeader} from '../../components/common/page-header/PageHeader';
import {People} from '../../components/common/people/People';

export const Reservation = () => {
  const {id} = useParams<{ id: string }>();
  const {order: reservation, isLoading} = useOrder<CommonOrder<OrderTypes.Hotel>>(id);

  if (isLoading) {
    return <div className={'text-center'}>Loading...</div>;
  }

  return <div className={'container'}>
    <div className={'row'}>
      <div className={'col-6'}>
        <PageHeader message={'Reservation is confirmed!'} email={'testamike@gmail.com'}/>
        <div className={styles.info}>
        <div className="row">
          <div className="col">
            <div className="label">Confirmation number</div>
            <div className={styles.number}>{reservation?.confirmation_number}</div>
          </div>
          <div className="col">
            <div className="label">Pin</div>
            <div className={styles.number}>1612</div>
          </div>
        </div>
        <div>
          <div className={styles.title}>{reservation?.hotel_name}</div>
          <div className={styles.description}>{reservation?.room_description}</div>
        </div>
        <div className="row">
          <div className="col-6 d-flex align-items-center">
            <div className={'flex-grow-1'}>
              <div
                className={styles.date}>{reservation && format(parseISO(reservation.check_in_date), 'MMM dd, EEE')}</div>
              <div className={styles.time}>Check-in
                from {reservation && format(parseISO(reservation.check_in_date), 'HH:mm')}</div>
            </div>
            <NextIcon/>
          </div>
          <div className="col-6">
            <div
              className={styles.date}>{reservation && format(parseISO(reservation.check_out_date), 'MMM dd, EEE')}</div>
            <div className={styles.time}>Check-out
              until {reservation && format(parseISO(reservation.check_out_date), 'HH:mm')}</div>
          </div>
        </div>
        <div>
          <div className={'label'}>Guests</div>
          <People peoples={reservation?.guests}/>
        </div>
        <div>
          <div className={'label'}>Address</div>
          {reservation?.address}
        </div>
        <div>
          <div className={'label'}>Cancellation policy</div>
          {reservation?.cancellation_policy}
        </div>
        <div>
          <div className={'label'}>Order amount</div>
          <div className={styles.amount}>${reservation?.total_price}</div>
        </div>
        </div>
      </div>
      <div className="col-6">
        <div className={styles.map}>
          <img src={map} alt=""/>
        </div>
      </div>
    </div>
  </div>;
};
