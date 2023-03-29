import { format, parseISO } from 'date-fns';

import classNames from 'classnames';
import styles from './flight.module.scss';
import { ReactComponent as NextIcon } from '../../assets/images/ic_next_24.svg';

import { IFlight } from '../../models/IFlight';

interface IProps {
  flight: IFlight;
  className?: string;
}

export const Flight = ({ flight, className }: IProps) => {
  return (
    <div className={classNames('row align-items-center', className)}>
      <div className={'col-3 d-flex align-items-center'}>
        <div className={'flex-grow-1'}>
          {format(parseISO(flight.departure_date), 'MMM dd, HH:MM')}
          <div className={styles.airport}>
            {flight.origin.name} ({flight.origin.code})
          </div>
        </div>
        <NextIcon />
      </div>
      <div className={'col-3'}>
        {format(parseISO(flight.arrival_date), 'MMM dd, HH:MM')}
        <div className={styles.airport}>
          {flight.destination.name} ({flight.destination.code})
        </div>
      </div>
      <div className={'col-3 border-start py-2'}>
        <img src={flight.company.logo} className={styles.logo} alt="" />
        <div className={styles.number}>{flight.flight_number}</div>
        <div className={styles.company}>{flight.company.name}</div>
      </div>
    </div>
  );
};
