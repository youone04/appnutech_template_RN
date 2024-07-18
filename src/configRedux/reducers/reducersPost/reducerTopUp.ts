
import { postDataTopUp } from '@configRedux/actions/actionPosts/postTopUp';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TopUpResponse {
  data: Data;
  message: string;
  status: number
}
interface Data{
    balance: number
}

interface DataState {
  loading: boolean;
  error: string | null;
  balance: number | null;
}

const initialState: DataState = {
  loading: false,
  error: null,
  balance: null,
};

const dataSlice = createSlice({
  name: 'topup',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(postDataTopUp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postDataTopUp.fulfilled, (state, action: PayloadAction<TopUpResponse>) => {
        state.balance = action.payload.data.balance;
        state.loading = false;

      })
      .addCase(postDataTopUp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default dataSlice.reducer;