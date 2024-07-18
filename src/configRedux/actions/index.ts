import { createAsyncThunk } from '@reduxjs/toolkit';

interface Item {
  id: number;
  title: string;
}

// Fetch data from API
export const fetchData = createAsyncThunk(
  'data/fetchData',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/todos');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data: Item[] = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue('Failed to fetch data');
    }
  }
);

// Post data to API
export const postData = createAsyncThunk(
  'data/postData',
  async (newItem: Item, { rejectWithValue }) => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newItem),
      });
      if (!response.ok) {
        throw new Error('Failed to post data');
      }
      const data: Item = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue('Failed to post data');
    }
  }
);
