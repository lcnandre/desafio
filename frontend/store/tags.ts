import { createSlice } from '@reduxjs/toolkit';

import { RootState } from '../reducers';
import { findTag, Tag } from '../services/tags';

export interface TagsState {
  tags: Tag[];
  selectedTags: Tag[];
  loading: boolean;
  searchText?: string;
}

export const initialState: TagsState = {
  tags: [] as Tag[],
  selectedTags: [] as Tag[],
  loading: false,
}

export const tagSlice = createSlice({
  name: 'tags',
  initialState,
  reducers: {
    setSearchText(state, { payload }) {
      state.searchText = payload;
    },
    setSelectedTags(state, { payload }) {
      state.selectedTags = payload;
      state.tags = [] as Tag[];
      state.searchText = undefined;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(findTag.pending, state => {
      state.loading = true;
    });
    builder.addCase(findTag.fulfilled, (state, { payload }) => {
      state.tags = payload;
      state.loading = false;
    });
    builder.addCase(findTag.rejected, state => {
      state.loading = false;
    });
  }
});

export const { setSearchText, setSelectedTags } = tagSlice.actions;
export const tagsSelector = (state: RootState) => state.insightReducer;
export default tagSlice.reducer;
