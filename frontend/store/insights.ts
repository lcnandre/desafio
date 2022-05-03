import { createSlice } from '@reduxjs/toolkit';

import { RootState } from '../reducers';
import { createCard, CreateInsight, fetchCards, Insight } from '../services/cards';

export interface InsightsState {
  insights: Insight[];
  loading: boolean;
  creating: boolean;
  page: number;
  filterText: string;
  newInsight?: CreateInsight;
}

export const initialState: InsightsState = {
  insights: [] as Insight[],
  loading: false,
  creating: false,
  page: 1,
  filterText: '',
}

export const insightSlice = createSlice({
  name: 'insights',
  initialState,
  reducers: {
    incrementPage(state) {
      state.page += 1;
    },
    setNewInsightText(state, {payload}) {
      if (!state.newInsight) {
        state.newInsight = {} as CreateInsight;
      }
      state.newInsight.text = payload;
    },
    setNewInsightTags(state, {payload}) {
      if (!state.newInsight) {
        state.newInsight = {} as CreateInsight;
      }
      state.newInsight.tagIds = payload.map((t: any) => +t.id);
    },
    setFilterText(state, {payload}) {
      state.filterText = payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCards.pending, state => {
      state.loading = true;
    });
    builder.addCase(fetchCards.fulfilled, (state, { payload }) => {
      if (state.page === 1) {
        state.insights = payload;
      } else {
        state.insights.push(...payload);
      }
      state.loading = false;
    });
    builder.addCase(fetchCards.rejected, state => {
      state.loading = false;
    });

    builder.addCase(createCard.pending, state => {
      state.creating = true;
    });
    builder.addCase(createCard.fulfilled, (state, { payload }) => {
      state.insights.splice(state.insights.length-1, 1);
      state.insights.push(payload);
      state.creating = false;
    });
    builder.addCase(createCard.rejected, (state) => {
      state.creating = false;
    });
  }
});

export const { incrementPage, setNewInsightText, setNewInsightTags, setFilterText } = insightSlice.actions;
export const insightSelector = (state: RootState) => state.insightReducer;
export default insightSlice.reducer;
