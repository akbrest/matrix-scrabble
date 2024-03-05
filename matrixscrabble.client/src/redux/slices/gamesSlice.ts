import { createSlice } from '@reduxjs/toolkit';
import {
  fetchGames,
  createGame,
  fetchSingleGame,
  updateGame
} from '../actions/gamesActions';
import { Game } from '../models/Game';
import { GameModel } from '../models/GameModel';


export interface GameModel {
    game: Game;
    details: GameDetails
}

export interface GameBoardModel {
    id: string;
    left: string[],
    right: string[],
    board: string[][],
}

export interface GameDetails {
    confirmations: boolean[],
    point: string[]
}

const gamesSlice = createSlice({
  name: 'games',
  initialState: {
      games: [] as Game[],
      currentGame: {} as GameModel,
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
      state.currentGame.game = action.payload;
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

    builder.addCase(updateGame.pending, (state) => {
        state.isLoading = true;
    });
    builder.addCase(updateGame.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentGame.details = action.payload.details;
    });

    builder.addCase(updateGame.rejected, (state) => {
        state.isLoading = false;
    });
    },
});

export default gamesSlice.reducer;
