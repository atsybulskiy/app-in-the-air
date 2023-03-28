export interface IFlight {
  flight_number: string;
  company: IFlightCompany;
  origin: IAirport;
  departure_date: string;
  destination: IAirport
  arrival_date: string;
}

interface IAirport {
  city: string;
  name: string;
  code: string;
}

interface IFlightCompany {
  name: string;
  logo: string;
}
