import {AxiosResponse} from 'axios';

import $api from '../api';
import {CommonOrder} from '../models/IOrder';

export default class OrderService {
  static fetchOrders(): Promise<AxiosResponse<CommonOrder[]>> {
    return $api.get<CommonOrder[]>('/orders');
  }

  static fetchOrder<T>(id: string): Promise<AxiosResponse<T>> {
    return $api.get<T>(`/orders/${id}`);
  }
}
