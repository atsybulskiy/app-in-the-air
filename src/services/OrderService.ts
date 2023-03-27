import {AxiosResponse} from 'axios';

import $api from '../api';
import {Order} from '../models/IOrder';

export default class OrderService {
  static fetchOrders(): Promise<AxiosResponse<Order[]>> {
    return $api.get<Order[]>('/orders');
  }

  static fetchOrder<T>(id: string): Promise<AxiosResponse<T>> {
    return $api.get<T>(`/orders/${id}`);
  }
}
