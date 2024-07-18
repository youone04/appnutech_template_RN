import { getData } from '@helper/LocalStorage';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
    ResponseBanner

} from "config/Type/type";

// Fetch data from API
export const fetchDataBanner = createAsyncThunk(
    'banner/fetchData',
    async (url: string, { rejectWithValue }) => {
        try {
            const token = await getData();
            const response = await fetch(`https://take-home-test-api.nutech-integrasi.app/${url}`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`
                },
            });
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const dataResponse: ResponseBanner = await response.json();
            return dataResponse;
        } catch (error) {
            return rejectWithValue('Failed to fetch data');
        }
    }
);
