
import { fetchDataService } from '@configRedux/actions/actionGets/fetchService';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {ResponseService} from "config/Type/type"

interface DataStateService{
  loading: boolean;
  error: any;
  services: any
} 
  
  const initialState: DataStateService = {
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
      .addCase(fetchDataService.fulfilled, (state, action: PayloadAction<ResponseService>) => {
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