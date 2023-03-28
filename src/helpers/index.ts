import {CommonOrder, OrderTypes} from '../models/IOrder';
import {compareAsc, parseISO} from 'date-fns';

export const hideEmail = (email: string) => {
  const [username, domain] = email.split('@');
  const hiddenUsername = `${username[0]}${'*'.repeat(3)}${username.slice(-1)}`;
  return `${hiddenUsername}@${domain}`;
};

export const compareOrderDates = (order: CommonOrder) => {
  const date = order.type === OrderTypes.Flight ? parseISO(order.outbound.departure_date) : parseISO(order.check_in_date);
  return compareAsc(date, new Date()) >= 0;
};
