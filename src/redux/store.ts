import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import gameReducer from './gameSlice';

export const store = configureStore({
  reducer: {
    game: gameReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

// Custom hook for dispatching
export const useAppDispatch = () => useDispatch<AppDispatch>();
