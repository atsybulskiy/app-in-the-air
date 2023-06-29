import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { StateSchema } from './StateSchema';
import { authReducer } from '../../../../redux/features/authSlice';
import storage from 'redux-persist/lib/storage';
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from 'redux-persist';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { authApi, ordersApi, store, userApi } from '../../../../redux';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['authState']
};

export function createReduxStore(initialState?: StateSchema) {
  // const rootReducer: ReducersMapObject<StateSchema> = {
  //     ...asyncReducers,
  //     auth: authReducer
  // };

  const rootReducer = combineReducers({
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [ordersApi.reducerPath]: ordersApi.reducer,
    authState: authReducer
  });

  const persistedReducer = persistReducer(persistConfig, rootReducer);

  const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
      serializableCheck: { ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER] }
    }).concat([
      authApi.middleware,
      userApi.middleware,
      ordersApi.middleware
    ]),
    devTools: true
  });

  return store;
}

export const persistor = persistStore(createReduxStore());

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch'];
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

