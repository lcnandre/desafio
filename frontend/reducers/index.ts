import { combineReducers } from '@reduxjs/toolkit';

import insightReducer from '../store/insights';
import tagReducer from '../store/tags';

const rootReducer = combineReducers({
  insightReducer,
  tagReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
