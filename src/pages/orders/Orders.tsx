import { MouseEvent, useMemo, useState } from 'react';

import classNames from 'classnames';
import styles from './orders.module.scss';

import { compareOrderDates } from '../../helpers';
import { OrderTypes } from '../../models/IOrder';
import { Search } from '../../components/common/search/Search';
import { Order } from '../../components/order/Order';
import { useAppDispatch, useAppSelector, useGetOrdersQuery, userApi } from '../../redux';
import { Loader } from '../../components/common/loader/Loader';

export const Orders = () => {
  const { data: orders = [], isLoading } = useGetOrdersQuery();
  const [filter, setFilter] = useState('upcoming');
  const [searchValue, setSearchValue] = useState<string>('');
  const dispatch = useAppDispatch();

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const isUpcoming = compareOrderDates(order);
      return filter === 'upcoming' ? isUpcoming : !isUpcoming;
    });
  }, [filter, orders]);

  const ordersSearched = useMemo(() => {
    return filteredOrders.filter((order) => {
      const people = order.type === OrderTypes.Flight ? order.passengers : order.guests;
      return people.join().toLowerCase().includes(searchValue.toLowerCase());
    });
  }, [filteredOrders, searchValue]);

  const onChangeFilter = (e: MouseEvent<HTMLElement>) => {
    const id = e.currentTarget.id;
    setFilter(id);
  };

  const selectUsers = useMemo(() => userApi.endpoints.getUsers.select(), []);
  const { data, isSuccess } = useAppSelector(selectUsers);

  const getUsers = () => {
    const result = dispatch(userApi.endpoints.getUsers.initiate());
    result.refetch();
    // Return the `unsubscribe` callback to be called in the cleanup step
    return result.unsubscribe;
  };

  if (isSuccess) {
    console.log('%c⇒ data', 'color: #89DDF7', data);
  }

  return (
    <div className="container">
      <div className="d-flex align-items-center mb-3">
        <div className={styles.title}>Orders</div>
        <Search value={searchValue} onChange={setSearchValue} />
      </div>
      <div className={styles.filters}>
        <div
          className={classNames({ [styles.active]: filter === 'upcoming' })}
          id={'upcoming'}
          onClick={onChangeFilter}
        >
          Upcoming
        </div>
        <div className={classNames({ [styles.active]: filter === 'past' })} id={'past'} onClick={onChangeFilter}>
          Past
        </div>
        <div className={classNames({ [styles.active]: filter === 'users' })} id={'users'} onClick={getUsers}>
          Users
        </div>
      </div>
      {isLoading ? <Loader /> : (
        <div className={styles.orders}>
          {ordersSearched.map((order) => (
            <Order key={order.id} order={order} />
          ))}
        </div>)}
    </div>
  );
};

