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
  const { page, filterText, filterTags } = thunkAPI.getState().insightReducer;
  let url = `/?page=${page}&pageSize=4`;

  if (filterText && filterText.length) {
    url += `&text=${filterText}`;
  }

  if (filterTags && filterTags.length) {
    for (const tag of filterTags) {
      url += `&tagIds=${tag}`;
    }
  }

  const response = await api.get(url);
  return response.data as Insight[];
});
