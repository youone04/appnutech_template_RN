import { getData } from '@helper/LocalStorage';
import { createAsyncThunk } from '@reduxjs/toolkit';

interface DataTopUp {
    top_up_amount: number;
    url: string;
}
interface DataResponseTopUp {
    data: Data;
    message: string;
    status: number
}
interface Data {
    balance: number
}
export const postDataTopUp = createAsyncThunk(
    'topup/postData',
    async ({ top_up_amount, url }: DataTopUp, { rejectWithValue }) => {
        try {
            const token = await getData();
            const response = await fetch(`https://take-home-test-api.nutech-integrasi.app/${url}`, {
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`
                  },
                  method: 'POST',
                body: JSON.stringify({ top_up_amount }),
            });
            if (!response.ok) {
                throw new Error('Failed to post data');
            }
            const data: DataResponseTopUp = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue('Failed to post data');
        }
    }
);