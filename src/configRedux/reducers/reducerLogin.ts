
import { postData } from '@configRedux/actions/actionPosts/postLogin';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LoginResponse {
  data: Token;
  message: string;
  status: number
}
interface Token{
  token: string
}

interface DataState {
  loading: boolean;
  error: string | null;
  token: string | null;
}

const initialState: DataState = {
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
      .addCase(postData.fulfilled, (state, action: PayloadAction<LoginResponse>) => {
        state.token = action.payload.data.token;
        state.loading = false;

      })
      .addCase(postData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default dataSlice.reducer;