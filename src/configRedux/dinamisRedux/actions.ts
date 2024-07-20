import { _removeData, _storeData, getData } from '@helper/LocalStorage';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { Alert } from 'react-native';

interface Item {
  id: number;
  title: string;
}

interface DataLogin {
  email: string;
  password: string;
}

interface DataTopUp {
  top_up_amount: number;
}

interface FetchDataParams {
  endpoint: string;
  method: 'GET' | 'POST';
  body?: Item | DataLogin | DataTopUp;
  idredux: string;
  logOut?: any
}

export const fetchData = createAsyncThunk(
  'data/fetchData',
  async ({ idredux, endpoint, method, body }: FetchDataParams, { rejectWithValue }) => {
    try {
      const response = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: body ? JSON.stringify(body) : undefined,
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }
      const data = await response.json();
      if (idredux === 'loginPost') {
        await _storeData(data.data.token);
      }
      return { endpoint, data, idredux };
    } catch (error: any) {
      return rejectWithValue(error.message || "Terjadi kesalahan");
    }
  }
);

export const fetchDataPrivate = createAsyncThunk(
  'data/fetchData',
  async ({ idredux, endpoint, method, body, logOut }: FetchDataParams, { rejectWithValue }) => {
    try {
      const token = await getData();
      const response = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: body ? JSON.stringify(body) : undefined,
      });
      if (!response.ok) {
        const error = await response.json();
        if (error.status === 108) {
          _removeData()
          logOut()
        }
        throw new Error(error.message);
      }
      const data = await response.json();
      return { endpoint, data, idredux };
    } catch (error: any) {
      return rejectWithValue(error.message || "Terjadi kesalahan");
    }
  }
);