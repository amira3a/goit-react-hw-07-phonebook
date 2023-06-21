import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './slice';
const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware(),
  devTools: process.env.NODE_ENV === 'development',
});

export default store;
