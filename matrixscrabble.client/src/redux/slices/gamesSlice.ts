import { createSlice } from '@reduxjs/toolkit';
import { fetchGames, createGame } from '../actions/gamesActions';
import { Game } from '../models/Game';

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
    builder.addCase(createGame.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createGame.fulfilled, (state, action) => {
      state.isLoading = false;
      state.games.push(action.payload);
    });
    builder.addCase(createGame.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export default gamesSlice.reducer;
