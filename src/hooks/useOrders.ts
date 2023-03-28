import {useCallback, useEffect, useState} from 'react';
import {CommonOrder} from '../models/IOrder';
import OrderService from '../services/OrderService';

export const useOrders = () => {
  const [orders, setOrders] = useState<CommonOrder[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const getOrders = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await OrderService.fetchOrders();
      setOrders(response.data);
    } catch (e) {
      console.log('%c⇒ getOrders', 'color: #89DDF7', e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    getOrders()
      .catch(e => console.log('%c⇒ e', 'color: #FF5370', e));
  }, [getOrders]);

  return {orders, isLoading};
};
