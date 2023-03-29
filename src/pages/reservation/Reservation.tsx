import { Suspense } from 'react';
import { Await, useLoaderData } from 'react-router-dom';
import { format, parseISO } from 'date-fns';

import styles from './reservation.module.scss';
import map from '../../assets/images/map.png';
import { ReactComponent as NextIcon } from '../../assets/images/ic_next_24.svg';

import { CommonOrder, OrderTypes } from '../../models/IOrder';
import { PageHeader } from '../../components/common/page-header/PageHeader';
import { People } from '../../components/common/people/People';
import { Block } from '../../components/common/block/Block';

export const Reservation = () => {
  const { order: reservation } = useLoaderData() as { order: CommonOrder<OrderTypes.Hotel> };

  return (
    <div className={'container'}>
      <div className={'row'}>
        <div className={'col-6'}>
          <PageHeader message={'Reservation is confirmed!'} email={'testamike@gmail.com'} />
          <Suspense fallback={<div className="text-center">Loading...</div>}>
            <Await resolve={reservation}>
              {(resolvedReservation) => (
                <div className={styles.info}>
                  <div className="row">
                    <Block title="Confirmation number" className="col">
                      <div className={styles.number}>{resolvedReservation.confirmation_number}</div>
                    </Block>
                    <Block title="Pin" className="col">
                      <div className={styles.number}>1612</div>
                    </Block>
                  </div>
                  <div>
                    <div className={styles.title}>{resolvedReservation.hotel_name}</div>
                    <div className={styles.description}>{resolvedReservation.room_description}</div>
                  </div>
                  <div className="row">
                    <div className="col-6 d-flex align-items-center">
                      <div className={'flex-grow-1'}>
                        <div className={styles.date}>
                          {format(parseISO(resolvedReservation.check_in_date), 'MMM dd, EEE')}
                        </div>
                        <div className={styles.time}>
                          Check-in from {format(parseISO(resolvedReservation.check_in_date), 'HH:mm')}
                        </div>
                      </div>
                      <NextIcon />
                    </div>
                    <div className="col-6">
                      <div className={styles.date}>
                        {format(parseISO(resolvedReservation.check_out_date), 'MMM dd, EEE')}
                      </div>
                      <div className={styles.time}>
                        Check-out until {format(parseISO(resolvedReservation.check_out_date), 'HH:mm')}
                      </div>
                    </div>
                  </div>
                  <Block title="Guests" children={<People peoples={resolvedReservation.guests} />} />
                  <Block title="Address" children={resolvedReservation.address} />
                  <Block title="Cancellation policy" children={resolvedReservation.cancellation_policy} />
                  <Block title="Order amount" children={resolvedReservation.total_price} />
                </div>
              )}
            </Await>
          </Suspense>
        </div>
        <div className="col-6">
          <div className={styles.map}>
            <img src={map} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};
