import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from '../api';
import { CommonOrder } from '../models/IOrder';

export const ordersApi = createApi({
  reducerPath: 'ordersApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (build) => ({
    getOrders: build.query<CommonOrder[], void>({
      query: () => 'orders'
    }),
    getOrder: build.query<CommonOrder, string>({
      query: (id: string) => `orders/${id}`
    })
  })
});

export const { useGetOrdersQuery, useGetOrderQuery } = ordersApi;
