import { getData } from '@helper/LocalStorage';
import { createAsyncThunk } from '@reduxjs/toolkit';

interface DataBalance {
    data: Data; 
    message: string;
    status: 0;
}
interface Data{
    balance: number
}

// Fetch data from API
export const fetchDataBalance = createAsyncThunk(
    'data/fetchData',
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
            const dataResponse:DataBalance = await response.json();
            return dataResponse.data;
        } catch (error) {
            return rejectWithValue('Failed to fetch data');
        }
    }
);
