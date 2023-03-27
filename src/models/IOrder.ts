import {IFlight} from './IFlight';
import {IHotel} from './IHotel';

export type OrderType = (
  | IFlight
  | IHotel
  ) & {
  id: string;
  total_price: number;
  title: string;
};

export enum OrderTypes {
  Flight = 'flight',
  Hotel = 'hotel'
}

export type ExtractParameters<A, T> = A extends { type: T } ? A : never;

export type Order<T = OrderTypes> = ExtractParameters<OrderType, T>;
