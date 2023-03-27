import {useMemo, useState} from 'react';
import {compareAsc, parseISO} from 'date-fns';

import styles from './orders.module.scss';

import {useOrders} from '../../hooks/useOrders';
import {OrderTypes} from '../../models/IOrder';
import {Search} from '../../components/search/Search';
import {OrderItem} from '../../components/order-item/OrderItem';

export const Orders = () => {
  const {orders, isLoading} = useOrders();
  const [filter, setFilter] = useState('upcoming');
  const [searchValue, setSearchValue] = useState<string>('');

  const filteredOrders = useMemo(() => {
    return filter === 'upcoming'
      ? orders.filter(order => {
        return compareAsc(order.type === OrderTypes.Flight
            ? parseISO(order.outbound_departure_date)
            : parseISO(order.check_in_date),
          new Date()
        ) >= 0;
      })
      : orders.filter(order => compareAsc(order.type === OrderTypes.Flight ? parseISO(order.outbound_departure_date) : parseISO(order.check_in_date), new Date()) < 0);
  }, [filter, orders]);

  const ordersSearched = useMemo(() => {
    return filteredOrders.filter(order => {
      const people = order.type === OrderTypes.Flight ? order.passengers : order.guests;
      return people.join().toLowerCase().includes(searchValue.toLowerCase());
    });
  }, [filteredOrders, searchValue]);

  return <div className={'container'}>
    <div className={'d-flex align-items-center mb-3'}>
      <div className={styles.title}>Orders</div>
      <Search value={searchValue} onChange={setSearchValue}/>
    </div>
    <div className={styles.filters}>
      <div className={filter === 'upcoming' ? styles.active : ''} onClick={() => setFilter('upcoming')}>Upcoming</div>
      <div className={filter === 'past' ? styles.active : ''} onClick={() => setFilter('past')}>Past</div>
    </div>
    {isLoading
      ? <div>Loading...</div>
      : <div className={styles.orders}>
        {ordersSearched.map(order => <OrderItem key={order.id} order={order}/>)}
      </div>}
  </div>;
};
