
import { fetchDataProfile } from '@configRedux/actions/actionGets/fetchDataProfile';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
    ResponseProfile
} from "config/Type/type";

interface DataStateProfile {
    loading: boolean;
    error: any;
    profile: any
}

const initialState: DataStateProfile = {
    loading: false,
    error: null,
    profile: []
};

const dataSlice = createSlice({
    name: 'banner',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Handle fetch data actions
            .addCase(fetchDataProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchDataProfile.fulfilled, (state, action: PayloadAction<ResponseProfile>) => {
                state.profile = action.payload.data;
                state.loading = false;

            })
            .addCase(fetchDataProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
    },
});

export default dataSlice.reducer;