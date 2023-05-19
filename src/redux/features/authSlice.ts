import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../../api/types';

interface IAuthState {
  user: IUser | null;
  isAuth: boolean;
  token: string | null;
}

const initialState: IAuthState = {
  user: null,
  isAuth: false,
  token: null
};

export const authSlice = createSlice({
  initialState,
  name: 'authSlice',
  reducers: {
    logout: () => initialState,
    setUser: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
    },
    setAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload;
    },
    setToken: (state, action: PayloadAction<string | null>) => {
      state.token = action.payload;
    }
  }
});

export const authReducer = authSlice.reducer;

export const { setUser, setAuth, logout, setToken } = authSlice.actions;
