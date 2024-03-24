import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

//TODO move to env variables
const apiUrl = 'https://172.29.192.1:5173';

export interface CheckWord {
    word: string;
    language: string;
}
export interface WordStatus {
    status: boolean;
}

export const fetchWord = createAsyncThunk<boolean, CheckWord>(
    'word/FetchWord',
    async (checkWord: CheckWord) => {
        const response = await axios.post(apiUrl + '/word/CheckWordAllowance', checkWord);
        return response.data;
    }
);