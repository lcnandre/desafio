import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/cards',
});

export interface Tag {
  id: number;
  name: string;
}

export interface Insight {
  id: number;
  text: string;
  tags?: Tag[];
}

export const fetchCards = createAsyncThunk('insights/fetchInsights', async (page = 1) => {
  const response = await api.get(`/?page=${page}&pageSize=4`);
  return response.data as Insight[];
});
