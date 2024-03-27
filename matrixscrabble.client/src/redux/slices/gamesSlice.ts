import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  fetchGames,
  createGame,
  fetchSingleGame,
  updateGame,
  confirmWord,
} from "../actions/gamesActions";
import { Game } from "../models/Game";
import { GameModel } from "../models/GameModel";
import { Answer } from "../models/Answer";
import { AnswerField } from "../../constants";

const gamesSlice = createSlice({
  name: "games",
  initialState: {
    games: [] as Game[],
    currentGame: {} as GameModel,
    isLoading: false,
  },
  reducers: {
    updateAnswer: (
      state,
      action: PayloadAction<{ key: string; field: AnswerField; value: string }>
    ) => {
      const { key, field, value } = action.payload;
      const gameBoard: Answer = state.currentGame.game.gameBoard[key];

      if (field === AnswerField.Left) gameBoard.left = value;
      else if (field === AnswerField.Center) gameBoard.center = value;
      else if (field === AnswerField.Right) gameBoard.right = value;
    },
  },
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

    builder.addCase(confirmWord.pending, (state, action) => {
      const key = action.meta.arg.wordOrderId;
      state.currentGame.game.gameBoard[key].isLoading = true;
    });

    builder.addCase(confirmWord.fulfilled, (state, action) => {
      const key = action.meta.arg.wordOrderId;
      state.currentGame.game.gameBoard[key] = action.payload;
      state.currentGame.game.gameBoard[key].isLoading = false;
    });

    builder.addCase(confirmWord.rejected, (state, action) => {
      const key = action.meta.arg.wordOrderId;
      state.currentGame.game.gameBoard[key].isLoading = false;
    });
  },
});

export const { updateAnswer } = gamesSlice.actions;

export default gamesSlice.reducer;
