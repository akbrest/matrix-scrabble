import { configureStore } from '@reduxjs/toolkit';
import gamesReducer from './games/reducer';

const store = configureStore({
  reducer: {
    games: gamesReducer,
  },
});

export default store;
