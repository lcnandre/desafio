import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/tags',
});

export interface Tag {
  id: number;
  name: string;
}

export const findTag = createAsyncThunk('tags/findTag', async (_: any, thunkAPI: any) => {
  const response = await api.get(`/?name=${thunkAPI.getState().tagReducer.searchText}&pageSize=3`);
  return response.data as Tag[];
});
