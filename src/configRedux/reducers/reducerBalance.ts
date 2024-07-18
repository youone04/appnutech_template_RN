
import { fetchDataBalance } from '@configRedux/actions/actionGets/fetchDataBalance';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
    DataTransaction,

} from "config/Type/type";


  const initialState: DataTransaction = {
    loading: false,
    error: null,
    token: null,
    balance: 0
  };

const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
      // Handle fetch data actions
      .addCase(fetchDataBalance.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDataBalance.fulfilled, (state, action: PayloadAction<DataTransaction>) => {
        state.balance = action.payload.balance;
        state.loading = false;

      })
      .addCase(fetchDataBalance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
    },
  });
  
  export default dataSlice.reducer;