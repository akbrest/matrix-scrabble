import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './Reducers/GameReducer';

export const store = configureStore({
    reducer: {
        counter: counterReducer,
    },
});
