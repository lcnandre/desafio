import { combineReducers } from '@reduxjs/toolkit';

import insightReducer from '../store/insights';

const rootReducer = combineReducers({
  insightReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
