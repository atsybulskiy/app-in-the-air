import type { BaseQueryFn, FetchArgs, FetchBaseQueryError, FetchBaseQueryMeta } from '@reduxjs/toolkit/query/react';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { API_AUTH_URL } from '../api';
import { AuthResponse, LoginInput, RegisterInput } from '../api/types';
import { logout, setAuth, setToken, setUser } from './features/authSlice';
import { RootState } from './store';

export const baseQuery = fetchBaseQuery({
  baseUrl: API_AUTH_URL,
  prepareHeaders: (headers, { getState }) => {
    const { authState: { token } } = getState() as RootState;
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  }
});

export const baseQueryWithReAuth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, {}, FetchBaseQueryMeta> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    const refreshResult = await baseQuery({ url: 'refresh', credentials: 'include' }, api, extraOptions);
    console.log('%c⇒ refreshResult 401', 'color: #89DDF7', refreshResult.data);
    const data = refreshResult.data as AuthResponse;
    if (data) {
      api.dispatch(setAuth(true));
      api.dispatch(setToken(data.accessToken));
      api.dispatch(setUser(data.user));
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logout());
    }
  }
  return result;
};

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: baseQueryWithReAuth,
  endpoints: (builder) => ({
    registration: builder.mutation<AuthResponse, RegisterInput>({
      query(data) {
        return {
          url: 'registration',
          method: 'POST',
          body: data
        };
      },
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setToken(data.accessToken));
          dispatch(setAuth(true));
          dispatch(setUser(data.user));
        } catch (error) {
        }
      }
    }),
    login: builder.mutation<AuthResponse, LoginInput>({
      query(data) {
        return {
          url: 'login',
          method: 'POST',
          body: data,
          credentials: 'include'
        };
      },
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setToken(data.accessToken));
          dispatch(setAuth(true));
          dispatch(setUser(data.user));
        } catch (error) {
        }
      }
    }),
    logout: builder.mutation<void, void>({
      query() {
        return {
          url: 'logout',
          method: 'POST',
          credentials: 'include'
        };
      },
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(logout);
        } catch (error) {
        }
      }
    }),
    checkAuth: builder.query<AuthResponse, null>({
      query() {
        return {
          url: 'refresh',
          credentials: 'include'
        };
      },
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setToken(data.accessToken));
          dispatch(setAuth(true));
          dispatch(setUser(data.user));
        } catch (e) {
        }
      }
    })
  })
});

export const { useLoginMutation, useRegistrationMutation, useLogoutMutation } = authApi;
