import { _storeData } from '@helper/LocalStorage';
import { createAsyncThunk } from '@reduxjs/toolkit';

interface DataLogin {
  email: string;
  password: string;
  url: string;
}

interface DataResponseRegistrasi {
  data: Token;
  message: string;
  status: number
}

interface Token{
  token: string
}
export const postDataRegistrasi = createAsyncThunk(
  'registrasi/postData',
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
      const data: DataResponseRegistrasi = await response.json();
     
      return data;
    } catch (error) {
      return rejectWithValue('Failed to post data');
    }
  }
);