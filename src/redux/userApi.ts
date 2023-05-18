import { createApi } from '@reduxjs/toolkit/query/react';
import { IUser } from '../api/types';
import { baseQueryWithReAuth } from './authApi';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: baseQueryWithReAuth,
  tagTypes: ['User'],
  endpoints: (build) => ({
    getUsers: build.query<IUser[], void>({
      query() {
        return {
          url: 'users',
          credentials: 'include'
        };
      },
      transformResponse: (result: IUser[]) => {
        return result;
      }
    })
  })
});

export const { useGetUsersQuery } = userApi;
