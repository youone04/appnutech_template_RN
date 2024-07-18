
import { fetchDataBanner } from '@configRedux/actions/actionGets/fetchDataBanner';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
    ResponseBanner
} from "config/Type/type";

interface DataStateBanner {
    loading: boolean;
    error: any;
    banner: any
}

const initialState: DataStateBanner = {
    loading: false,
    error: null,
    banner: []
};

const dataSlice = createSlice({
    name: 'banner',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Handle fetch data actions
            .addCase(fetchDataBanner.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchDataBanner.fulfilled, (state, action: PayloadAction<ResponseBanner>) => {
                state.banner = action.payload.data;
                state.loading = false;

            })
            .addCase(fetchDataBanner.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
    },
});

export default dataSlice.reducer;