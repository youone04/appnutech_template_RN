
import { postData } from '@configRedux/actions/actionPosts/postLogin';
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
    token: null,
  };

const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(postData.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(postData.fulfilled, (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.token = action.payload.data.token;
        })
        .addCase(postData.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
        });
    },
  });
  
  export default dataSlice.reducer;