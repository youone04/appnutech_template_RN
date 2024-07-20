import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchData } from './actions';

interface Item {
  id: number;
  title: string;
}

interface DataState {
  [key: string]: {
    items: any;
    loading: boolean;
    error: string | null;
  };
}

const initialState: DataState = {};

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state, action) => {
       
        const {idredux } = action.meta.arg;
        state[idredux] = {
          items: [],
          loading: true,
          error: null,
        };
      })
      .addCase(fetchData.fulfilled, (state, action: PayloadAction<{idredux:string, endpoint: string; data: Item[] }>) => {
        const {data,idredux } = action.payload;
        state[idredux] = {
          items: data,
          loading: false,
          error: null,
        };
      })
      .addCase(fetchData.rejected, (state, action) => {
        const {idredux } = action.meta.arg;
        state[idredux] = {
          items: [],
          loading: false,
          error: action.payload as string,
        };
      });
  },
});

export default dataSlice.reducer;
