import {ITrip} from './ITrip';
import {IHotel} from './IHotel';

export type OrderType = (
  | ITrip
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

export type CommonOrder<T = OrderTypes> = ExtractParameters<OrderType, T>;
