import {OrderTypes} from './IOrder';

export interface IFlight {
  type: OrderTypes.Flight;
  flight_company: string;
  flight_company_logo: string;
  outbound_flight_number: string;
  outbound_origin: string;
  outbound_destination: string;
  outbound_departure_date: string;
  outbound_arrival_date: string;
  return_flight_number: string;
  return_origin: string;
  return_destination: string;
  return_departure_date: string;
  return_arrival_date: string;
  passengers: string[];
  booking_reference: string;
}
