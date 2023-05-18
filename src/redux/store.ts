import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { ordersApi } from './ordersApi';
import { authApi } from './authApi';
import userReducer from './features/userSlice';
import { userApi } from './userApi';

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [ordersApi.reducerPath]: ordersApi.reducer,
    userState: userReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({}).concat([
    authApi.middleware,
    userApi.middleware,
    ordersApi.middleware
  ])
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
