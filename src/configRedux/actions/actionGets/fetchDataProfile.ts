import { getData } from '@helper/LocalStorage';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
    DataProfile
} from "config/Type/type";

interface DataState {
    status: number;
    message: string;
    data: DataProfile;
}

// Fetch data from API
export const fetchDataProfile = createAsyncThunk(
    'profile/fetchData',
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
            const dataResponse: DataState = await response.json();
            return dataResponse;
        } catch (error) {
            return rejectWithValue('Failed to fetch data');
        }
    }
);
