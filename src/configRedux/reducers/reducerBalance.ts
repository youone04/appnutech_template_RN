
import { fetchDataBalance } from '@configRedux/actions/actionGets/fetchDataBalance';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
    DataBanner, DataService, DataTransaction,
    DataHistoryTransaction, DataRecord,
    DataProfile,
    DataModalVisible
} from "config/Type/type";

  
  interface LoginResponse {
    token: string;
    user: {
      id: number;
      email: string;
    };
  }
  
  interface DataState {
    loading: boolean;
    error: string | null;
    token: string | null;
    login: boolean
  }
  
  const initialState: any = {
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
      .addCase(fetchDataBalance.fulfilled, (state, action: PayloadAction<any>) => {
        console.log("okeyyy")
        state.loading = false;
        state.balance = action.payload;
      })
      .addCase(fetchDataBalance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
    },
  });
  
  export default dataSlice.reducer;