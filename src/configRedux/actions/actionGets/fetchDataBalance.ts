import { getData } from '@helper/LocalStorage';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
    DataBanner, DataService, DataTransaction,
    DataHistoryTransaction, DataRecord,
    DataProfile,
    DataModalVisible
} from "config/Type/type";
type DataType = DataBanner | DataService | DataTransaction |
    DataHistoryTransaction | DataRecord | DataProfile | DataModalVisible;



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
            const dataResponse = await response.json();
            return dataResponse.data.balance;
        } catch (error) {
            return rejectWithValue('Failed to fetch data');
        }
    }
);
