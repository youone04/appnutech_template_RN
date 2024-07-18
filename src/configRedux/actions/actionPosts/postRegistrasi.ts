import { createAsyncThunk } from '@reduxjs/toolkit';
// import { increment } from '../../reducers/index';
import axios from 'axios';


export const incrementAsync = createAsyncThunk(
  'counter/incrementAsync',
  async (_, { dispatch }) => {
    setTimeout(() => {
      // dispatch(increment());
    }, 1000);
  }
);


interface Item {
  id: number;
  title: string;
}

export const fetchData = createAsyncThunk(
  'data/fetchData',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get<Item[]>('https://jsonplaceholder.typicode.com/todos');
      return response.data;
    } catch (error) {
      return rejectWithValue('Failed to fetch data');
    }
  }
);
