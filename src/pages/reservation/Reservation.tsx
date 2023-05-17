import { useParams } from 'react-router-dom';
import { format, parseISO } from 'date-fns';

import styles from './reservation.module.scss';
import { ReactComponent as NextIcon } from '../../assets/images/ic_next_24.svg';

import { CommonOrder, OrderTypes } from '../../models/IOrder';
import { PageHeader } from '../../components/common/page-header/PageHeader';
import { People } from '../../components/common/people/People';
import { Block } from '../../components/common/block/Block';
import { Wrapper } from '@googlemaps/react-wrapper';
import { GoogleMap } from '../../components/common/google-map/GoogleMap';
import { useGetOrderQuery } from '../../redux';
import { Loader } from '../../components/common/loader/Loader';

export const Reservation = () => {
  let { id } = useParams<{ id: string }>();
  const { data, isLoading } = useGetOrderQuery(id || '');
  const reservation = data as CommonOrder<OrderTypes.Hotel>;

  return (
    <div className="container">
      <div className="row">
        <div className="col-6">
          <PageHeader message={'Reservation is confirmed!'} email={'testamike@gmail.com'} />
          {isLoading ? <Loader /> : (
            <div className={styles.info}>
              <div className="row">
                <Block title="Confirmation number" className="col">
                  <div className={styles.number}>{reservation.confirmation_number}</div>
                </Block>
                <Block title="Pin" className="col">
                  <div className={styles.number}>1612</div>
                </Block>
              </div>
              <div>
                <div className={styles.title}>{reservation.hotel_name}</div>
                <div className={styles.description}>{reservation.room_description}</div>
              </div>
              <div className="row">
                <div className="col-6 d-flex align-items-center">
                  <div className="flex-grow-1">
                    <div className={styles.date}>
                      {format(parseISO(reservation.check_in_date), 'MMM dd, EEE')}
                    </div>
                    <div className={styles.time}>
                      Check-in from {format(parseISO(reservation.check_in_date), 'HH:mm')}
                    </div>
                  </div>
                  <NextIcon />
                </div>
                <div className="col-6">
                  <div className={styles.date}>
                    {format(parseISO(reservation.check_out_date), 'MMM dd, EEE')}
                  </div>
                  <div className={styles.time}>
                    Check-out until {format(parseISO(reservation.check_out_date), 'HH:mm')}
                  </div>
                </div>
              </div>
              <Block title="Guests" children={<People peoples={reservation.guests} />} />
              <Block title="Address" children={reservation.address} />
              <Block title="Cancellation policy" children={reservation.cancellation_policy} />
              <Block title="Order amount" children={reservation.total_price} />
            </div>
          )}
        </div>
        <div className="col-6">
          <div className={styles.map}>
            <Wrapper apiKey={'AIzaSyAuvRAnZ24zcRpZON5F3dVwpMvwU2eAZ_w'}>
              <GoogleMap center={{ lng: 38.313877007705145, lat: -0.5202355099478018 }} zoom={5} />
            </Wrapper>
          </div>
        </div>
      </div>
    </div>
  );
};
