import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Game } from '../models/Game';
import { GameBoardModel, GameModel } from '../slices/gamesSlice';

//TODO move to env variables
const apiUrl = 'http://localhost:5032';

export const fetchGames = createAsyncThunk<Game[]>(
  'games/fetchGames',
  async () => {
    const response = await axios.get(apiUrl + '/games');
    return response.data;
  }
);

export const fetchSingleGame = createAsyncThunk<Game, string>(
  'games/fetchSingleGame',
  async (id: string) => {
    const response = await axios.get(apiUrl + '/games/' + id);
    return response.data;
  }
);

export const createGame = createAsyncThunk<Game, Game>(
  'games/createGame',
  async (game: Game) => {
    const response = await axios.post(apiUrl + '/games', game);
    return response.data;
  }
);

export const updateGame = createAsyncThunk<GameModel, GameBoardModel>(
    'games/updateGame',
    async (gameDetails: GameBoardModel) => {
        const response = await axios.put('http://localhost:5032/games', {
            game: {
                id: gameDetails.id,
                Left: gameDetails.left,
                Right: gameDetails.right,
                Board: gameDetails.board,
            },
            word: '',
            id: gameDetails.id,
            language: ""
        });

        return response.data;
    }
);