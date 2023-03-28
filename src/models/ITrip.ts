import {OrderTypes} from './IOrder';
import {IFlight} from './IFlight';

export interface ITrip {
  booking_reference: string;
  outbound: IFlight;
  passengers: string[];
  return: IFlight;
  type: OrderTypes.Flight;
}
