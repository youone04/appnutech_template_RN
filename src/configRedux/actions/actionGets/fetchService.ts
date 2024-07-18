import { getData } from '@helper/LocalStorage';
import { createAsyncThunk } from '@reduxjs/toolkit';
// Fetch data from API
import {ResponseService} from "config/Type/type"

export const fetchDataService = createAsyncThunk(
    'service/fetchData',
    async (url:string, { rejectWithValue }) => {
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
            const data: ResponseService = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue('Failed to fetch data');
        }
    }
);
