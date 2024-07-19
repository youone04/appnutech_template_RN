// counterSlice.ts
import { _removeData } from '@helper/LocalStorage';
import { createSlice} from '@reduxjs/toolkit';

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
    }
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
