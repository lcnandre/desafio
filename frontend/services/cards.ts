import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { Tag } from './tags';

const api = axios.create({
  baseURL: 'http://localhost:3000/cards',
});

export interface Insight {
  id: number;
  text: string;
  tags?: Tag[];
}

export interface CreateInsight {
  text: string;
  tagIds: number[];
}

export const createCard = createAsyncThunk('insights/createInsight', async(_: any, thunkAPI: any) => {
  console.log('');
  const response = await api.post('/', thunkAPI.getState().insightReducer.newInsight);
  return response.data as Insight;
});

export const fetchCards = createAsyncThunk('insights/fetchInsights', async (_: any, thunkAPI: any) => {
  const response = await api.get(`/?page=${thunkAPI.getState().insightReducer.page}&pageSize=4`);
  return response.data as Insight[];
});
