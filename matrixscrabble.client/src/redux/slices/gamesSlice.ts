import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export interface Game {
  id: string;
  word: string;
  isCompleted: boolean;
  language: string;
}

export const fetchGames = createAsyncThunk<Game[]>(
  'games/fetchGames',
  async () => {
    const response = await axios.get('http://localhost:5032/games');
    return response.data;
  }
);

const gamesSlice = createSlice({
  name: 'games',
  initialState: {
    games: [] as Game[],
    isLoading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchGames.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchGames.fulfilled, (state, action) => {
      state.isLoading = false;
      state.games = action.payload;
    });
    builder.addCase(fetchGames.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export default gamesSlice.reducer;
