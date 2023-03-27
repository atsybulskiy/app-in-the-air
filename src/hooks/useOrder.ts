import {useCallback, useEffect, useState} from 'react';
import OrderService from '../services/OrderService';

export const useOrder = <T>(id?: string): { order: T | undefined, isLoading: boolean } => {
  const [order, setOrder] = useState<T>();
  const [isLoading, setIsLoading] = useState(false);

  const getOrder = useCallback(async (id: string) => {
    try {
      setIsLoading(true);
      const response = await OrderService.fetchOrder<T>(id);
      setOrder(response.data);
    } catch (e) {
      console.log('%c⇒ getOrder', 'color: #89DDF7', e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (id) {
      getOrder(id).catch(e => console.log('%c⇒ e', 'color: #FF5370', e));
    }

  }, [getOrder, id]);

  return {order, isLoading};
};
