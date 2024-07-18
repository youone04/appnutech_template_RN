import { _storeData } from '@helper/LocalStorage';
import { createAsyncThunk } from '@reduxjs/toolkit';

interface DataLogin {
  email: string;
  password: string;
  url: string;
}

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
}

const initialState: DataState = {
  loading: false,
  error: null,
};

export const postData = createAsyncThunk(
  'data/postData',
  async ({ email, password, url }: DataLogin, { rejectWithValue }) => {
    try {
      const response = await fetch(`https://take-home-test-api.nutech-integrasi.app/${url}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Failed to post data');
      }
      const data: any = await response.json();
      await _storeData(data.data.token);
      // console.log(data.data.token)
      return data;
    } catch (error) {
      return rejectWithValue('Failed to post data');
    }
  }
);