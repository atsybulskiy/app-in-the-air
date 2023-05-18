import { IUser } from '../../api/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IUserState {
  user: IUser | null;
  isAuth: boolean;
}

const initialState: IUserState = {
  user: null,
  isAuth: false
};

export const userSlice = createSlice({
  initialState,
  name: 'userSlice',
  reducers: {
    logout: () => initialState,
    setUser: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
    },
    setAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload;
    }
  }
});

export default userSlice.reducer;

export const { setUser, setAuth, logout } = userSlice.actions;
