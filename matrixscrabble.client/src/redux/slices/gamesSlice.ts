import { createSlice } from '@reduxjs/toolkit';
import {
  fetchGames,
  createGame,
  fetchSingleGame,
} from '../actions/gamesActions';
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
    builder.addCase(fetchSingleGame.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchSingleGame.fulfilled, (state, action) => {
      state.isLoading = false;
      const index = state.games.findIndex(
        (game) => game.id === action.payload.id
      );
      if (index !== -1) {
        state.games[index] = action.payload;
      } else {
        state.games.push(action.payload);
      }
    });
    builder.addCase(fetchSingleGame.rejected, (state) => {
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
