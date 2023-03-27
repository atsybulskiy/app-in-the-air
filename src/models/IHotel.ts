import {OrderTypes} from './IOrder';

export interface IHotel {
  type: OrderTypes.Hotel;
  hotel_name: string;
  address: string;
  city: string;
  check_in_date: string;
  check_out_date: string;
  room_type: string;
  room_description: string;
  guests: string[];
  cancellation_policy: string;
  confirmation_number: string;
}
