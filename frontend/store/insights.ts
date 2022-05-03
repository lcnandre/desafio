import { createSlice } from '@reduxjs/toolkit';

import { RootState } from '../reducers';
import { fetchCards, Insight } from '../services/cards';

export interface InsightsState {
  insights: Insight[];
  loading: boolean;
  page: number;
}

export const initialState: InsightsState = {
  insights: [] as Insight[],
  loading: false,
  page: 1,
}

export const insightSlice = createSlice({
  name: 'insights',
  initialState,
  reducers: {
    incrementPage(state) {
      state.page += 1;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCards.pending, state => {
      state.loading = true;
    });
    builder.addCase(fetchCards.fulfilled, (state, { payload }) => {
      state.insights.push(...payload);
      state.loading = false;
    });
    builder.addCase(fetchCards.rejected, state => {
      state.loading = false;
    });
  }
})

export const { incrementPage } = insightSlice.actions;
export const insightSelector = (state: RootState) => state.insightReducer;
export default insightSlice.reducer;
