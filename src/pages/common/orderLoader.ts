import { defer, LoaderFunction } from 'react-router-dom';
import OrderService from '../../services/OrderService';

export const getOrder = async (id?: string) => {
  if (id) {
    const response = await OrderService.fetchOrder(id);
    return response.data;
  }
  return null;
};

export const orderLoader: LoaderFunction = async ({ params }) => {
  const { id } = params;
  return defer({
    order: getOrder(id)
  });
};
