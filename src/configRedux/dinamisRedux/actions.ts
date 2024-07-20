import { _removeData, _storeData, getData } from '@helper/LocalStorage';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {FieldProfile , DataLogin, DataTopUp} from "config/Type/type"

interface FetchDataParams {
  endpoint: string;
  method: 'GET' | 'POST' | 'PUT';
  body?: FieldProfile | DataLogin | DataTopUp;
  idredux: string;
  logOut?: any
  formData?: any
}

export const fetchData = createAsyncThunk(
  'data/fetchData',
  async ({idredux, endpoint, method, body, formData }: FetchDataParams, { rejectWithValue }) => {
    try {
      const response = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: body ? JSON.stringify(body) : formData ? formData : undefined,
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
  async ({ idredux, endpoint, method, body, formData, logOut }: FetchDataParams, { rejectWithValue }) => {
    try {
      const token = await getData();
      const response = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': formData ? 'multipart/form-data' :'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: body ? JSON.stringify(body) : formData ? formData: undefined,
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