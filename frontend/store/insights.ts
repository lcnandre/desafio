import { createSlice } from '@reduxjs/toolkit';

import { RootState } from '../reducers';
import { fetchCards, Insight } from '../services/cards';

export interface InsightsState {
  insights: Insight[];
  loading: boolean;
}

export const initialState: InsightsState = {
  insights: [] as Insight[],
  loading: false,
}

export const insightSlice = createSlice({
  name: 'insights',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCards.pending, state => {
      state.loading = true;
    });
    builder.addCase(fetchCards.fulfilled, (state, { payload }) => {
      state.insights = payload;
      state.loading = false;
    });
    builder.addCase(fetchCards.rejected, state => {
      state.loading = false;
    });
  }
})

export const insightSelector = (state: RootState) => state.insightReducer;
export default insightSlice.reducer;