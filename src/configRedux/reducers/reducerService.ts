
import { fetchDataService } from '@configRedux/actions/actionGets/fetchService';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
  
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
    services: []
  };

const dataSlice = createSlice({
    name: 'service',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
      // Handle fetch data actions
      .addCase(fetchDataService.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDataService.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.services = action.payload.data;
      })
      .addCase(fetchDataService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
    },
  });
  
  export default dataSlice.reducer;