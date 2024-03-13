import { configureStore, combineReducers } from '@reduxjs/toolkit';

import gamesReducer from './slices/gamesSlice';
import wordReducer from './slices/wordSlice';
import errorReducer from './slices/errorSlice';

const rootReducer = combineReducers({
    games: gamesReducer,
    word: wordReducer,
    error: errorReducer
});

const store = configureStore({ reducer: rootReducer });

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export default store;
