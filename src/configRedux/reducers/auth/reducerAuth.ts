// counterSlice.ts
import { _removeData } from '@helper/LocalStorage';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  login: boolean;
}

const initialState: AuthState = {
  login: false,
};

const authSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    login: (state) => {
      state.login = true;
    },
    logout: (state) => {
      _removeData();
      state.login = false;
    },
    cekAuth: (state, action: PayloadAction<boolean>) => {
      state.login = action.payload
    },
  },
});

export const { login, logout, cekAuth } = authSlice.actions;
export default authSlice.reducer;
